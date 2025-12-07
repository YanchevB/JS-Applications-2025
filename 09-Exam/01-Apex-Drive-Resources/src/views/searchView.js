import { data } from '../data/data.js';
import { html, render } from '../lib.js';

const temp = (result) => html`
  <section id="search">
    <div class="form">
      <h4>Search</h4>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list" @click=${onSearch}>Search</button>
      </form>
    </div>
    <div class="search-result">
      
      
    </div>
  </section>
`
const searchTemp = (car) => html`
  ${car.length === 0 ? html`
      <h2 class="no-avaliable">No result.</h2>
    `: car.map(c => html`
      <div class="car">
        <img src=".${c.imageUrl} alt="example1" />
        <h3 class="model">${c.model}</h3>
        <a class="details-btn" href="/details/${c._id}">More Info</a>
      </div>
    `)}
`

export function showSearchView(ctx) {
  ctx.render(temp());
}

async function onSearch(e) {
  e.preventDefault();

  const searchedCar = document.getElementById('search-input').value;
  const root = document.querySelector('div.search-result');

  if (!searchedCar) {
    return window.alert('Search field is required');
  }

  const query = await data.getByModel(searchedCar);
  debugger
  render(searchTemp(query), root);
}