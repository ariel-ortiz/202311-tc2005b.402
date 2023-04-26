console.log('inicio');
setTimeout(() => {
  console.log('A');
}, 1000);
setTimeout(() => {
  console.log('B');
  setTimeout(() => {
    console.log('C');
  }, 100);
}, 500);
console.log('final');