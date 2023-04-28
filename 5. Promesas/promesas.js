function makePromise(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n % 2 == 0) {
        resolve(n);
      } else {
        reject(`Odio el número impar ${n}`);
      }
    }, n);
  });
}

// makePromise(1000)
// .then(x => {
//   console.log('Promesa 1 resuelta con:', x);
//   return makePromise(2001);
// })
// .then(x => {
//   console.log('Promesa 2 resuelta con:', x);
// })
// .catch(err => {
//   console.log(err);
// });

async function main() {
  try {
    let x;
    x = await makePromise(1000);
    console.log('Promesa 1 resuelta con:', x);
    x = await makePromise(2000);
    console.log('Promesa 2 resuelta con:', x);
  } catch (err) {
    console.log(err);
  }
  return 0;
}

(async () => {
  let z = await main();
  console.log(z);
})();