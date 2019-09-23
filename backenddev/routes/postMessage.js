var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var getConnection = require("./helpers/db");
var errors = require("./helpers/writeError");

//Defining Static Test Data
var returnObject = {
  validPost: null,
  errors: null
};

var userid = null;
var session = null;
var chatid = null;
var loginUser1 = null;
var message = null;

//Define router and params
router.post("/:userid&:session&:chatid&:message", function(req, res, next) {
  userid = req.params.userid;
  session = req.params.session;
  chatid = req.params.chatid;
  message = req.params.message;

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
            checkIfChatIsAlreadyOpened();
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

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
            getLoginName();
          } else {
            res.json(errors.returnError("chatDoesNotExist"));
          }
          db.close();
        });
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
            createMessage();
          }
        });
        //Release connection.
        conn.release();
      }
    });
  };

  var createMessage = function() {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chatDB");

      var newMessageObject = {
        chatId: chatid,
        userId: userid,
        userName: loginUser1,
        message: message,
        lastTimeAndDate: new Date(),
        state: 1
      };

      dbo
        .collection("messages")
        .insertOne(newMessageObject, function(err, result) {
          if (err) throw err;
          console.log("Insertion completed");
          returnProperMessage();
          db.close();
        });
    });
  };

  //Returns token - Called after all password checks returned true
  var returnProperMessage = function() {
    returnObject.validPost = true;
    returnObject.errors = null;

    res.json(returnObject);
  };
});

module.exports = router;
