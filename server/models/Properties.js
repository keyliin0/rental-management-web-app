const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    sum: { type: Number }, // sum of ratings
    count: { type: Number } // number of raters
  },
  reserved: [
    {
      start: { type: Number }, // timestamp
      end: { type: Number } // timestamp
    }
  ]
});

PropertySchema.statics.GetMy = async function(user, page) {
  const Property = mongoose.model("properties");
  const properties = await Property.find({
    owner: user.id
  })
    .limit(10)
    .skip(10 * parseInt(page))
    .populate("owner", "firstname lastname imgURL");
  return properties;
};

PropertySchema.index({ location: "2dsphere" });
mongoose.model("properties", PropertySchema);
