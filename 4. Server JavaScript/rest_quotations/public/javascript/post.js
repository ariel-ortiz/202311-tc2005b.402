/* global authorField excerptField main endMessage result */

function saveData() {
  const payLoad = JSON.stringify({
    author: authorField.value,
    excerpt: excerptField.value
  });
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    result.innerText = xhr.responseText;
    main.style.display = 'none';
    endMessage.style.display = 'block';
  };
  xhr.open('POST', '/quotations');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(payLoad);
}

