var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");

//Defining Static Test Data
var returnObject = {
  validCall: true,
  users: [],
  errors: {}
};

//Define router and params
router.get("/:userid&:session", function(req, res, next) {
  var userid = req.params.userid;
  var session = req.params.session;

  var query =
    "select userid, sessionKey from usersession where userid = " +
    userid +
    " AND sessionKey = '" +
    session.toUpperCase() +
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
            var error = returnError("noActiveSession");
          } else {
            getUsers(userid);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  var getUsers = function(userid) {
    var query = "select userid, loginname from user where userid != " + userid;

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
            console.log(results);
            returnUserObject(results);
          }
        });
        //Release connection.
        conn.release();
      }
    });

    //Handling Return errors
  };

  var returnError = function(string) {
    returnObject.validCall = false;
    returnObject.users = null;

    switch (string) {
      case "noActiveSession":
        returnObject.errors = {
          id: 100,
          message: "noActiveSession"
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
  var returnUserObject = function(users) {
    returnObject.validCall = true;
    returnObject.users = users;
    returnObject.errors = null;

    res.json(returnObject);
  };
});

module.exports = router;
