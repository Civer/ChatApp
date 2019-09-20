var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");

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
      var error = returnError("connection");
    } else {
      //Execute query
      console.log(query);
      conn.query(query, function(err, results) {
        if (err) {
          var error = returnError("query");
        } else {
          //Check if exactly one result is found
          if (results.length === 0) {
            var error = returnError("noSessionFound");
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

  //Handling Return errors

  var returnError = function(string) {
    returnObject.validLogout = false;

    switch (string) {
      case "noSessionFound":
        returnObject.errors = {
          id: 100,
          message: "noSessionFound"
        };
        break;
      case "wrongPassword":
        returnObject.errors = {
          id: 200,
          message: "Wrong Password"
        };
        break;
      case "notVerified":
        returnObject.errors = {
          id: 300,
          message: "Some error in the backend occured"
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
  var returnLogout = function() {
    returnObject.validLogout = true;

    res.json(returnObject);
  };
});

var checkActiveSession = function(userId) {
  var query = "SELECT sessionid FROM userSession WHERE userid = " + userId;

  var results = getConnection(function(err, conn) {
    if (err) {
      console.log("getConnection: " + err);
    } else {
      //Execute query
      conn.query(query, function(err, results) {
        if (err) {
          console.log("conn.query: " + err + " / " + query);
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
      console.log("getConnection: " + err);
      return false;
    } else {
      for (var i = 0; sessions.length > i; i++) {
        var query =
          "DELETE FROM usersession WHERE sessionid = " + sessions[i].sessionid;
        //Execute query
        conn.query(query, function(err, results) {
          if (err) {
            console.log("conn.query: " + err);
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
