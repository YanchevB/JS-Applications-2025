import { html, render, nothing } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { userUtils } from "../utility/userUtils.js";

const root = document.querySelector('div.container');

const temp = (data, hasOwner) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src='../${data.img}' />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${data.make}</span></p>
      <p>Model: <span>${data.model}</span></p>
      <p>Year: <span>${data.year}</span></p>
      <p>Description: <span>${data.description}</span></p>
      <p>Price: <span>${data.price}</span></p>
      <p>Material: <span>${data.material}</span></p>
      <div>
        ${hasOwner ? html `
          <a href='/edit/${data._id}' class="btn btn-info">Edit</a>
          <a href='/delete/${data._id}' class="btn btn-red">Delete</a>` : 
          nothing
        }
      </div>
    </div>
  </div>`

export async function showDetailsView(ctx) {
  const id = ctx.params.id;
  const data = await dataService.getFurnitureById(id);
  const hasOwner = userUtils.getUserId() === data._ownerId;
  render(temp(data, hasOwner), root);
}