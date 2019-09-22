var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var getConnection = require("./helpers/db");
var errors = require("./helpers/writeError");

//Defining Static Test Data
var testdata = {
  validCall: true,
  chats: [
    {
      chatId: 1,
      userId1: 100,
      userId2: 200,
      userName1: "Name of First User of conversation",
      userName2: "Name of Call User",
      lastTimeAndDate: new Date(),
      state: 1
    },
    {
      chatId: 4,
      userId1: 200,
      userId2: 400,
      userName1: "Name of Call User of conversation",
      userName2: "Name of User with Id 400",
      lastTimeAndDate: new Date(),
      state: 2
    }
  ],
  errors: null
};

var returnObject = {
  validCall: null,
  chats: [],
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
            getActiveChats(userid);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  var getActiveChats = function(userid) {
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
          returnActiveChats(result);
          db.close();
        });
    });
  };

  //Returns token - Called after all password checks returned true
  var returnActiveChats = function(chats) {
    returnObject.validCall = true;
    returnObject.chats = chats;
    returnObject.errors = null;

    res.json(returnObject);
  };
});

module.exports = router;
