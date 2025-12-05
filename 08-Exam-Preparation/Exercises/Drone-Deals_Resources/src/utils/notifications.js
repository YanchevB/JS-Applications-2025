const container = document.querySelector('.notification');
const span = container.querySelector('.msg');

export function showNotification(errMsg) {
  container.style.display = 'block';
  span.textContent = errMsg;

  setTimeout(() => {
    container.style.display = 'none';
  }, 3000);
}