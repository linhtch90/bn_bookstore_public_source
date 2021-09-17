var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var passport = require("passport");

// const userSecret = process.env.USER_SECRET_KEY;

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users"); Auto generated
var booksRouter = require("./routes/booksRoutes");
var usersRouter = require("./routes/usersRoutes");
var ordersRouter = require("./routes/ordersRouter");
var adminsRouter = require("./routes/adminsRoutes");

var app = express();

// Database connection
var mongoose = require("mongoose");
var mongoDB = process.env.MONGODB_CONNECTION_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error..."));

// view engine setup for development
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// Serve React Project on heroku
app.use(express.static(path.join(__dirname, "build")));
// Do not use the below code. It makes frontend cannot fetch data
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.SERVER_DOMAIN,
  })
);

app.use(passport.initialize());

app.use("/", indexRouter);
// app.use("/users", usersRouter); Auto generated
app.use("/books", booksRouter);
app.use("/user", usersRouter);
app.use("/order", ordersRouter);
app.use("/admin", adminsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
