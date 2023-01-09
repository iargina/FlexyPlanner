export default function toggleModal(triggerBtn, closeBtn, backdrop) {
  
  const openModalBtn = document.querySelector(triggerBtn),
    closeModalBtn = document.querySelector(closeBtn),
    backdropSection = document.querySelector(backdrop);

    if (!openModalBtn) {
      return;
    }

  openModalBtn.addEventListener('click', () => {
    backdropSection.classList.toggle('modal-is-hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    backdropSection.classList.toggle('modal-is-hidden');
  });

  backdropSection.addEventListener('click', e => {
    if (e.target === backdropSection) {
      backdropSection.classList.toggle('modal-is-hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      backdropSection.classList.add('modal-is-hidden');
    }
  });
}
