const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/auth/google", "/api/logout"], { target: "http://localhost:5000/" })
  );
};
