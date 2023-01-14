import { crmPost, options } from './services/crm-order-post';
import { parseOrder } from './services/query-methods';
const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const linkContainerRef = document.querySelector('.js-modal-success');
const urlParams = new URLSearchParams(window.location.search);

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

async function successPayment() {
  const order = await window.onload();

  if (order) {
    options.body = order;
    console.log(options.body);
    console.log(JSON.stringify(options.body));
    //отправка запроса на crm
    /*  try {
      crmPost(options);
    } catch (error) {
      console.log(error);
    } */

    openSuccessModal();
  }
  return;
}

successPayment();
