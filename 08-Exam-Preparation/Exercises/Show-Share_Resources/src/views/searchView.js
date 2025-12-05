import { data } from '../data/data.js';
import { html, render } from '../lib.js';

const temp = () => html `
  <section id="search">

    <div class="form">
      <h2>Search</h2>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list" @click=${onClick}>Search</button>
      </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
    </div>
  </section>
`

const searchTemp = (show) => html`
  ${show.length === 0 ? html`
      <p class="no-result">There is no TV show with this title</p>
    ` : show.map(s => html`
      <div class="show">
        <img src="../${s.imageUrl}" alt="example1" />
        <div class="show">
          <h3 class="title">${s.title}</h3>
          <p class="genre">Genre: ${s.genre}</p>
          <p class="country-of-origin">Country of Origin: ${s.country}</p>
          <a class="details-btn" href="/details/${s._id}">Details</a>
        </div>
      </div>
    `)}
`
export function showSearchView(ctx) {
  ctx.render(temp());
}

async function onClick(e) {
  e.preventDefault();

  const searchedShow = document.getElementById('search-input').value;
  const root = document.querySelector('.search-result');

  if (!searchedShow) {
    return window.alert('Search field is required');
  }

  const show = await data.searchByTitle(searchedShow);
  render(searchTemp(show), root);
}