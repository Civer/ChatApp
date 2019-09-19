var mysql = require("mysql");
var CONFIG = require("./config.json");

var pool = mysql.createPool({
  host: CONFIG.dbHost,
  user: CONFIG.dbUser,
  password: CONFIG.dbPass,
  database: CONFIG.dbName
});

var getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
    callback(err, connection);
  });
};

module.exports = getConnection;
