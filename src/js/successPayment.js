const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const urlParams = new URLSearchParams(window.location.search);
const buyer = urlParams.get('buyer');
const products = urlParams.get('products');
/* npm start */

function openSuccessModal() {
  backdropSection.classList.toggle('is-hidden');
  linkContainerRef.addEventListener('click', closeModalByLinkClick);
}
function clearSearchParams() {
  const url = new URL(location.href);
  const urlWithoutSearch = url.href.split('?')[0];
  history.pushState(null, '', urlWithoutSearch);
}
function closeModal() {
  backdropSection.classList.toggle('is-hidden');
  clearSearchParams();
  linkContainerRef.removeEventListener('click', closeModalByLinkClick);
}
function closeModalByLinkClick(e) {
  if (e.target.nodeName !== 'A') return;
  closeModal();
}
closeModalBtn.addEventListener('click', () => {
  closeModal();
});
backdropSection.addEventListener('click', e => {
  if (e.target === backdropSection) {
    closeModal();
  }
});

function successPayment() {
  if (buyer && products) {
    openSuccessModal();
  }
  return;
}

successPayment();
