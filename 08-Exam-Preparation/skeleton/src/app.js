import { page } from "./lib.js";
import { addRender } from "./utils/render.js";

page(addRender);

//TO-DO: Add the rest of the views
page('/', showHomeView);

page.start();