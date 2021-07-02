const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all the voters
router.get('/voters', (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;

  db.query(sql, (err, row) => {
    if(err) {
      res.status(500).json({ message: err.message});
      return;
    }

    res.json({
      message : 'success',
      data : row
    });
  });
});

// Get an induvidual voter
router.get('/voter/:id', (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if(err) {
      res.status(400).json({message: err.message});
      return;
    }

    res.json({
      message : 'success',
      data : row
    })
  });
})

// Create a new voter using post
router.post('/voter', ({body}, res) => {
  // Data validation
  const errors = inputCheck(body, 'first_name', 'last_name', 'email');
  if(errors) {
    res.status(400).json({error: errors});
    return;
  }
  const sql = `INSERT INTO voters (first_name, last_name, email)
              VALUES (? , ? , ?)`;
  const params = [body.first_name, body.last_name, body.email];

  db.query(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({error: err.message});
      return;
    }

    res.json({
      message : 'success',
      data : body
    })
  });
});

// Put route to update the email
router.put('/voter/:id', (req, res) => {
  // data validation
  const errors = inputCheck(req.body, 'email');

  if(errors) {
    res.status(400).json({errors: errors})
  }

  const sql = `UPDATE voters SET email = ? WHERE id = ?`;
  const params = [req.body.email , req.params.id];

  db.query(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({error: err.message});
      return;
    } else if(!result.affectedRows) {
      res.json({
        message: 'Voter not found!'
      });
    } else {
      res.json({
        message : 'success',
        data : req.body,
        changes : result.affectedRows
      });
    }
  });
}); 

// Delete route to delete voters
router.delete('/voter/:id', (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if(err) {
      res.status(400).json({error: err.message});
      return;
    } else if (!result.affectedRows) {
      res.json({
        message : 'Voter not found'
      });
    } else {
      res.json({
        message : 'success',
        changes : result.affectedRows,
        id : req.params.id
      });
    }
  });
})

module.exports = router;