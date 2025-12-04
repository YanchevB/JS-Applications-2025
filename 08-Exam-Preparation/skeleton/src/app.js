import { page } from "./lib.js";
import { addRender } from "./utils/render.js";

page(addRender);

page('/', showHomeView);

page.start();