const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Property = mongoose.model("properties");
const Reservation = mongoose.model("reservations");
const _ = require("lodash");

module.exports = app => {
  checkReserved = (property, start, end) => {
    let reserved = false;
    property.reserved.forEach(range => {
      if (!(start > range.end || end < range.start)) {
        reserved = true;
      }
    });
    return reserved;
  };
  app.post("/api/reservation/create", RequireLogin, async (req, res) => {
    const { checkin, checkout, guests, pets, property_id } = req.body;
    // check if the property actually exist and its not reserved
    // just in case someone makes a fake call to the api
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(406).send({ error: "property do not exist" });
    }
    // check if its reserved
    if (checkReserved(property, Date.parse(checkin), Date.parse(checkout))) {
      return res.status(406).send({ error: "property reserved" });
    }
    property.reserved.push({
      start: Date.parse(checkin),
      end: Date.parse(checkout)
    });
    await property.save();
    // calculate the total price
    const total =
      property.price *
      ((Date.parse(checkout) - Date.parse(checkin)) / (24 * 60 * 60 * 1000) +
        1);
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
      user: req.user.id
    });
    await reservation.save();
    res.send(reservation);
  });
  // fetch reservations made
  app.get("/api/reservation/my", RequireLogin, async (req, res) => {
    const reservations = await Reservation.find({ user: req.user.id });
    res.send(reservations);
  });
  // fetch incoming requests for reservations
  app.get("/api/reservation/request", RequireLogin, async (req, res) => {
    const reservations = await Reservation.find({ owner: req.user.id });
    res.send(reservations);
  });
  // change status for a reservation
  app.put("/api/reservation/:id", RequireLogin, async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      res.status(404).send({ error: "reservation not found" });
    }
    // access check
    if (
      (req.body.status == "cancelled" && req.user.id != reservation.user) ||
      ((req.body.status == "accepted" || req.body.status == "rejected") &&
        reservation.owner != req.user.id)
    ) {
      return res.status(401).send({ error: "authentication required" });
    }
    // cancel the reservation
    if (req.body.status == "cancelled" || req.body.status == "rejected") {
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
    reservation.status = req.body.status;
    await reservation.save();
    res.send(reservation);
  });
};
