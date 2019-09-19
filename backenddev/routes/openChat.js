var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validChatRequest: true,
  errors: null
};

//Define router and params
router.get("/:userid&:session&:partnerid", function(req, res, next) {
  console.log(req.params.userid);
  console.log(req.params.session);
  console.log(req.params.partnerid);
  res.json(testData);
});

module.exports = router;
