var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");

//Defining Static Test Data
var testData = {
  validLogin: true,
  token: "ABCDEFGH123456",
  errors: null
};

//Define router and params
router.get("/:username&:pass", function(req, res, next) {
  var username = req.params.username;
  var password = req.params.pass;

  var query =
    "select password, salt, isVerified from user where loginName = '" +
    username.toUpperCase() +
    "'";

  //Get Connection and fetch necessary data
  getConnection(function(err, conn) {
    console.log(query);
    conn.query(query, function(err, rows) {
      console.log(rows);
    });
    conn.release();
  });

  res.json(testData);
});

module.exports = router;
