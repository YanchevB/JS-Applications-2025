import { page } from "./lib.js";
import { addRender } from "./utils/render.js";
import { showHomeView } from "./views/homeView.js";
import { showDashboardView } from "./views/dashboardView.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";
import { showCreateView } from "./views/createView.js";
import { onLogout } from "./views/logout.js";
import { updateNav } from "./utils/navigation.js";
import { showSearchView } from "./views/searchView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { onDelete } from "./views/deleteView.js";

page(addRender);

//TO-DO: Add the rest of the views
page('/', showHomeView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/logout', onLogout);
page('/search', showSearchView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', onDelete);

page.start();
updateNav();