import { data } from "../data/data.js";
import { html } from "../lib.js";

const temp = (data) => html`
  <h3 class="heading">Marketplace</h3>
  <section id="dashboard">
    ${data.length ? html`
      ${data.map(item => itemTemp(item))}` 
      : html`
      <h3 class="no-drones">No Drones Available</h3>`
    }
  </section>
`

const itemTemp = (item) => html`
  <div class="drone">
    <img src=".${item.imageUrl}" alt="example1" />
    <h3 class="model">${item.model}</h3>
    <div class="drone-info">
      <p class="price">Price: €${item.price}</p>
      <p class="condition">Condition: ${item.condition}</p>
      <p class="weight">Weight: ${item.weight}g</p>
    </div>
    <a class="details-btn" href="/details/${item._id}">Details</a>
  </div>
`

export async function showDashboardView(ctx) {
  const drones = await data.getAll();
  ctx.render(temp(drones));
}