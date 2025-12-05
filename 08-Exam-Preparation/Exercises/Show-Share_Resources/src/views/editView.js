import { data } from '../data/data.js';
import { html, page } from '../lib.js';

const temp = (show) => html `
  <section id="edit">
    <div class="form">
      <h2>Edit Show</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input type="text" name="title" id="title" .value=${show.title} placeholder="TV Show title" />
        <input type="text" name="image-url" id="image-url" .value=${show.imageUrl}  placeholder="Image URL" />
        <input type="text" name="genre" id="genre" .value=${show.genre}  placeholder="Genre" />
        <input type="text" name="country" id="country" .value=${show.country}  placeholder="Country" />
        <textarea id="details" name="details" .value=${show.details} placeholder="Details" rows="2" cols="10"></textarea>
        <button type="submit">Edit Show</button>
      </form>
    </div>
  </section>
`
let context = null;
export async function showEditView(ctx) {
  const id = ctx.params.id;
  const show = await data.getById(id); 
  ctx.render(temp(show));
  context = ctx;
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const id = context.params.id;

  const {title, ['image-url']:imageUrl, genre, country, details} = Object.fromEntries(formData);

  if (!title || !imageUrl || !genre || !country || !details) {
    return window.alert('All fields are required');
  }

  await data.edit(id, { title, imageUrl, genre, country, details })
  page.redirect(`/details/${id}`);
}