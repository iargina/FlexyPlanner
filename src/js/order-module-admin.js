const orderAdmin = document.querySelector('.order-admin');
const toOrderBtn = document.querySelector('[data-status="to-order"]');
const preOrderBtn = document.querySelector('[data-status="pre-order"]');
const formToOrder = document.querySelector('.form-to-order');
const formPreOrder = document.querySelector('.form-pre-order');

const toggleButtonsClass = (curr, next) => {
  curr.classList.remove('btn-danger');
  curr.classList.add('btn-success');
  curr.innerText = 'Активовано';

  next.classList.remove('btn-success');
  next.classList.add('btn-danger');
  next.innerText = 'Активувати';
};

const activateOrderModule = e => {
  if (!e.target.classList.contains('btn-order-js')) {
    return;
  }
  if (e.target.dataset.status == 'pre-order') {
    toggleButtonsClass(e.target, toOrderBtn);
    //тут має бути відправка запиту на бекенд для оновлення активного модуля
  } else {
    toggleButtonsClass(e.target, preOrderBtn);
    //тут має бути відправка запиту на бекенд для оновлення активного модуля
  }
};

const handleToOrderSubmit = e => {
  e.preventDefault();
  let formData = new FormData(formToOrder);
  //тут має бути відправка запиту на бекенд для додавання даних модуля
};

const handlePreOrderSubmit = e => {
  e.preventDefault();
  formPreOrder;
  let formData = new FormData(formPreOrder);
  //тут має бути відправка запиту на бекенд для додавання даних модуля попереднього замовлення
};

orderAdmin.addEventListener('click', activateOrderModule);
formToOrder.addEventListener('submit', handleToOrderSubmit);
formPreOrder.addEventListener('submit', handlePreOrderSubmit);
