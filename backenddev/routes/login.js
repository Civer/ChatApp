var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validLogin: true,
  token: "ABCDEFGH123456",
  errors: null
};

//Define router and params
router.get("/:username&:pass", function(req, res, next) {
  console.log(req.params.username);
  console.log(req.params.pass);
  res.json(testData);
});

module.exports = router;
