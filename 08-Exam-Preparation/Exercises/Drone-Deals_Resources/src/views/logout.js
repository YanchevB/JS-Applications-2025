import { user } from "../data/user.js";
import { page } from "../lib.js";
import { updateNav } from "../utils/updateNav.js";

export async function logout(ctx) {
  await user.logout();
  updateNav();
  page.redirect('/')
}