import { data } from "../data/data.js";
import { page } from '../lib.js'

export async function onDelete(ctx) {
  const id = ctx.params.id;
  const userConfirm = confirm('Do you really want to delete this show?');
  userConfirm && await data.del(id);
  page.redirect('/dashboard');
}