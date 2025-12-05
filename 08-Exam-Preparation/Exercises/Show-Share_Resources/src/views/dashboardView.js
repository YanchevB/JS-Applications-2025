import { data } from "../data/data.js";
import { html } from "../lib.js";

const temp = (shows) => html`
  <h2>Users Recommendations</h2>
  <section id="shows">
    ${shows.length ? html`
        ${shows.map(show => showTemp(show))}
      ` : html `
        <h2 id="no-show">No shows Added.</h2>
      `}
  </section>
`

const showTemp = (show) => html`
  <div class="show">
    <img src="../${show.imageUrl}" alt="example1" />
    <div class="show-info">
      <h3 class="title">${show.title}</h3>
      <p class="genre">Genre: ${show.genre}</p>
      <p class="country-of-origin">Country of Origin: ${show.country}</p>
      <a class="details-btn" href="/details/${show._id}">Details</a>
    </div>
  </div>
`

export async function showDashboardView(ctx) {
  const shows = await data.getAll();
  ctx.render(temp(shows));
}