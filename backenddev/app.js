var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var activeChatRouter = require("./routes/activeChat");
var chatMessageRouter = require("./routes/chatMessage");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var openChatRouter = require("./routes/openChat");
var postMessageRouter = require("./routes/postMessage");
var registerRouter = require("./routes/register");
var resendTokenRouter = require("./routes/resendToken");
var verificationRouter = require("./routes/verification");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/users", usersRouter);
app.use("/activechat", activeChatRouter);
app.use("/chatmessage", chatMessageRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/openchat", openChatRouter);
app.use("/postmessage", postMessageRouter);
app.use("/register", registerRouter);
app.use("/resendtoken", resendTokenRouter);
app.use("/verification", verificationRouter);
app.use("*", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
