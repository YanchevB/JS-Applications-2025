import { html, render } from '../lib.js';
import { getUserData } from './utils.js';

const root = document.querySelector('nav');

const temp = (userData) => html`
  <div>
    <a href="/dashboard">Our Cars</a>
    <a href="/search">Search</a>
  </div>

  ${userData ? html `
      <div class="user">
        <a href="/create">Add Your Car</a>
        <a href="/logout">Logout</a>
      </div>
    ` : html `
       <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    `}
`

export function updateNav() {
  const userData = getUserData();
  render(temp(userData), root);
}