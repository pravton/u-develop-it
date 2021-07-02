const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySql UserName
    user: 'root',
    // Mysql Password
    password: 'pravtoncoding',
    database: 'election'
  }, 
)

module.exports = db;