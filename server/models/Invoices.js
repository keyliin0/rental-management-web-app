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
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  const util = require("util");
  client_redis.hget = util.promisify(client_redis.hget);
  const cached_result = await client_redis.hget(user.id, "invoices");
  if (cached_result) {
    return JSON.parse(cached_result);
  }
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
  await client_redis.hset(user.id, "invoices", JSON.stringify(invoices));
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
  // clear the cache
  const redis = require("redis");
  const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });
  client_redis.hdel(reservation.owner.toString(), "reservations");
  client_redis.hdel(reservation.user.toString(), "reservations");
  client_redis.hdel(reservation.owner.toString(), "invoices");
  client_redis.hdel(reservation.user.toString(), "invoices");
  return reservation;
};

mongoose.model("invoices", InvoiceSchema);
