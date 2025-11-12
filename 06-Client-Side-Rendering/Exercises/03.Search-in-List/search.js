import { towns } from "./towns.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('towns');
const searchTextRef = document.getElementById('searchText');
const result = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);

search();

function search(e) {
   let searchText = null;

   if (e) {
      searchText = searchTextRef.value;
      if (!searchText) {
         return;
      }
   }

   const matches = towns.filter(town => town.includes(searchText));
   const temp = towns.map(town => createTownTemp(town, searchText));

   const townsTemp = html `<ul>${temp}</ul>`;

   render(townsTemp, root);
   displayResultText();
   
   function createTownTemp(town, searchText) {
      const isMatched = town.includes(searchText);
      return html`<li class=${isMatched ? 'active' : ''}>${town}</li>`
   }

   function displayResultText() {
      result.textContent = `${matches.length} matches found`;
   }
}