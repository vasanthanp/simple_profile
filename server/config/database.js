const mysql = require("mysql");
const { DB_CONFIG } = require("../config/index");

// creating connection to DB
const connection = mysql.createConnection(DB_CONFIG);
// open connection to DB
connection.connect((err) => {
  if (err) console.log(`Error in DB connection ${err}`);
  console.log(`DB connected successfully`);
});

connection.query(
  `CREATE TABLE IF NOT EXISTS user (id varchar(36), name varchar(30),email varchar(30),password varchar(60),contact BIGINT, age int(3),DOB date)`,
  (err, result) => {
    if (err) console.log(`Error on creating user table ${err}`);
  }
);

module.exports = connection;
