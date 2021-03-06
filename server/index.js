const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookiesession = require("cookie-session");
const bodyParser = require("body-parser");
const expressGraphQL = require("express-graphql");
const schema = require("./graphql/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const cors = require("cors");
const redis = require("redis");
const client_redis = redis.createClient({ host: "127.0.0.1", port: 6379 });

require("./models/Users");
require("./models/Properties");
require("./models/Reservations");
require("./models/Invoices");

var allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

mongoose.connect(keys.mongodbURI, { useNewUrlParser: true });

app.use(
  cookiesession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

// services
require("./services/passport");
require("./services/cloudinary");

// routes
require("./routes/AuthRoutes")(app);
require("./routes/billingRoutes")(app);

//  graphql
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressGraphQL({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
