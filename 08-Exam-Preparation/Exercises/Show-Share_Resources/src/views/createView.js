import { data } from '../data/data.js';
import { html, page } from '../lib.js';

const temp = () => html`
  <section id="create">
    <div class="form">
      <h2>Add Show</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="title" id="title" placeholder="TV Show title" />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
        <input type="text" name="genre" id="genre" placeholder="Genre" />
        <input type="text" name="country" id="country" placeholder="Country" />
        <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"></textarea>
        <button type="submit">Add Show</button>
      </form>
    </div>
  </section>
`

export function showCreateView(ctx) {
  ctx.render(temp());
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const {title, ['image-url']:imageUrl, genre, country, details} = Object.fromEntries(formData);

  if (!title || !imageUrl || !genre || !country || !details) {
    return window.alert('All fields are required');
  }

  await data.add({ title, imageUrl, genre, country, details });
  page.redirect('/dashboard');
}