const entradas = document.getElementById('entradas');
const entrada1 = document.getElementById('entrada1');
const entrada2 = document.getElementById('entrada2');
const salida = document.getElementById('salida');
const resultado = document.getElementById('resultado');

function calcula_gcd() {
  let x = parseInt(entrada1.value) || 0;
  let y = parseInt(entrada2.value) || 0;
  let z = gcd(x, y);
  resultado.innerText = `El MCD de ${x} y ${y} es ${z}.`;
  entradas.style.display = 'none';
  salida.style.display = 'block';
}

// Taken from:
// https://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a, b) {
  while (b != 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}