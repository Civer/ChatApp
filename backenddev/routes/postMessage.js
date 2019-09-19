var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validPost: true,
  errors: null
};

//Define router and params
router.get("/:userid&:session&:chatid&:message", function(req, res, next) {
  console.log(req.params.userid);
  console.log(req.params.session);
  console.log(req.params.chatid);
  console.log(req.params.message);
  res.json(testData);
});

module.exports = router;
