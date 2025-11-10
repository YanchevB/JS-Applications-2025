import { html, render } from "./node_modules/lit-html/lit-html.js";

const btn = document.getElementById('btnLoadTowns');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.getElementById('towns').value;
  const inputArr = input.split(', ');
  const template = ulTemplate(inputArr);
  renderUl(template);
})

const ulTemplate = (inputArr) => html`
  <ul>
    ${inputArr.map(input => html`<li>${input}</li>`)}
  </ul>  
`

function renderUl(template) {
  const root = document.getElementById('root');
  render(template, root);
}