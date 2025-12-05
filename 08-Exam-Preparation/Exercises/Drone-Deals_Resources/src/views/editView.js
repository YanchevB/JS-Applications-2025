import { data } from "../data/data.js";
import { html, page } from "../lib.js";
import { showNotification } from "../utils/notifications.js";

const temp = (data) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Offer</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input type="text" name="model" id="model" .value=${data.model} placeholder="Drone Model" />
        <input type="text" name="imageUrl" id="imageUrl" .value=${data.imageUrl} placeholder="Image URL" />
        <input type="number" name="price" id="price" .value=${data.price} placeholder="Price" />
        <input type="number" name="weight" id="weight" .value=${data.weight} placeholder="Weight" />
        <input type="number" name="phone" id="phone" .value=${data.phone} placeholder="Phone Number for Contact" />
        <input type="text" name="condition" id="condition" .value=${data.condition} placeholder="Condition" />
        <textarea name="description" id="description" .value=${data.description} placeholder="Description"></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`
let context = null
export async function showEditView(ctx) {
  context = ctx;
  const id = ctx.params.id;
  const drone = await data.getById(id);
  ctx.render(temp(drone))
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = context.params.id

  const { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(formData);

  if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
    return showNotification('All fields are required');
  }

  await data.edit(id, { model, imageUrl, price, weight, phone, condition, description });
  page.redirect(`/details/${id}`);
}