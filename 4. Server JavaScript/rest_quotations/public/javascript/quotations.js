/* global items */

getQuotations();

function getQuotations() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    let body = JSON.parse(xhr.responseText);
    let result = '';
    for (let row of body) {
      result += `
        <li>
          ${row.author}:
          <a href="${row.url}">
            ${row.prelude}
          </a>
        </li>
      `;
    }
    items.innerHTML = result;
  };
  xhr.open('GET', '/quotations');
  xhr.send();
}