require("dotenv").config();
var express = require('express');
const handlebars = require("express-handlebars");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const passport = require("passport");
const path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("/public"));

// View engine setup
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    helpers: require("./views/helpers/helpers"),
    partialsDir: `${__dirname}/views/partials`,
  })
);

//Routes
app.use('/', htmlRoutes);
app.use("/api", apiRoutes);


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Handles errors in development
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

db.sequelize.sync({force:true}).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
