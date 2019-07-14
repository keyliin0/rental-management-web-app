const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const ObjectId = require("mongoose").Types.ObjectId;
const keys = require("../config/keys");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/drive"],
      prompt: "consent",
      accessType: "offline"
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
    }
  );
  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      user = req.user;
      res.send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        imgURL: user.imgURL
      });
    } else res.send(null);
  });
  app.get("/auth/demo", async (req, res) => {
    const user = await User.findById(ObjectId(keys.DemoAccountId));
    await req.login(user, err => console.log(err));
    res.redirect("/");
  });
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
