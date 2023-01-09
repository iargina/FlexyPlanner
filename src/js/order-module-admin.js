import axios from 'axios';

const orderAdmin = document.querySelector('.order-admin');
const toOrderBtn = document.querySelector('[data-status="to-order"]');
const preOrderBtn = document.querySelector('[data-status="pre-order"]');
const formToOrder = document.querySelector('.form-to-order');
const formPreOrder = document.querySelector('.form-pre-order');

const setActiveBtn = elem => {
  elem.classList.remove('btn-danger');
  elem.classList.add('btn-success');
  elem.innerText = 'Активовано';
  elem.disabled = true;
};

const toggleButtonsClass = (curr, next) => {
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

// const instance = axios.create({
//   baseURL: 'https://flexyplanner.onrender.com/markup',
//   params: {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     // body: JSON.stringify(obj),
//   },
// });

// export const fetchGallery = async obj => {
//   try {
//     const { data } = await instance.put('', {
//       params: { body: obj },
//     });

//     console.log(data);
//   } catch (error) {
//     return error.message;
//   }
// };

const handleToOrderSubmit = async e => {
  e.preventDefault();

  // console.log(e.target.elements.price.value);

  const obj = {
    type: 'to-order',
    data: {
      price: e.target.elements.price.value,
    },
  };
  //тут має бути відправка запиту на бекенд для додавання даних модуля
  // fetchGallery(obj);

  //тимчасове рішення без хендлу помилки, зробити те саме через інстанс та у handlePreOrderSubmit
  const res = await axios.put('https://flexyplanner.onrender.com/markup', obj);
  console.log(res.data);
};

const handlePreOrderSubmit = e => {
  e.preventDefault();

  const obj = {
    type: 'pre-order',
    data: {
      price: e.target.elements.price.value,
      preOrderPrice: e.target.elements.preOrderPrice.value,
    },
  };

  //тут має бути відправка запиту на бекенд для додавання даних модуля
  console.log(obj);

  // console.log(e.target.elements.price.value);
  // console.log(e.target.elements.preOrderPrice.value);

  // fetch('https://flexyplanner.onrender.com/markup', {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     type: 'pre-order',
  //   }),
  // })
  //   .then(res => res.json())
  //   .then(res => console.log(res));

  //тут має бути відправка запиту на бекенд для додавання даних модуля попереднього замовлення
};

function showActiveModuleForAdmin({ type, data }) {
  if (type === 'pre-order') {
    setActiveBtn(preOrderBtn);
    // document.querySelector(
    //   '.preorder-price-info'
    // ).innerHTML = `Встановлена ціна: ${data.price}, ціна зі знижкою:  ${data.preOrderPrice}`;
  } else {
    setActiveBtn(toOrderBtn);
    // document.querySelector(
    //   '.price-info'
    // ).innerHTML = `Встановлена ціна: ${data.price}`;
  }
}

async function getActiveOrderModule() {
  try {
    const { data } = await axios.get(
      'https://flexyplanner.onrender.com/markup'
    ); //TODO: тут приходять дані по активному модулю
    console.log(data);

    showActiveModuleForAdmin(data);
  } catch (error) {
    console.log('something went wrong');
  }
}

orderAdmin.addEventListener('click', activateOrderModule);
formToOrder.addEventListener('submit', handleToOrderSubmit);
formPreOrder.addEventListener('submit', handlePreOrderSubmit);
getActiveOrderModule();
