import { showHome } from "./homeView.js";
import { userService } from "./userService.js";
import { userUtils } from "./userUtils.js";

const sections = document.querySelectorAll('section');
const loginSection = document.getElementById('form-login');
document.getElementById('form-login').addEventListener('submit', onSubmit);

export function showLoginView() {
  sections.forEach(section => section.style.display = 'none');
  loginSection.style.display = 'block';
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const {email, password} = Object.fromEntries(formData);

  if (!email || !password) {
    return alert('Error');
  }

  const userData = await userService.login({email, password});
  userUtils.saveUserData(userData);
  showHome()
}