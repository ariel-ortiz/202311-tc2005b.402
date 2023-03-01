let veces = 0;
const info = document.getElementById('info');

function miClic() {
  veces++;
  info.innerHTML = '<b>Push #' + veces + '</b>';
  info.style['background-color'] = 'red';
  info.style.color = 'white';
  info.style.padding = '10px';
}