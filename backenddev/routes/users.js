var express = require("express");
var router = express.Router();

//Defining Static Test Data
var testData = {
  validCall: true,
  users: [
    {
      id: 100,
      name: "Christian"
    },
    {
      id: 200,
      name: "Michel"
    },
    {
      id: 300,
      name: "Martin"
    },
    {
      id: 400,
      name: "Peter"
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
