var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var getConnection = require("./helpers/db");
var errors = require("./helpers/writeError");

//Defining Static Test Data
var testData = {
  validCall: true,
  chatMessages: [
    {
      messageId: 1000,
      userId: 100,
      message: "Hallo.",
      lastTimeAndDate: new Date(),
      state: 1
    },
    {
      messageId: 1001,
      userId: 200,
      message: "Hey!",
      lastTimeAndDate: new Date(),
      state: 2
    }
  ],
  error: null
};

var returnObject = {
  validCall: null,
  chatMessages: [],
  errors: {}
};

//Define router and params
router.get("/:userid&:session&:chatid", function(req, res, next) {
  var userid = req.params.userid;
  var session = req.params.session;
  var chatid = req.params.chatid;

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
            getChatMessage(chatid);
          }
        }
      });
      //Release connection.
      conn.release();
    }
  });

  var getChatMessage = function(chatid) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chatDB");
      var query = { chatId: chatid };

      dbo
        .collection("messages")
        .find(query)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length);
          if (result.length === 0) {
            returnChatMessages([
              {
                chatId: null,
                lastTimeAndDate: new Date(),
                message: "This chat looks empty. Try to send a message.",
                state: 1,
                userId: 1,
                userName: "Chat Bot"
              }
            ]);
          } else {
            returnChatMessages(result);
          }
          db.close();
        });
    });
  };

  //Returns token - Called after all password checks returned true
  var returnChatMessages = function(chats) {
    returnObject.validCall = true;
    returnObject.chatMessages = chats;
    returnObject.errors = null;

    res.json(returnObject);
  };
});

module.exports = router;
