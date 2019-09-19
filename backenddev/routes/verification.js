var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validRegistration: true,
  successMessage: {
    id: 100,
    message: "Congratulations. You may now log in to the application!"
  },
  errors: null
};

//Define router and params
router.get("/:userid&:token", function(req, res, next) {
  console.log(req.params.userid);
  console.log(req.params.token);
  res.json(testData);
});

module.exports = router;
