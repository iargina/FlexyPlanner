import axios from 'axios';
import {
  getMarkup,
  toggleActiveOrderModule,
  setCurrentPrice,
} from './services/markupAPI';

const orderAdmin = document.querySelector('.order-admin');
const toOrderBtn = document.querySelector('[data-status="to-order"]');
const preOrderBtn = document.querySelector('[data-status="pre-order"]');
const formToOrder = document.querySelector('.form-to-order');
const formPreOrder = document.querySelector('.form-pre-order');

const showSettedPrice = data => {
  if (data.type === 'pre-order') {
    document.querySelector(
      '.preorder-price-info'
    ).innerHTML = `Встановлена ціна: ${data.data.price}, ціна зі знижкою:  ${data.data.preOrderPrice}`;
  } else {
    document.querySelector(
      '.price-info'
    ).innerHTML = `Встановлена ціна: ${data.data.price}`;
  }
};

const setActiveBtn = async elem => {
  elem.classList.remove('btn-danger');
  elem.classList.add('btn-success');
  elem.innerText = 'Активовано';
  elem.disabled = true;

  try {
    const markupResponse = await getMarkup();
    showSettedPrice(markupResponse);
  } catch (error) {
    Notify.failure(error.message);
  }
};

const toggleButtonsClass = async (curr, next) => {
  try {
    await toggleActiveOrderModule();
    setActiveBtn(curr);

    next.classList.remove('btn-success');
    next.classList.add('btn-danger');
    next.innerText = 'Активувати';
    next.disabled = false;
  } catch (error) {
    Notify.failure(error.message);
  }
};

const activateOrderModule = e => {
  if (!e.target.classList.contains('btn-order-js')) {
    return;
  }
  if (e.target.dataset.status == 'pre-order') {
    toggleButtonsClass(e.target, toOrderBtn);
  } else {
    toggleButtonsClass(e.target, preOrderBtn);
  }
};

const handleToOrderSubmit = async e => {
  e.preventDefault();

  const obj = {
    type: 'to-order',
    data: {
      price: e.target.elements.price.value,
    },
  };

  try {
    const data = await setCurrentPrice(obj);
    showSettedPrice(data);
  } catch (error) {
    Notify.failure(error.message);
  }
};

const handlePreOrderSubmit = async e => {
  e.preventDefault();

  const obj = {
    type: 'pre-order',
    data: {
      price: e.target.elements.price.value,
      preOrderPrice: e.target.elements.preOrderPrice.value,
    },
  };

  try {
    const data = await setCurrentPrice(obj);
    showSettedPrice(data);
  } catch (error) {
    Notify.failure(error.message);
  }
};

async function getActiveOrderModule() {
  try {
    //TODO: тут приходять дані по активному модулю
    const data = await getMarkup();

    if (data.type === 'pre-order') {
      setActiveBtn(preOrderBtn);
    } else {
      setActiveBtn(toOrderBtn);
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

orderAdmin.addEventListener('click', activateOrderModule);
formToOrder.addEventListener('submit', handleToOrderSubmit);
formPreOrder.addEventListener('submit', handlePreOrderSubmit);
getActiveOrderModule();
