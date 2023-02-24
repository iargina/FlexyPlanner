import { Notify } from 'notiflix';
import {
  getMarkup,
  toggleActiveOrderModule,
  setCurrentPrice,
} from './services/markupAPI';

const orderAdmin = document.querySelector('.order-admin');
const toOrderBtn = document.querySelector('[data-status="to-order"]');
const preOrderBtn = document.querySelector('[data-status="pre-order"]');
const formPreOrder = document.querySelector('.form-pre-order');

const setActiveBtn = async elem => {
  elem.classList.remove('btn-danger');
  elem.classList.add('btn-success');
  elem.innerText = 'Активовано';
  elem.disabled = true;
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

const handlePreOrderSubmit = async e => {
  //Встановлення декоративної ціни для модуля pre-order.
  e.preventDefault();

  const obj = {
    type: 'pre-order',
    data: {
      price: e.target.elements.price.value,
    },
  };

  try {
    await setCurrentPrice(obj);
    Notify.success(
      'Декоративна ціна для модуля попереднього замовлення встановлена'
    );
  } catch (error) {
    Notify.failure(
      'Не вдалось встановити декоративну ціну для модуля попереднього замовлення. Спробуйте пізніше'
    );
  } finally {
    formPreOrder.reset();
  }
};

async function getActiveOrderModule() {
  try {
    // При вході в адмінку визначається активний модуль та визначається активна кнопка
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
formPreOrder.addEventListener('submit', handlePreOrderSubmit);
getActiveOrderModule();
