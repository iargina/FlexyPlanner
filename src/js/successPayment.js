import { crmPost, options } from './services/crm-order-post';
import { parseOrder } from './services/query-methods';
const closeModalBtn = document.querySelector('.close-btn');
const backdropSection = document.querySelector('.success');
const urlParams = new URLSearchParams(window.location.search);

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
    const order = parseOrder(search);
    return order;
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
