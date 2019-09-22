var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");
var usefulFunctions = require("./helpers/usefulFunctions");
var crypto = require("crypto");
var CONFIG = require("./helpers/config.json");
var nodemailer = require("nodemailer");
var errors = require("./helpers/writeError");

//Defining Static Test Data
var returnObject = {
  validRegistration: null,
  successMessage: {},
  errors: {}
};

//Define router and params
router.get("/:username&:pass&:email", function(req, res, next) {
  var username = req.params.username;
  var usedPassword = req.params.pass;
  var usedEmail = req.params.email;

  var query =
    "select userid from user where UPPER(loginName) = '" +
    username.toUpperCase() +
    "' OR UPPER(mail) = '" +
    usedEmail.toUpperCase() +
    "'";

  //Get Connection to database
  getConnection(function(err, conn) {
    if (err) {
      res.json(errors.returnError("connection"));
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          res.json(errors.returnError("query"));
        } else {
          //Check if exactly one result is found
          if (results.length !== 0) {
            res.json(errors.returnError("uniqueConstraint"));
          } else {
            createUser(username, usedPassword, usedEmail);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  var createUser = function(username, password, mail) {
    //Generate Salt for user
    var salt = crypto
      .createHash("md5")
      .update(usefulFunctions.generateToken(16))
      .digest("hex");

    var saltedPassword = password.toUpperCase() + salt.toUpperCase();

    //GenerateNewPasswordHash
    var sha256Pass = crypto
      .createHash("sha256")
      .update(saltedPassword)
      .digest("hex");

    var executableQuery =
      "insert into user (loginName, password, salt, mail, isVerified) values ('" +
      username +
      "','" +
      sha256Pass.toUpperCase() +
      "','" +
      salt.toUpperCase() +
      "','" +
      mail +
      "',0)";

    getConnection(function(err, conn) {
      if (err) {
        res.json(errors.returnError("connection"));
        return false;
      } else {
        //Execute query
        //console.log(query);
        conn.query(executableQuery, function(err, results) {
          if (err) {
            res.json(errors.returnError("query"));
            return false;
          } else {
            createVerificationToken(username, mail);
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var createVerificationToken = function(username, email) {
    var token = crypto
      .createHash("md5")
      .update(usefulFunctions.generateToken(16))
      .digest("hex");

    var executableQuery =
      "insert into verificationtoken (token, username, isActive) values ('" +
      token.toUpperCase() +
      "','" +
      username +
      "'," +
      "1)";

    getConnection(function(err, conn) {
      if (err) {
        res.json(errors.returnError("connection"));
        return false;
      } else {
        //Execute query
        //console.log(query);
        conn.query(executableQuery, function(err, results) {
          if (err) {
            res.json(errors.returnError("query"));
            return false;
          } else {
            sendVerificationMail(username, email, token);
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var sendVerificationMail = function(username, email, token) {
    var tokenLink =
      CONFIG.devEnvironment + "/verification/" + username + "&" + token;

    var transporter = nodemailer.createTransport({
      host: CONFIG.mailHost,
      port: 587,
      secure: false,
      auth: {
        user: CONFIG.mailUser,
        pass: CONFIG.mailPass
      }
    });

    var mailOptions = {
      from: "demoapp@avisvir.de",
      to: email,
      subject: "Your registration for ChatApp",
      text:
        "Congratulations for registering at ChatApp. \n\n Please click the following link to finish your registration: \n\n" +
        tokenLink
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.json(errors.returnError("mailNotSendProperly"));
      } else {
        returnSuccess();
        console.log("Email sent: " + info.response);
      }
    });
  };

  //Returns token - Called after all password checks returned true
  var returnSuccess = function(userId, token) {
    returnObject.validRegistration = false;
    returnObject.successMessage = {
      id: 100,
      message:
        "Registration completed. Please confirm your Account via Mail before you login."
    };
    returnObject.errors = null;

    res.json(returnObject);
  };
});

module.exports = router;
