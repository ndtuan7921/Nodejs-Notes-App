const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tuan*7*921",
  database: "notes_app",
  dateStrings: true,
});

module.exports = db;
