import { showHome } from "./homeView.js";
import { userService } from "./userService.js";
import { userUtils } from "./userUtils.js";

const sections = document.querySelectorAll('section');
const registerSection = document.getElementById('form-sign-up');

document.getElementById('register-form').addEventListener('submit', onSubmit);

export function showRegisterView() {
  sections.forEach(section => section.style.display = 'none');
  registerSection.style.display = 'block';
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {email, password, repeatPassword} = Object.fromEntries(formData);
  
  if (!email || !password || password.length < 6 || password !== repeatPassword) {
    return alert('Error');
  }

  const userData = await userService.register({email, password});
  userUtils.saveUserData(userData);
  showHome();
}