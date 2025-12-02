import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { findHasError } from "./createView.js";

const root = document.querySelector('div.container');

const temp = (data, error) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onEdit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input class="form-control ${findHasError(error, 'make')}" id="new-make" type="text" name="make" .value=${data.make}>
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class="form-control ${findHasError(error, 'model')}" id="new-model" type="text" name="model" .value=${data.model}>
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class="form-control ${findHasError(error, 'year')}" id="new-year" type="number" name="year"/ value=${data.year}>
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input class="form-control ${findHasError(error, 'description')}" id="new-description" type="text" name="description" .value=${data.description}>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input class="form-control ${findHasError(error, 'price')}" id="new-price" type="number" name="price" .value=${data.price}>
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control ${findHasError(error, 'img')}" id="new-image" type="text" name="img" .value=${data.img}>
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class="form-control ${findHasError(error, 'material')}" id="new-material" type="text" name="material" .value=${data.material}>
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
      </div>
    </div>
  </form>`

let context = null;

export async function showEdit(ctx) {
  context = ctx;
  const id = ctx.params.id;
  const data = await dataService.getFurnitureById(id);
  render(temp(data), root)
}

async function onEdit(e) {
  e.preventDefault();
  const id = context.params.id;
  const formData = new FormData(e.target);
  const {make, model, year, description, price, img, material} = Object.fromEntries(formData);
  
  const error = {};
  let hasError = false;

  if (make.length < 4) {
    error.make = true;
    hasError = true;
  }

  if (model.length < 4) {
    error.model = true;
    hasError = true;
  }

  if (Number(year) < 1950 || Number(year) > 2050) {
    error.year = true;
    hasError = true;
  }

  if (description.length < 10) {
    error.description = true;
    hasError = true;
  }

  if (Number(price) < 0 || !price) {
    error.price = true;
    hasError = true;
  }

  if (!img) {
    error.img = true;
    hasError = true;
  }

  if (hasError) {
    return render(temp({ make, model, year, description, price, img, material }, error), root);
  }

  await dataService.updateFurniture({ make, model, year, description, price, img, material }, id);
  context.goTo('/dashboard');
}