
const sections = document.querySelectorAll('section');
const loginSection = document.getElementById('form-login');

export function showLoginView() {
  sections.forEach(section => section.style.display = 'none');
  loginSection.style.display = 'block';
}