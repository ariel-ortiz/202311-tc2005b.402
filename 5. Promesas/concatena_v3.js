const fsPromises = require('fs/promises');

async function main() {
  let resultado = '';
  try {
    resultado += await fsPromises.readFile('001.txt');
    resultado += await fsPromises.readFile('002.txt');
    resultado += await fsPromises.readFile('003.txt');
    await fsPromises.writeFile('result.txt', resultado);
    console.log('All OK!');
  } catch (err) {
    console.log(err);
  }
  console.log('resultado=\n', resultado);
}

main();
