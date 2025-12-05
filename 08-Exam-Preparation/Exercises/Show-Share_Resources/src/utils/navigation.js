import { html, render } from "../lib.js";
import { getUserData } from "./utils.js";

const root = document.querySelector('nav');

const temp = (isLoggedIn) => html`
  <div>
    <a href="/dashboard">TV Shows</a>
    <a href="/search">Search</a>
  </div>

  ${isLoggedIn ? html `
      <div class="user">
        <a href="/create">Add Show</a>
        <a href="/logout">Logout</a>
      </div>
    ` : html `
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    `
  }  
`

export async function updateNav(ctx) {
  const userData = await getUserData();
  const isLoggedIn = !!userData;
  render(temp(isLoggedIn), root);
}