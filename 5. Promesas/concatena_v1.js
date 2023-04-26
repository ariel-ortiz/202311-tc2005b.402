const fs = require('fs');

function main() {
  let resultado = '';
  fs.readFile('001.txt', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      resultado += data.toString();
      console.log(resultado);
    }
  });
  console.log('resultado=', resultado);
}

main();