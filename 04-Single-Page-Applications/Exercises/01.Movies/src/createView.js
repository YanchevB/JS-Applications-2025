
const sections = document.querySelectorAll('section');
const createSection = document.getElementById('add-movie');

export function showCreateView() {
  sections.forEach(section => section.style.display = 'none');
  createSection.style.display = 'block';
}