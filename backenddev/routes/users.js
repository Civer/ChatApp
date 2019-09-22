var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");
var errors = require("./helpers/writeError");

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
      res.json(errors.returnError("connection"));
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          res.json(errors.returnError("query"));
        } else {
          //Check if exactly one result is found
          if (results.length !== 1) {
            res.json(errors.returnError("noActiveSession"));
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
        res.json(errors.returnError("connection"));
      } else {
        //Execute query
        conn.query(query, function(err, results) {
          if (err) {
            res.json(errors.returnError("query"));
          } else {
            returnUserObject(results);
          }
        });
        //Release connection.
        conn.release();
      }
    });

    //Handling Return errors
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
