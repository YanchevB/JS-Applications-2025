import { page } from "./lib.js";
import { addRender } from "./utils/render.js";
import { updateNav } from "./utils/updateNav.js";
import { showCreateView } from "./views/createView.js";
import { showDashboardView } from "./views/dashboardView.js";
import { onDelete } from "./views/deleteView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { onLogout } from "./views/logout.js";
import { showRegisterView } from "./views/registerView.js";
import { showSearchView } from "./views/searchView.js";

page(addRender);

//TO-DO: Add the rest of the views
page('/', showHomeView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', onLogout);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', onDelete);
page('/search', showSearchView);

page.start();
updateNav();