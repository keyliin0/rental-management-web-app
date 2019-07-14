const cloudinary = require("cloudinary");
const keys = require("../config/keys");

cloudinary.config({
  cloud_name: keys.cloud_name,
  api_key: keys.cloud_api_key,
  api_secret: keys.cloud_api_secret
});
