/* global excerpt, author */

const MAX_QUOTATIONS = 50;

start();

function start() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    let body = JSON.parse(xhr.responseText);
    excerpt.innerText = body.excerpt;
    author.innerText = body.author;
  };
  const randomNum = Math.floor(Math.random() * MAX_QUOTATIONS) + 1;
  xhr.open('GET', `/quotations/${randomNum}`);
  xhr.send();
}
