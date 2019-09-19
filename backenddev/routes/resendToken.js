var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validRegistration: true,
  successMessage: {
    id: 100,
    message:
      "The Mail was send a second time. Be aware the token from the first mail is now invalid."
  },
  errors: null
};

//Define router and params
router.get("/:username&:email", function(req, res, next) {
  console.log(req.params.username);
  console.log(req.params.email);
  res.json(testData);
});

module.exports = router;
