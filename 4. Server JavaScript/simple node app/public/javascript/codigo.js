/* global num1, num2, textoSalida, entradas, salida */

function calcularGCD() {
  console.log('Calculando GCD...');
  let x = num1.value || 1;
  let y = num2.value || 1;
  console.log(x, y);

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    let body = JSON.parse(xhr.responseText);
    if (body.status === 'ok')  {
      textoSalida.innerText =
        `El máximo común divisor de ${x} y de ${y} es ${body.result}.`;
    } else {
      textoSalida.innerText = body.message;
    }
    entradas.style.display = 'none';
    salida.style.display = 'block';
  };
  xhr.open('GET', `/gcd/${x}/${y}`);
  xhr.send();
}