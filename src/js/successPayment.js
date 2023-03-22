import { parseOrder } from './services/query-methods';
import { order } from './utils';
import { togglePromocodeStatus } from './services/promoAPI';

const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const urlParams = new URLSearchParams(window.location.search);
const buyer = urlParams.get('buyer');
const products = urlParams.get('products');

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

async function checkAndTogglePromocode() {
  try {
    if (order.promocodeType === 'Personal') {
      await togglePromocodeStatus({
        promocode: order.promocode,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

function successPayment() {
  if (buyer && products) {
    openSuccessModal();
    checkAndTogglePromocode();
  }
  return;
}

successPayment();
