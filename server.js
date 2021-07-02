const express = require('express');
// const mysql = require('mysql2');
const db = require('./db/connection');
// If the directory has an index.js file in it, Node.js will automatically look for it when requiring the directory.
const apiRoutes = require('./routes/apiRoutes');

// API routes
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use API routes
app.use('/api', apiRoutes);


// Default response for any other request (Not found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if(err) throw err;
  console.log('Database Connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

