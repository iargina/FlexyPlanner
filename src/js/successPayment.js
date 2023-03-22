import { parseOrder } from './services/query-methods';
import { order } from './utils';
import { deletePromocode } from './services/promoAPI';
const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const urlParams = new URLSearchParams(window.location.search);
const buyer = urlParams.get('buyer');
const products = urlParams.get('products');
/* npm start */

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

async function checkAndDeletePromocode() {
  try {
    console.log(order);
    if (order.promocodeType === 'Personal') {
      await deletePromocode({
        data: {
          promocode: order.promocode,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

function successPayment() {
  if (buyer && products) {
    openSuccessModal();
    checkAndDeletePromocode();
  }
  return;
}

successPayment();
