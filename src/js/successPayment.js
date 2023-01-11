const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const urlParams = new URLSearchParams(window.location.search);
const successParam = urlParams.get('status');
const params = urlParams.toString();

function openSuccessModal() {
  backdropSection.classList.toggle('is-hidden');
}
closeModalBtn.addEventListener('click', () => {
  backdropSection.classList.toggle('is-hidden');
});
backdropSection.addEventListener('click', e => {
  if (e.target === backdropSection) {
    backdropSection.classList.toggle('is-hidden');
  }
});

function successPayment() {
  if (successParam === 'success') {
    openSuccessModal();
    console.log(params);
  }
  return;
}

successPayment();
