const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  date: { type: Number },
  total: { type: Number },
  reservation: { type: Schema.Types.ObjectId, ref: "reservations" },
  tenant: { type: Schema.Types.ObjectId, ref: "users" },
  owner: { type: Schema.Types.ObjectId, ref: "users" }
});

InvoiceSchema.statics.Get = async function(user) {
  const Invoice = mongoose.model("invoices");
  const invoices = await Invoice.find({
    $or: [{ tenant: user.id }, { owner: user.id }]
  })
    .populate("tenant", "firstname lastname imgURL")
    .populate("owner", "firstname lastname imgURL")
    .populate(
      "reservation",
      "checkin checkout address date status guests pets total"
    );
  return invoices;
};

InvoiceSchema.statics.Create = async function(reservation_id, token_id, user) {
  const keys = require("../config/keys");
  const stripe = require("stripe")(keys.stripeSecretKey);
  const Invoice = mongoose.model("invoices");
  const Reservation = mongoose.model("reservations");
  const reservation = await Reservation.findById(reservation_id);
  const charge = await stripe.charges.create({
    amount: reservation.total * 100,
    currency: "usd",
    description: "reservation_id : " + reservation_id,
    source: token_id
  });
  const invoice = new Invoice({
    date: new Date(),
    total: reservation.total,
    reservation: reservation_id,
    tenant: user.id,
    owner: reservation.owner
  });
  await invoice.save();
  reservation.status = "paid";
  await reservation.save();
  return reservation;
};

mongoose.model("invoices", InvoiceSchema);
