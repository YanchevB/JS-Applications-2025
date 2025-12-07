import { html, page } from '../lib.js';
import { user } from '../data/user.js'

const temp = () => html `
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form" @submit=${onSubmit}>
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`

export function showRegisterView(ctx) {
  ctx.render(temp());
}

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const {email, password, ['re-password']:rePass} = Object.fromEntries(formData);

  if (!email || !password) {
    return window.alert('All fields are required');
  }

  if (password !== rePass) {
    return window.alert('Passwords should match');
  }

  try {
    await user.register(email, password);
    page.redirect('/');
  } catch (error) {
    window.alert(error.message)
  }
}