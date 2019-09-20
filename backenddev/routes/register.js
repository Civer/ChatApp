var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");
var crypto = require("crypto");
var nodemailer = require("nodemailer");

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
      var error = returnError("connection");
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          var error = returnError("query");
        } else {
          //Check if exactly one result is found
          if (results.length !== 1) {
            var error = returnError("userNotFound");
          } else {
            var res = results[0];
            attemptConnection(results);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  res.json(testData);
});

module.exports = router;
