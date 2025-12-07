import { data } from '../data/data.js';
import { html } from '../lib.js';

const temp = (data) => html`
  <h3 class="heading">Our Cars</h3>
  
  ${data.length === 0 ? html `
      <h3 class="nothing">Nothing to see yet</h3>
    ` : html `
      <section id="dashboard">
        ${data.map(car => carTemp(car))}
      </section> 
    `}
`

const carTemp = (car) => html`
  <div class="car">
    <img src="..${car.imageUrl}" alt="example1" />
    <h3 class="model">${car.model}</h3>
    <div class="specs">
      <p class="price">Price: €${car.price}</p>
      <p class="weight">Weight: ${car.weight} kg</p>
      <p class="top-speed">Top Speed: ${car.speed} kph</p>
    </div>
    <a class="details-btn" href="/details/${car._id}">More Info</a>
  </div>
`

export async function showDashboardView(ctx) {
  const cars = await data.getAll();
  ctx.render(temp(cars));
}