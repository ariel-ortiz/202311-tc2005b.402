const cartas = iniciaCartas();
console.log(cartas);

function iniciaCartas() {
  const cartas = [];
  for (let palo of 'CDHS') {
    for (let i = 1; i <= 13; i++) {
      cartas.push(`${palo}_${i.toString().padStart(2, '0')}.svg`);
    }
  }
  shuffle(cartas);
  return cartas;
}

// Tomado de:
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(a) {
  for (let i = a.length - 1; i >= 1; i--) {
    let j = Math.floor((Math.random() * (i + 1)));
    let t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
}

/* global laCarta */

function descubreCarta() {
  let carta = cartas.pop();
  laCarta.src = 'cards/' + carta;
}