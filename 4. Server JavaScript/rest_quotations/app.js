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
           prelude: row.excerpt.split(' ').slice(0, 3).join(' ') + '...',
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

// custom 404 page
app.use((req, res) => {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port, () => console.log(
  `Express started on http://${ipAddr}:${port}`
  + '\nPress Ctrl-C to terminate.'));
