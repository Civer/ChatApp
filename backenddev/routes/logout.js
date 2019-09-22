var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");
var errors = require("./helpers/writeError");

//Defining Static Test Data
var returnObject = {
  validLogout: null,
  errors: {}
};

//Define router and params
router.get("/:userid&:session", function(req, res, next) {
  var userid = req.params.userid;

  var query = "select sessionId from usersession where userId = " + userid;

  //Get Connection to database
  getConnection(function(err, conn) {
    if (err) {
      res.json(errors.returnError("connection"));
    } else {
      //Execute query
      console.log(query);
      conn.query(query, function(err, results) {
        if (err) {
          res.json(errors.returnError("query"));
        } else {
          //Check if exactly one result is found
          if (results.length === 0) {
            res.json(errors.returnError("noSessionFound"));
          } else {
            var res = results[0];
            checkActiveSession(userid);
            returnLogout();
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  //Returns token - Called after all password checks returned true
  var returnLogout = function() {
    returnObject.validLogout = true;

    res.json(returnObject);
  };
});

var checkActiveSession = function(userId) {
  var query = "SELECT sessionid FROM userSession WHERE userid = " + userId;

  var results = getConnection(function(err, conn) {
    if (err) {
      res.json(errors.returnError("connection"));
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          res.json(errors.returnError("query"));
        } else {
          if (results.length > 0) {
            terminateSessions(results);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });
};

var terminateSessions = function(sessions) {
  getConnection(function(err, conn) {
    if (err) {
      res.json(errors.returnError("connection"));
      return false;
    } else {
      for (var i = 0; sessions.length > i; i++) {
        var query =
          "DELETE FROM usersession WHERE sessionid = " + sessions[i].sessionid;
        //Execute query
        conn.query(query, function(err, results) {
          if (err) {
            res.json(errors.returnError("query"));
            return false;
          } else {
            console.log("Logout performed!");
          }
        });
        //Release connection.
      }
      conn.release();
    }
  });
};

module.exports = router;
