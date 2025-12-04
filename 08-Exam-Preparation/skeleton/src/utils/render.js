import { render } from "../lib.js";

//TO-DO: Change root to corresponding root element
const root = document.querySelector('main');

export function addRender(ctx, next) {
  ctx.render = (templateResult) => render(templateResult, root);

  next();
}