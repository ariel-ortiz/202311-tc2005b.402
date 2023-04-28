const fs = require('fs');

function main() {
  let resultado = '';
  fs.readFile('001.txt', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      resultado += data.toString();
      fs.readFile('002.txt', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resultado += data.toString();
          fs.readFile('003.txt', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              resultado += data.toString();
              fs.writeFile('result.txt', resultado, err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('All OK!');
                }
              });
            }
          });
        }
      });
    }
  });
  console.log('resultado=', resultado);
}

main();