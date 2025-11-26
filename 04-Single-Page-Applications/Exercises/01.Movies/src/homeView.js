
const sections = document.querySelectorAll('section');
const homeSection = document.getElementById('home-page');

export function showHome() {
  sections.forEach(section => section.style.display = 'none');
  homeSection.style.display = 'block';
}