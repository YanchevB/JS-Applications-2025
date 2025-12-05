import { data } from '../data/data.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../utils/utils.js';

const temp = (show, isOwner) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="..${show.imageUrl}" alt="example1" />
      <div id="details-text">
        <p id="details-title">${show.title}</p>
        <div id="info-wrapper">
          <div id="description">
            <p id="details-description">
              ${show.details}
            </p>
          </div>
        </div>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
          ${isOwner ? html `
              <a href="/edit/${show._id}" id="edit-btn">Edit</a>
              <a href="/delete/${show._id}" id="delete-btn">Delete</a>
            ` : nothing}
        </div>
      </div>
    </div>
  </section>
`

export async function showDetailsView(ctx) {
  const id = ctx.params.id;
  const show = await data.getById(id);
  const userData = getUserData();
  const isOwner = userData?.id === show._ownerId;
  ctx.render(temp(show, isOwner));
}