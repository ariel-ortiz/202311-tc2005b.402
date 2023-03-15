const express = require('express');

const app = express();
const port = 8080;
const ipAddr = '34.230.161.23';

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200);
  res.send('hola mundo');
});

app.get('/hola/:nombre', (req, res) => {
  let n = req.params.nombre;
  res.type('text/plain');
  res.send(`Hola, ${n}.`);
});

app.get('/prueba', (req, res) => {
  res.type('text/plain');
  res.send('Esta es una prueba en formato texto');
});

// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(port, () => {
  console.log(`Express iniciado en http://${ipAddr}:${port}`
    + '\nPresiona Ctrl-C para terminar.');
});
