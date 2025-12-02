import page from "../node_modules/page/page.mjs";
import { showCreateView } from "./views/createView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showMyFurnitureView } from "./views/myFurnitureView.js";
import { showRegisterView } from "./views/registerView.js";
import { userService } from "./service/userService.js";
import { updateNav } from "./utility/renderNavigation.js";
import { showDetailsView } from "./views/detailsView.js";
import { deleteItem } from "./views/deleteView.js";
import { showEdit } from "./views/editView.js";

page(decorateContext)
page('/', showHomeView);
page('/dashboard', showHomeView);
page('/create', showCreateView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', onLogout);
page('/details/:id', showDetailsView);
page('/delete/:id', deleteItem);
page('/edit/:id', showEdit);
page('/my-furniture', showMyFurnitureView);

page.start();
updateNav();

function decorateContext(ctx, next) {
  ctx.goTo = goTo;
  ctx.updateNav = updateNav;
  next();
}

function goTo(path) {
  page.redirect(path);
}

async function onLogout(ctx) {
  await userService.logout();
  ctx.updateNav();
  ctx.goTo('/dashboard')
}