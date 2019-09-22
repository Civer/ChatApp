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
  validVerification: null,
  successMessage: {},
  errors: {}
};

//Define router and params
router.get("/:username&:token", function(req, res, next) {
  var username = req.params.username;
  var token = req.params.token;

  var query =
    "SELECT isActive FROM verificationtoken WHERE UPPER(username) = '" +
    username.toUpperCase() +
    "' AND UPPER(token) = '" +
    token.toUpperCase() +
    "'";

  //Get Connection to database
  getConnection(function(err, conn) {
    if (err) {
      res.json(errors.returnError("connection"));
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          console.log("ErrorVerificationQuery: " + query + " / " + err);
          res.json(errors.returnError("query"));
        } else {
          //Check if exactly one result is found
          if (results.length !== 1) {
            res.json(errors.returnError("noMatch"));
          } else {
            activateUser(username);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  var activateUser = function(username) {
    var query =
      "update user set isVerified = 1 where UPPER(loginname) = '" +
      username.toUpperCase() +
      "'";

    //Get Connection to database
    getConnection(function(err, conn) {
      if (err) {
        res.json(errors.returnError("connection"));
      } else {
        //Execute query
        conn.query(query, function(err, result) {
          if (err) {
            res.json(errors.returnError("query"));
          } else {
            deactivateVerificationToken(username);
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var deactivateVerificationToken = function(username) {
    var query =
      "UPDATE verificationtoken SET isActive = 0 where UPPER(username) = '" +
      username.toUpperCase() +
      "'";

    //Get Connection to database
    getConnection(function(err, conn) {
      if (err) {
        res.json(errors.returnError("connection"));
      } else {
        //Execute query
        conn.query(query, function(err, result) {
          if (err) {
            res.json(errors.returnError("query"));
          } else {
            res.render("verification", { title: "ChatApp" });
          }
        });
        //Release connection.
        conn.release();
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
