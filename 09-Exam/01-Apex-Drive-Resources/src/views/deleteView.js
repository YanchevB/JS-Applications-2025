import { data } from "../data/data.js";
import { page } from "../lib.js";

export async function onDelete(ctx) {
  const id = ctx.params.id;
  const userConfirm = confirm('Do you want to delete this car?');

  userConfirm && await data.del(id);

  if (userConfirm) {
    page.redirect('/dashboard');
  }
}