const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

mongoose.model("reservations", ReservationSchema);
