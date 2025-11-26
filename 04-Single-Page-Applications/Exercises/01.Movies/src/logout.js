import { showHome } from "./homeView.js";
import { userService } from "./userService.js";
import { userUtils } from "./userUtils.js";


export async function logout() {
  await userService.logout();
  userUtils.clearUserData();
  showHome();
}