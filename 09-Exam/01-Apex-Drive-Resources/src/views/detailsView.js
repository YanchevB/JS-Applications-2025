import { data } from "../data/data.js";
import { user } from "../data/user.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../utils/utils.js";

const temp = (data, isOwner) => html `
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="..${data.imageUrl}" alt="example1" />
      <p id="details-title">${data.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="price">Price: €${data.price}</p>
          <p class="weight">Weight: ${data.weight} kg</p>
          <p class="top-speed">Top Speed: ${data.speed} kph</p>
          <p id="car-description">
            ${data.about}
          </p>
        </div>
        <!--Edit and Delete are only for creator-->
        
        <div id="action-buttons">
          ${isOwner ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="/delete/${data._id}" id="delete-btn">Delete</a>
            ` : nothing}
        </div>
      </div>
    </div>
  </section>
`

export async function showDetailsView(ctx) {
  const id = ctx.params.id;
  const currentCar = await data.getById(id);
  const userData = await getUserData();
  const isOwner = userData?.id === currentCar._ownerId;
  ctx.render(temp(currentCar, isOwner));
}