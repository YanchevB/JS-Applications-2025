import { page } from "./lib.js";
import { addRender } from "./utils/render.js";
import { updateNav } from "./utils/updateNav.js";
import { showDashboardView } from "./views/dashboardView.js";
import { onDelete } from "./views/deleteView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { logout } from "./views/logout.js";
import { showRegisterView } from "./views/registerView.js";
import { showSellView } from "./views/sellView.js";

page(addRender);

page('/', homeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', logout);
page('/dashboard', showDashboardView);
page('/sell', showSellView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', onDelete);

page.start();
updateNav();