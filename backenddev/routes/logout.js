var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  valivalidLogout: true
};

//Define router and params
router.get("/:userid&:session", function(req, res, next) {
  console.log(req.params.userid);
  console.log(req.params.session);
  res.json(testData);
});

module.exports = router;
