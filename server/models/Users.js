const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  firstname: String,
  lastname: String,
  imgURL: String
});

mongoose.model("users", UserSchema);
