var express = require("express");
var router = express.Router();
var getConnection = require("./helpers/db");
var crypto = require("crypto");

//Defining Static Test Data
/*
var testData = {
  validLogin: true,
  token: "ABCDEFGH123456",
  errors: null
};*/

var returnObject = {
  validLogin: null,
  userId: null,
  token: null,
  errors: {}
};

//Define router and params
router.get("/:username&:pass", function(req, res, next) {
  var username = req.params.username;
  var usedPassword = req.params.pass;

  var query =
    "select userid, password, salt, isVerified from user where UPPER(loginName) = '" +
    username.toUpperCase() +
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

  var attemptConnection = function(results) {
    //Get values from database
    var res = results[0];
    var userid = res.userid;
    var password = res.password;
    var salt = res.salt;
    var isVerified = res.isVerified;

    //Check if user is already verified
    if (isVerified !== 1) {
      if (checkPassword(usedPassword, password, salt)) {
        //checkActiveSession(userid); Delayed till core functionality is ready
        var sessionToken = createSessionToken(userid);
        returnSessionToken(userid, sessionToken);
      } else {
        returnError("wrongPassword");
      }
    } else {
      returnError("notVerified");
    }
  };

  //Handling Return errors

  var returnError = function(string) {
    returnObject.validLogin = false;
    returnObject.token = null;
    returnObject.userId = null;

    switch (string) {
      case "userNotFound":
        returnObject.errors = {
          id: 100,
          message: "UserNotFound"
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
  var returnSessionToken = function(userId, token) {
    returnObject.validLogin = true;
    returnObject.userId = userId;
    returnObject.token = token;
    returnObject.errors = null;

    res.json(returnObject);
  };
});

var checkPassword = function(usedPassword, password, salt) {
  var saltedPassword = usedPassword.toUpperCase() + salt;
  var sha256Pass = crypto
    .createHash("sha256")
    .update(saltedPassword)
    .digest("hex");
  if (password.toUpperCase() == sha256Pass.toUpperCase()) {
    return true;
  } else {
    return false;
  }
};

var createSessionToken = function(userId) {
  var token = crypto
    .createHash("md5")
    .update(generateToken())
    .digest("hex");
  var executableQuery =
    "insert into usersession (sessionKey, userId, isActive) values ('" +
    token +
    "'," +
    userId +
    ",1)";

  getConnection(function(err, conn) {
    if (err) {
      console.log("getConnection: " + err);
      return false;
    } else {
      //Execute query
      //console.log(query);
      conn.query(executableQuery, function(err, results) {
        if (err) {
          console.log("conn.query: " + err + " / " + executableQuery);
          return false;
        } else {
          return token;
        }
      });
      //Release connection.
      conn.release();
    }
  });

  return token;
};

var checkActiveSession = function(userId) {
  var query = "SELECT sessionid FROM userSession WHERE userid = " + userId;

  var results = getConnection(function(err, conn) {
    if (err) {
      console.log("getConnection: " + err);
    } else {
      //Execute query
      console.log(query);
      conn.query(query, function(err, results) {
        if (err) {
          console.log("conn.query: " + err + " / " + query);
        } else {
          console.log(results);
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
        console.log(sessions[i].sessionid);
        var query =
          "DELETE FROM usersession WHERE sessionid = " + sessions[i].sessionid;
        //Execute query
        console.log(query);
        conn.query(query, function(err, results) {
          if (err) {
            console.log("conn.query: " + err);
            return false;
          } else {
            console.log("Deleted Row: " + results.affectedRow);
          }
        });
        //Release connection.
      }
      conn.release();
    }
  });
};

var generateToken = function() {
  var length = 16,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

module.exports = router;
