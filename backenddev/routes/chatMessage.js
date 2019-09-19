var express = require("express");
var router = express.Router();

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

//Define router and params
router.get("/:userid&:session&:chatid", function(req, res, next) {
  console.log(req.params.userid);
  console.log(req.params.session);
  console.log(req.params.chatid);
  res.json(testData);
});

module.exports = router;
