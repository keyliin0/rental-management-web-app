const multer = require("multer");

module.exports = multer({
  dest: "./tmp/",
  storage: multer.memoryStorage()
}).array("photos");
