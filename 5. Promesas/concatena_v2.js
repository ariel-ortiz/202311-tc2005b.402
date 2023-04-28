const fsPromises = require('fs/promises');

function main() {
  let resultado = '';
  fsPromises.readFile('001.txt')
  .then(data => {
    resultado += data.toString();
    return fsPromises.readFile('002.txt');
  })
  .then(data => {
    resultado += data.toString();
    return fsPromises.readFile('003.txt');
  })
  .then(data => {
    resultado += data.toString();
    return fsPromises.writeFile('result.txt', resultado);
  })
  .then(() => {
    console.log('All OK!');
  })
  .catch(err => {
    console.log(err);
  });
  console.log('resultado=', resultado);
}

main();