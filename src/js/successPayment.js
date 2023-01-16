import { parseOrder } from './services/query-methods';
const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const urlParams = new URLSearchParams(window.location.search);
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
const testSearchByOrder = search => {
  return (
    /(\bsource_id\b)+/.test(search) &&
    /(\bsource_uuid\b)+/.test(search) &&
    /(\bbuyer\b)+/.test(search) &&
    /(\bshipping\b)+/.test(search) &&
    /(\bproducts\b)+/.test(search) &&
    /(\bpayments\b)+/.test(search)
  );
};

window.onload = function () {
  const { search } = location;
  if (search !== '' && testSearchByOrder(search)) {
    let orderBody = parseOrder(search);
    return orderBody;
  }
};

const crmPostOrder = orderData => {
  try {
    axios({
      method: 'post',
      url: 'https://flexyplanner.onrender.com/crm/order',
      data: orderData,
    });
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
  }
};

async function successPayment() {
  const order = await window.onload();

  if (order) {
    crmPostOrder(order);
    openSuccessModal();
  }
  return;
}

successPayment();
