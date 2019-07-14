const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const FileUpload = require("../middlewares/FileUpload");
const streamifier = require("streamifier");
const axios = require("axios");
const cloudinary = require("cloudinary");
const Property = mongoose.model("properties");
const keys = require("../config/keys");

module.exports = app => {
  app.post(
    "/api/property/create",
    FileUpload,
    RequireLogin,
    async (req, res) => {
      // get location
      const request = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json?key=" +
          keys.opencage_api_key +
          "&q=" +
          encodeURI(req.body.address)
      );
      let cords = null;
      if (request.data.results[0])
        cords = [
          request.data.results[0].geometry.lng,
          request.data.results[0].geometry.lat
        ];
      // -- upload images to  cloudinary
      let res_promises = req.files.map(
        photo =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(function(
              result,
              error
            ) {
              if (error) reject(error);
              else resolve(result.url);
            });
            stream.write(photo.buffer);
            stream.end();
          })
      );
      // --
      const images = await Promise.all(res_promises);
      const {
        name,
        type,
        guests,
        bathrooms,
        bedrooms,
        beds,
        size,
        description,
        address,
        city,
        price,
        availability
      } = req.body;
      const property = new Property({
        name,
        type,
        guests,
        bathrooms,
        bedrooms,
        beds,
        size,
        description,
        address,
        city,
        price,
        availability,
        owner: req.user.id,
        images,
        location: {
          coordinates: cords
        }
      });
      await property.save();
      res.send(property);
    }
  );
  app.get("/api/property/my/:page", async (req, res) => {
    const properties = await Property.find({
      owner: req.user.id
    })
      .limit(10)
      .skip(10 * parseInt(req.params.page));
    res.send(properties);
  });
  app.get("/api/property/:page", async (req, res) => {
    const properties = await Property.find({})
      .limit(10)
      .skip(10 * parseInt(req.params.page))
      .populate("owner", "firstname lastname imgURL");
    res.send(properties);
  });
  app.get("/api/property/:page/:city", async (req, res) => {
    const properties = await Property.find({ city: req.params.city })
      .limit(10)
      .skip(10 * parseInt(req.params.page))
      .populate("owner", "firstname lastname imgURL");
    res.send(properties);
  });
  app.get("/api/property/:page/nearby/:lat/:lng", async (req, res) => {
    const properties = await Property.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(req.params.lng),
              parseFloat(req.params.lat)
            ]
          }
        }
      }
    })
      .limit(20)
      .populate("owner", "firstname lastname imgURL");
    res.send(properties);
  });
  app.delete("/api/property/:id", RequireLogin, async (req, res) => {
    const property = await Property.findById(req.params.id);
    // check if the user who made the request is the owner
    if (property.owner != req.user.id) {
      res.status(401).send({ error: "authentication required" });
      return;
    }
    property.delete();
    res.send(property);
  });
  app.get("/api/property/:page/:city/sort/:field", async (req, res) => {});
};
