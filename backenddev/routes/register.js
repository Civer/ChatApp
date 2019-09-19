var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validRegistration: true,
  successMessage: {
    id: 100,
    message:
      "Registration completed. Please confirm your Account via Mail before you login."
  },
  errors: null
};

//Define router and params
router.get("/:username&:pass&:email", function(req, res, next) {
  console.log(req.params.username);
  console.log(req.params.pass);
  console.log(req.params.email);
  res.json(testData);
});

module.exports = router;
