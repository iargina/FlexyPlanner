import { parseOrder } from './services/query-methods';
const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

/* const checkInvoice = async invoiceID => {
  const urlToInvoice =
    'https://api.monobank.ua/api/merchant/invoice/status?invoiceId=' +
    invoiceID;

  const getStatus = await axios({
    method: 'get',
    url: urlToInvoice,
    data: {
      headers: {
        'X-Token': 'ugAI3yR-ILBoA2FEZ_C0fZ1l_sERRYPCaL7enjvjHHE8',
      },
    },
  });
  const status = getStatus.status;
  if (status !== 'success') {
    return;
  }
  axios({
    method: 'post',
    url: 'https://flexyplanner.onrender.com/crm/order',
    data: orderData,
  });
}; */

async function successPayment() {
  const order = await window.onload();
  if (order) {
    openSuccessModal();
  }
  return;
}

successPayment();
