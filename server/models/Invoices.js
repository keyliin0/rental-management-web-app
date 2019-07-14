const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  number: { type: Number },
  date: { type: Date },
  paid: { type: Boolean },
  method: { type: String },
  total: { type: Number },
  reservation: { type: Schema.Types.ObjectId, ref: "reservations" },
  buyer: { type: Schema.Types.ObjectId, ref: "users" },
  seller: { type: Schema.Types.ObjectId, ref: "users" }
});

mongoose.model("invoices", InvoiceSchema);
