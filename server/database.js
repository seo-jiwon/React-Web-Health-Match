const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "13.125.143.68",
    user : "4MI",
    password : "4MI",
    database : "healthmatching"
});
connection.connect();

module.exports = connection;