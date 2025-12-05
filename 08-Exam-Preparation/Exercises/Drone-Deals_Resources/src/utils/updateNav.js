import { html, render } from "../lib.js";
import { getUserData } from "./utils.js";

const root = document.querySelector('header');

const temp = (hasUser) => html`
  <a id="logo" href="/"><img id="logo" src="./images/logo2.png" alt="img" /></a>
  <nav>
    <div>
      <a href="/dashboard">Marketplace</a>
    </div>
    ${hasUser ? html`
      <div class="user">
        <a href="/sell">Sell</a>
        <a href="/logout">Logout</a>
      </div>` : html`
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`}    
  </nav>
`

export function updateNav() {
  const userData = getUserData();
  render(temp(!!userData), root);
}