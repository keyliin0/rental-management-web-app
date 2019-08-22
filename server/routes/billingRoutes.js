const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requirelogin = require("../middlewares/requirelogin");
const mongoose = require("mongoose");
const Reservation = mongoose.model("reservations");

module.exports = app => {
  app.post("/api/stripe/:reservation_id", async (req, res) => {
    const reservation = await Reservation.findById(req.params.reservation_id);
    console.log(reservation.total);
    const charge = await stripe.charges.create({
      amount: reservation.total * 100,
      currency: "usd",
      description: "reservation_id : " + req.params.reservation_id,
      source: req.body.id
    });
    //const user = await req.user.save();
    res.send(user);
  });
};
