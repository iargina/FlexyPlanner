import axios from 'axios';

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

  const { data } = await axios.get('https://flexyplanner.onrender.com/markup');

  showSettedPrice(data);
};

const toggleButtonsClass = async (curr, next) => {
  await axios.patch('https://flexyplanner.onrender.com/markup');
  setActiveBtn(curr);

  next.classList.remove('btn-success');
  next.classList.add('btn-danger');
  next.innerText = 'Активувати';
  next.disabled = false;
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

const handleToOrderSubmit = async e => {
  e.preventDefault();

  const obj = {
    type: 'to-order',
    data: {
      price: e.target.elements.price.value,
    },
  };

  //тут має бути відправка запиту на бекенд для додавання даних модуля
  // fetchGallery(obj);
  try {
    const { data } = await axios.put(
      'https://flexyplanner.onrender.com/markup',
      obj
    );
    showSettedPrice(data);
  } catch (error) {
    console.log(error);
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
    const { data } = await axios.put(
      'https://flexyplanner.onrender.com/markup',
      obj
    );
    showSettedPrice(data);
  } catch (error) {
    console.log(error);
  }
};

async function getActiveOrderModule() {
  try {
    const { data } = await axios.get(
      'https://flexyplanner.onrender.com/markup'
    ); //TODO: тут приходять дані по активному модулю
    // console.log(data);

    if (data.type === 'pre-order') {
      setActiveBtn(preOrderBtn);
    } else {
      setActiveBtn(toOrderBtn);
    }
  } catch (error) {
    console.log('something went wrong');
  }
}

orderAdmin.addEventListener('click', activateOrderModule);
formToOrder.addEventListener('submit', handleToOrderSubmit);
formPreOrder.addEventListener('submit', handlePreOrderSubmit);
getActiveOrderModule();
