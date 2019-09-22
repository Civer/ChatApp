var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var getConnection = require("./helpers/db");
var errors = require("./helpers/writeError");

//Defining Static Test Data
var returnObject = {
  validChatRequest: null,
  errors: null
};

var userid = null;
var session = null;
var partnerid = null;
var loginUser1 = null;
var loginUser2 = null;

//Define router and params
router.get("/:userid&:session&:partnerid", function(req, res, next) {
  userid = req.params.userid;
  session = req.params.session;
  partnerid = req.params.partnerid;

  var query =
    "select userid, sessionKey from usersession where userid = " +
    userid +
    " AND sessionKey = '" +
    session.toUpperCase() +
    "'";

  //Get active session
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
            checkIfPartnerExists();
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  var checkIfPartnerExists = function() {
    var query =
      "select userid, loginName, isVerified from user where userid = " +
      partnerid;

    //Get active session
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
              res.json(errors.returnError("partnerNotExisting"));
            } else {
              if (results[0].isVerified === 0) {
                res.json(errors.returnError("partnerNotVerified"));
              } else {
                loginUser2 = results[0].loginName;
                getLoginName();
              }
            }
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var getLoginName = function() {
    var query = "select userid, loginName from user where userid = " + userid;

    //Get active session
    getConnection(function(err, conn) {
      if (err) {
        res.json(errors.returnError("connection"));
      } else {
        //Execute query
        conn.query(query, function(err, results) {
          if (err) {
            res.json(errors.returnError("query"));
          } else {
            loginUser1 = results[0].loginName;
            checkIfChatIsAlreadyOpened();
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var checkIfChatIsAlreadyOpened = function() {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chatDB");

      var query = { $or: [{ userId1: userid }, { userId2: userid }] };

      dbo
        .collection("chats")
        .find(query)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length);
          if (result.length != 0) {
            res.json(errors.returnError("chatAlreadyOpen"));
          } else {
            createChat();
          }
          db.close();
        });
    });
  };

  var createChat = function() {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chatDB");

      var newChatObject = {
        userId1: userid,
        userId2: partnerid,
        userName1: loginUser1,
        userName2: loginUser2,
        lastTimeAndDate: new Date(),
        state: 1
      };

      dbo.collection("chats").insertOne(newChatObject, function(err, result) {
        if (err) throw err;
        console.log("Insertion completed");
        returnChatOpenedProperly();
        db.close();
      });
    });
  };

  //Returns token - Called after all password checks returned true
  var returnChatOpenedProperly = function() {
    returnObject.validChatRequest = true;
    returnObject.errors = null;

    res.json(returnObject);
  };
});

module.exports = router;
