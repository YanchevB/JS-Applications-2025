import { render } from "../lib.js";

const root = document.getElementById('main-element');

export function addRender(ctx, next) {
  ctx.render = (templateResult) => render(templateResult, root);

  next();
}