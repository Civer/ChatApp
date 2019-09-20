var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");
var usefulFunctions = require("./helpers/usefulFunctions");
var crypto = require("crypto");
var CONFIG = require("./helpers/config.json");
var nodemailer = require("nodemailer");

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
      var error = returnError("connection");
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          console.log("ErrorVerificationQuery: " + query + " / " + err);
          var error = returnError("query");
        } else {
          //Check if exactly one result is found
          if (results.length !== 1) {
            var error = returnError("noMatch");
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
        var error = returnError("connection");
      } else {
        //Execute query
        conn.query(query, function(err, result) {
          if (err) {
            console.log("ErrorVerificationQuery: " + query + " / " + err);
            var error = returnError("query");
          } else {
            //Check if exactly one result is found
            if (err) {
              console.log("errorVerificationUpdate: " + err);
            } else {
              deactivateVerificationToken(username);
            }
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
        var error = returnError("connection");
      } else {
        //Execute query
        conn.query(query, function(err, result) {
          if (err) {
            console.log("ErrorVerificationQuery: " + query + " / " + err);
            var error = returnError("query");
          } else {
            //Check if exactly one result is found
            if (err) {
              console.log("errorVerificationUpdate: " + err);
            } else {
              res.render("verification", { title: "ChatApp" });
            }
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var returnError = function(string) {
    returnObject.validVerification = false;
    returnObject.successMessage = null;

    switch (string) {
      case "noMatch":
        returnObject.errors = {
          id: 100,
          message: "noMatch"
        };
        break;
      case "connection":
        returnObject.errors = {
          id: 800,
          message: "Some error in the backend occured"
        };
        break;
      case "query":
        returnObject.errors = {
          id: 900,
          message: "Some error in the backend occured"
        };
        break;
      default:
        break;
    }

    res.json(returnObject);
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
