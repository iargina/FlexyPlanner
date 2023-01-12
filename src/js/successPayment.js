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
    console.log(order);
  }
};

successPayment();
