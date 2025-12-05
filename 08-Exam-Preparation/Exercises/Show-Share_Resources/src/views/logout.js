import { user } from "../data/user.js";
import { page } from "../lib.js";
import { updateNav } from "../utils/navigation.js";

export async function onLogout() {
  await user.logout();
  updateNav();
  page.redirect('/');
}