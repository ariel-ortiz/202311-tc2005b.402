const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'web_database',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

db.connect(err => {
  if (err) {
    console.log('Unable to connect to the database.');
    throw err;
  } else {
    console.log('Connected to database.');
    do_select();
  }
});

function do_select() {
  let sqlQuery = 'SELECT DISTINCT author FROM quotations ORDER BY author';
  db.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log('Success!');
      for (let row of result) {
        console.log(row.author);
      }
      db.end();
    }
  });
}