import { data } from "../data/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../utils/utils.js";

const temp = (data, hasOwner) => html`
  <section id="details">
    <div id="details-wrapper">
      <div>
        <img id="details-img" src="../${data.imageUrl}" alt="example1" />
        <p id="details-model">${data.model}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-price">Price: €${data.price}</p>
          <p class="details-condition">Condition: ${data.condition}</p>
          <p class="details-weight">Weight: ${data.weight}g</p>
          <p class="drone-description">
            ${data.description}
          </p>
          <p class="phone-number">Phone: ${data.phone}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        <div class="buttons">
          ${hasOwner ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="/delete/${data._id}" id="delete-btn">Delete</a>
            ` : nothing}
        </div>
      </div>
    </div>
  </section>
`

export async function showDetailsView(ctx) {
  const id = ctx.params.id
  const item = await data.getById(id);
  const userData = getUserData();
  const hasOwner = userData?.id === item._ownerId;
  ctx.render(temp(item, hasOwner));
}