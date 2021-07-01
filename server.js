const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
  console.log('Connected to the election database.')
)

// db.query(`SELECT * FROM candidates `, (err, rows) => {
//   console.log(rows);
// });

// GET a single candidate
// db.query(`SELECT * FROM candidates where id = 2`, (err, row) =>  {
//   if(err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// // Ceate a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?, ?, ?, ?)`;
// const params = [1, 'Ronald', 'FirBank', 1];

// db.query(sql, params, (err, result) => {
//   if(err) {
//     console.log(err);
//   }
//   console.log(result);
// });


// DELETE a candidate 
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if(err) {
//     console.log(erer);
//   } 
//   console.log(result);
// });

// Default response for any other request (Not found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});