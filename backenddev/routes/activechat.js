var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
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

//Define router and params
router.get("/:userid&:session", function(req, res, next) {
  console.log(req.params.userid);
  console.log(req.params.session);
  res.json(testData);
});

module.exports = router;
