const express = require('express');
const mysql = require('mysql');
const port = 8080;
const ipAddr = '34.230.161.23';

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  database: 'web_database',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

db.connect(err => {
  if (err) {
    console.error('Unable to connect to the database.');
    throw err;
  } else {
    console.log('Connected to the database.');
  }
});

app.get('/quotations', (req, res) => {
  db.query('SELECT id, author, excerpt FROM quotations', (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let result = [];
      for (let row of rows) {
        result.push({
           id: row.id,
           author: row.author,
           prelude: row.excerpt?.split(' ').slice(0, 3).join(' ') + '...',
           url: `http://${ipAddr}:${port}/quotations/${row.id}`
        });
      }
      res.json(result);
    }
  });
});

app.get('/quotations/:id', (req, res) => {
  db.query('SELECT id, author, excerpt FROM quotations WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      if (err) {
        res.status(500).json(err);
      } else {
        let row = rows[0];
        if (row) {
          res.json({
            id: row.id,
            author: row.author,
            excerpt: row.excerpt
          });
        } else {
          res.type('text').status(404).send('Resource not found.\n');
        }
      }
    });
});

app.post('/quotations', (req, res) => {
  let { author, excerpt } = req.body;
  db.query('INSERT INTO quotations (author, excerpt) VALUES (?, ?)',
  [author, excerpt],
  (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.type('text')
        .status(201)
        .send(`Resource created with ID = ${result.insertId}.\n`);
    }
  });
});

app.delete('/quotations/:id', (req, res) => {
  let id = req.params.id;
  db.query('DELETE FROM quotations WHERE id = ?',
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.type('text').send(`Resource with ID = ${id} deleted.\n`);
      }
    });
});

app.delete('/quotations', (req, res) => {
  db.query('DELETE FROM quotations',
    (err, rows) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.type('text').send(`All resources deleted.\n`);
      }
    });
});

app.put('/quotations/:id', (req, res) => {
  let id = req.params.id;
  let { author, excerpt } = req.body;
  db.query('UPDATE quotations SET author=?, excerpt=? WHERE id=?',
  [author, excerpt, id],
  (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (result.affectedRows === 1) {
        res.type('text').send(
          `Resource with ID = ${id} updated.\n`);
      } else {
        res.type('text').status(400).send(
          `Unable to update resource with ID = ${id}.\n`);
      }
    }
  });
});

// custom 404 page
app.use((req, res) => {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port, () => console.log(
  `Express started on http://${ipAddr}:${port}`
  + '\nPress Ctrl-C to terminate.'));
