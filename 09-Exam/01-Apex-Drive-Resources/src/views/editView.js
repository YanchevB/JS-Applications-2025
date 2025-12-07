import { data } from '../data/data.js';
import { html, page } from '../lib.js';

const temp = (car) => html`
  <section id="edit">
    <div class="form form-auto">
      <h2>Edit Your Car</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input type="text" name="model" .value=${car.model} id="model" placeholder="Model" />
        <input type="text" name="imageUrl" .value=${car.imageUrl} id="car-image" placeholder="Your Car Image URL" />
        <input type="text" name="price" .value=${car.price} id="price" placeholder="Price in Euro" />
        <input type="number" name="weight" .value=${car.weight} id="weight" placeholder="Weight in Kg" />
        <input type="text" name="speed" .value=${car.speed} id="speed" placeholder="Top Speed in Kmh" />
        <textarea id="about" name="about" .value=${car.about} placeholder="More About The Car" rows="10" cols="50"></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`

let context = null;
export async function showEditView(ctx) {
  const id = ctx.params.id;
  const car = await data.getById(id); 
  context = ctx
  ctx.render(temp(car));
}

async function onSubmit(e) {
  e.preventDefault();

  const id = context.params.id;
  const formData = new FormData(e.target);

  const { model, imageUrl, price, weight, speed, about } = Object.fromEntries(formData);

  if (!model || !imageUrl || !price || !weight || !speed || !about) {
    return window.alert('All fields are required');
  }

  await data.edit(id, { model, imageUrl, price, weight, speed, about });
  page.redirect(`/details/${id}`);
}