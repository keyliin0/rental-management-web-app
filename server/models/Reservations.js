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
    property: { type: Schema.Types.ObjectId, ref: "properties" }
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
  const Reservation = mongoose.model("reservations");
  const reservations = await Reservation.find({
    $or: [{ owner: user.id }, { user: user.id }]
  })
    .populate("owner", "firstname lastname imgURL")
    .populate("user", "firstname lastname imgURL");
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
  if (checkReserved(property, Date.parse(checkin), Date.parse(checkout))) {
    return new Error("property reserved");
  }
  property.reserved.push({
    start: Date.parse(checkin),
    end: Date.parse(checkout)
  });
  await property.save();
  // calculate the total price
  const total =
    property.price *
    ((Date.parse(checkout) - Date.parse(checkin)) / (24 * 60 * 60 * 1000) + 1);
  const reservation = new Reservation({
    address: property.address,
    date: Date.now(),
    checkin: Date.parse(checkin),
    checkout: Date.parse(checkout),
    guests,
    pets,
    total,
    property: property_id,
    owner: property.owner,
    user: user.id
  });
  await reservation.save();
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
    ((status == "accepted" || status == "rejected") &&
      reservation.owner != user.id)
  ) {
    return new Error("authentication required");
  }
  // cancel the reservation
  if (status == "cancelled" || status == "rejected") {
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
  return reservation;
};

mongoose.model("reservations", ReservationSchema);
