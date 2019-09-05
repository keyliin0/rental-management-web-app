const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

const ReservationSchema = new Schema(
  {
    address: { type: String }, // keep the address in case the user delete the property
    date: { type: Number },
    status: { type: String, default: "pending" },
    checkin: { type: Number }, // timestamp
    checkout: { type: Number },
    guests: { type: Number },
    pets: { type: Boolean },
    total: { type: Number },
    owner: { type: Schema.Types.ObjectId, ref: "users" }, // owner of the property
    user: { type: Schema.Types.ObjectId, ref: "users" }, // the user who wants to make a reservation
    property: { type: Schema.Types.ObjectId, ref: "properties" },
    rated: { type: Boolean, default: false }
  },
  { usePushEach: true }
);

checkReserved = (property, start, end) => {
  let reserved = false;
  property.reserved.forEach(range => {
    if (!(start > range.end || end < range.start)) {
      reserved = true;
    }
  });
  return reserved;
};

ReservationSchema.statics.Get = async function(user) {
  // check if the result is cached
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  const util = require("util");
  client_redis.hget = util.promisify(client_redis.hget);
  const cached_result = await client_redis.hget(user.id, "reservations");
  if (cached_result) {
    return JSON.parse(cached_result);
  }
  const Reservation = mongoose.model("reservations");
  const reservations = await Reservation.find({
    $or: [{ owner: user.id }, { user: user.id }]
  })
    .populate("owner", "firstname lastname imgURL")
    .populate("user", "firstname lastname imgURL");
  // cache the result
  await client_redis.hset(
    user.id,
    "reservations",
    JSON.stringify(reservations)
  );
  return reservations;
};

ReservationSchema.statics.Create = async function(
  checkin,
  checkout,
  guests,
  pets,
  property_id,
  user
) {
  const Reservation = mongoose.model("reservations");
  const Property = mongoose.model("properties");
  // check if the property actually exist and its not reserved
  // just in case someone makes a fake call to the api
  const property = await Property.findById(property_id);
  if (!property) {
    return new Error("property does not exist");
  }
  // check if its reserved
  if (checkReserved(property, checkin, checkout)) {
    return new Error("property reserved");
  }
  property.reserved.push({
    start: checkin,
    end: checkout
  });
  await property.save();
  // calculate the total price
  const total =
    property.price * ((checkout - checkin) / (24 * 60 * 60 * 1000) + 1);
  const reservation = new Reservation({
    address: property.address,
    date: Date.now(),
    checkin: checkin,
    checkout: checkout,
    guests,
    pets,
    total,
    property: property_id,
    owner: property.owner,
    user: user.id
  });
  await reservation.save();
  // clear the cache for both users
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  client_redis.hdel(property.owner.toString(), "reservations");
  client_redis.hdel(user.id.toString(), "reservations");
  return reservation;
};

ReservationSchema.statics.ChangeStatus = async function(
  reservation_id,
  status,
  user
) {
  const Reservation = mongoose.model("reservations");
  const Property = mongoose.model("properties");
  const reservation = await Reservation.findById(reservation_id);
  if (!reservation) {
    return new Error("reservation not found");
  }
  // access check
  if (
    (status == "cancelled" && user.id != reservation.user) ||
    ((status == "accepted" || status == "cancelled") &&
      reservation.owner != user.id)
  ) {
    return new Error("authentication required");
  }
  // cancel the reservation
  if (status == "cancelled") {
    // update the propery by removing the reservation array
    const property = await Property.findById(reservation.property);
    // check if the user did not delete the property
    if (property) {
      property.reserved = _.reject(
        property.reserved,
        o => o.start == reservation.checkin && o.end == reservation.checkout
      );
      property.save();
    }
  }
  reservation.status = status;
  await reservation.save();
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  client_redis.hdel(reservation.owner.toString(), "reservations");
  client_redis.hdel(reservation.user.toString(), "reservations");
  return reservation;
};

ReservationSchema.statics.RateReservation = async function(
  reservation_id,
  star,
  user
) {
  const Reservation = mongoose.model("reservations");
  const Property = mongoose.model("properties");
  const reservation = await Reservation.findById(reservation_id)
    .populate("owner", "firstname lastname imgURL")
    .populate("user", "firstname lastname imgURL");
  if (!reservation || reservation.status != "paid") {
    return new Error("reservation not found");
  }
  if (reservation.rated) {
    return new Error("reservation already rated");
  }
  if (reservation.user._id != user.id) {
    return new Error("authentication required");
  }
  const property = await Property.findById(reservation.property);
  if (property) {
    property.rating.sum += star;
    property.rating.count++;
    await property.save();
  }
  reservation.rated = true;
  await reservation.save();
  return reservation;
};

mongoose.model("reservations", ReservationSchema);
