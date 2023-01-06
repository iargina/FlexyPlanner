import axios from 'axios';
import toggleModal from './toggleModal';
// const obj = {
//   markup: 'something',
//   type: 'pre-order',
//   data: {
//     price: 1500,
//     preOrderPrice: 999,
//   },
//   isActive: true,
// };

// const instance = axios.create({
//   baseURL: 'строка подключения к базе данных', // дописати адресу
//   params: {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(obj),
//   },
// });

// const start = async e => {
//   try {
//     const { data } = await instance.patch('');
//   } catch (error) {}
// };

// start();

// Test object from backend
const orderModule = {
  type: 'pre-order',
  data: {
    price: 1499,
    preOrder: 995,
  },
};

loadModule(orderModule);

async function loadModule({ type, data }) {
  try {
    let template;
  if (type === 'pre-order') {
    const { default: getImportFile } = await import(
      `../templates/pre-order.hbs`
    );
    template = getImportFile(data);
  }
  if (type === 'to-order') {
    const { default: getImportFile } = await import(
      `../templates/to-order.hbs`
    );
    template = getImportFile(data);
  }
  getOrderSection(template);
  } catch (error) {
    console.log(error)
  } finally {
    toggleModal('.pre-order__btn--feedback', '.modalFeedBack__icon', '.modalFeedBack');
  }
}

function getOrderSection(template) {
  const orderSection = document.querySelector('#order');
  orderSection.innerHTML = template;
}
