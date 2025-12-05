import { user } from "../data/user.js";
import { html, page } from "../lib.js";
import { showNotification } from "../utils/notifications.js";
import { updateNav } from "../utils/updateNav.js";

const temp = () => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onSubmit}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`

export function showLoginView(ctx) {
  ctx.render(temp());
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const {email, password} = Object.fromEntries(formData);

  if (!email || !password) {
    return showNotification('Error 400');
  }

  await user.login(email, password);
  updateNav();
  page.redirect('/');
}