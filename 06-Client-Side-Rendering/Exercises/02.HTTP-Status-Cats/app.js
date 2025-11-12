import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('allCats');

renderTemp()

Array.from(document.querySelectorAll('.showBtn')).forEach(btn => {
  btn.addEventListener('click', onClick);
})

function createTemp() {
  const cardTemp = cats.map(cat => createCatTemp(cat));
  return html `
    <ul>
      ${cardTemp}
    </ul>`
}

function createCatTemp(cat) {
  return html `
    <li>
      <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
      <div class="info">
          <button class="showBtn">Show status code</button>
          <div class="status" style="display: none" id=${cat.id}>
              <h4>Status Code: ${cat.statusCode}</h4>
              <p>${cat.statusMessage}</p>
          </div>
      </div>
    </li>`
}

function renderTemp() {
  render(createTemp(), root);
}

function onClick(e) {
  const div = e.target.parentElement.children[1];
  const btn = e.target;
  if (btn.textContent === 'Show status code') {
    div.style.display = 'block';
    btn.textContent = 'Hide status code';
  } else {
    div.style.display = 'none';
    btn.textContent = 'Show status code';
  }
}