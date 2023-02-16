const closeButton = document.querySelector('.modalFeedBackSuccess__icon');
const backdrop = document.querySelector('.modalFeedBackSuccess');

closeButton.addEventListener('click', () => {
  backdrop.classList.add('modal-is-hidden');
});

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    backdrop.classList.add('modal-is-hidden');
  }
});
