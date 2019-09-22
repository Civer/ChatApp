var returnError = function(string) {
  var returnObject = {};
  returnObject.validCall = false;
  returnObject.chats = null;

  switch (string) {
    case "userNotFound":
      returnObject.errors = {
        id: 100,
        message: "UserNotFound"
      };
      break;
    case "wrongPassword":
      returnObject.errors = {
        id: 120,
        message: "Wrong Password"
      };
      break;
    case "notVerified":
      returnObject.errors = {
        id: 130,
        message: "UserNotVerified"
      };
      break;

    case "partnerNotExisting":
      returnObject.errors = {
        id: 200,
        message: "partnerNotExisting"
      };
      break;
    case "partnerNotVerified":
      returnObject.errors = {
        id: 220,
        message: "partnerNotVerified"
      };
      break;
    case "noActiveSession":
      returnObject.errors = {
        id: 400,
        message: "noActiveSession"
      };
      break;

    case "noSessionFound":
      returnObject.errors = {
        id: 410,
        message: "noSessionFound"
      };
      break;
    case "chatAlreadyOpen":
      returnObject.errors = {
        id: 600,
        message: "chatAlreadyOpen"
      };
      break;
    case "chatDoesNotExist":
      returnObject.errors = {
        id: 610,
        message: "chatDoesNotExist"
      };
      break;
    case "uniqueConstraint":
      returnObject.errors = {
        id: 700,
        message: "uniqueConstraint"
      };
      break;
    case "mailNotSendProperly":
      returnObject.errors = {
        id: 710,
        message: "uniqueConstraint"
      };
      break;
    case "noMatch":
      returnObject.errors = {
        id: 720,
        message: "noMatch"
      };
      break;
    case "connection":
      returnObject.errors = {
        id: 800,
        message: "Some error in the backend occured"
      };
      break;
    case "query":
      returnObject.errors = {
        id: 900,
        message: "Some error in the backend occured"
      };
      break;
    default:
      break;
  }

  return returnObject;
};

var errors = {
  returnError: returnError
};

module.exports = errors;
