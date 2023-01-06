 export default function toggleModal (triggerBtn, closeBtn, backdrop) {
  const openModalBtn = document.querySelector(triggerBtn),
    closeModalBtn = document.querySelector(closeBtn),
    backdropSection = document.querySelector(backdrop);

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
};