const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const keys = require("../config/keys");
const axios = require("axios");

const PropertySchema = new Schema({
  name: { type: String },
  type: { type: String },
  guests: { type: Number },
  bathrooms: { type: Number },
  bedrooms: { type: Number },
  beds: { type: Number },
  size: { type: Number },
  description: { type: String },
  address: { type: String },
  city: { type: String },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [{ type: Number }, { type: Number }]
  },
  price: { type: Number }, // this is the price per night
  availability: {
    minimum_stay: { type: Number },
    maximum_stay: { type: Number }
  },
  images: [{ type: String }],
  thumbnail: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "users" },
  rating: {
    sum: { type: Number, default: 0 }, // sum of ratings
    count: { type: Number, default: 0 } // number of raters
  },
  reserved: [
    {
      start: { type: Number }, // timestamp
      end: { type: Number } // timestamp
    }
  ]
});

PropertySchema.statics.GetMy = async function(user, page) {
  // check if the result is cached
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  const util = require("util");
  client_redis.hget = util.promisify(client_redis.hget);
  const cached_result = await client_redis.hget(
    user.id + " properties",
    "" + page
  );
  if (cached_result) {
    return JSON.parse(cached_result);
  }
  const Property = mongoose.model("properties");
  const properties = await Property.find({
    owner: user.id
  })
    .limit(10)
    .skip(10 * parseInt(page))
    .populate("owner", "firstname lastname imgURL");
  await client_redis.hset(
    user.id + " properties",
    "" + page,
    JSON.stringify(properties)
  );
  return properties;
};

PropertySchema.statics.Get = async function(page) {
  const Property = mongoose.model("properties");
  const properties = await Property.find({})
    .limit(10)
    .skip(10 * parseInt(page))
    .populate("owner", "firstname lastname imgURL");
  return properties;
};

PropertySchema.statics.GetByCity = async function(
  page,
  city,
  start_date,
  end_date
) {
  const Property = mongoose.model("properties");
  const properties = await Property.find({
    city: city,
    reserved: {
      $not: {
        $elemMatch: {
          start: { $lte: end_date },
          end: { $gte: start_date }
        }
      }
    }
  })
    .limit(10)
    .skip(10 * parseInt(page))
    .populate("owner", "firstname lastname imgURL");
  return properties;
};

PropertySchema.statics.GetNearbyLngLat = async function(lng, lat) {
  const Property = mongoose.model("properties");
  const properties = await Property.find({
    location: {
      $near: {
        $maxDistance: 100000,
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        }
      }
    }
  })
    .limit(20)
    .populate("owner", "firstname lastname imgURL");
  return properties;
};

PropertySchema.statics.GetNearby = async function(address) {
  const Property = mongoose.model("properties");
  const request = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json?key=" +
      keys.opencage_api_key +
      "&q=" +
      encodeURI(address)
  );
  // if address is
  if (request.data.results.length == 0 || !request.data.results[0]) {
    return new Error("Address is invalid");
  }
  const properties = Property.GetNearbyLngLat(
    request.data.results[0].geometry.lng,
    request.data.results[0].geometry.lat
  );
  return properties;
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

PropertySchema.statics.Create = async function(
  files,
  name,
  type,
  guests,
  bathrooms,
  bedrooms,
  beds,
  size,
  description,
  address,
  city,
  price,
  minimum_stay,
  maximum_stay,
  user
) {
  const cloudinary = require("cloudinary");
  const Property = mongoose.model("properties");
  const request = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json?key=" +
      keys.opencage_api_key +
      "&q=" +
      encodeURI(address)
  );
  let cords = null;
  // if address is invalid
  if (request.data.results.length == 0) {
    return new Error("Address is invalid");
  }
  if (request.data.results[0])
    cords = [
      request.data.results[0].geometry.lng,
      request.data.results[0].geometry.lat
    ];
  // -- upload images to  cloudinary
  let res_promises = files.map(
    photo =>
      new Promise((resolve, reject) => {
        const { createReadStream } = photo;
        const stream = cloudinary.uploader.upload_stream(function(
          result,
          error
        ) {
          if (error) reject(error);
          else resolve(result.url);
        });
        createReadStream().pipe(stream);
      })
  );
  // --
  const images = await Promise.all(res_promises);
  const property = new Property({
    name,
    type,
    guests,
    bathrooms,
    bedrooms,
    beds,
    size,
    description,
    address,
    city,
    price,
    availability: { minimum_stay, maximum_stay },
    owner: user.id,
    images,
    location: {
      coordinates: cords
    }
  });
  await property.save();
  // clear cache
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  client_redis.del(user.id + " properties");
  return property;
};

PropertySchema.statics.DeleteProperty = async function(property_id, user) {
  const Property = mongoose.model("properties");
  const property = await Property.findById(property_id);
  await Property.findByIdAndDelete(property_id);
  // clear cache
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  client_redis.del(user.id + " properties");
  return property;
};

PropertySchema.index({ location: "2dsphere" });
mongoose.model("properties", PropertySchema);
