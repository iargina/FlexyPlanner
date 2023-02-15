import moment from 'moment';
import { order } from './utils';
import { orderCrmData, orderCrmDataForm } from './services/crm-order-data';
import { stringifyOrder } from './services/query-methods';
import axios from 'axios';
import { Notify } from 'notiflix';
import { preloader } from './preLoaderClass';

const finalSumBtn = document.querySelector('.finalSum__btn');
const finalSum = document.querySelector('.finalSum__wrapper');
const finalWrapper = document.querySelector('.final__wrapper ');

finalSumBtn.disabled = true;

let reference = moment().format('YYYY-MM-DD hh:mm:ss.SS');
let amount = 0;
let sumAmount = 0;

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 240 && window.innerWidth >= 1440) {
    finalWrapper.classList.add('final__wrapper-scroll');
  } else if (window.pageYOffset < 240 && window.innerWidth >= 1440) {
    finalWrapper.classList.remove('final__wrapper-scroll');
  }
});

finalSumBtn.addEventListener('click', onFinalSumBtnClick);

export function makeMarkup() {
  finalSum.innerHTML = createFinalOrderMarkup();
}

function calculateSumAmount() {
  const productArray = order.orderedPlanners;
  sumAmount = productArray.reduce(
    (accumulator, el) => accumulator + el.amount,
    amount
  );
  return sumAmount;
}

function createFinalOrderMarkup() {
  calculateSumAmount();
  const wordAmount = correctProductWord(sumAmount, [
    'товар',
    'товари',
    'товарів',
  ]);
  order.setDiscount();
  return `
    <ul class="finalSum__list">
      <li class="finalSum__item">
        <p class="finalSum__descr">${sumAmount} ${wordAmount} на суму</p>
        <p class="finalSum__amount">${order.total} грн</p>
      </li>
      <li class="finalSum__item">
        <p class="finalSum__descr">Вартість доставки</p>
        <p class="finalSum__amount finalSum__amount--font">
          за тарифами перевізника
        </p>
      </li>
      <li class="finalSum__item">
        <p class="finalSum__descr">Знижка за промокодом</p>
        <p class="finalSum__amount">${order.discountValueSum} грн</p>
      </li>
    </ul>
    <div class="finalSum__total">
      <p class="finalSum__totalDescr">До сплати</p>
      <p class="finalSum__totalAmount">${order.total - order.discountValueSum
    } грн</p>
    </div>
    `;
}
let queryData;

const crmPostOrder = async orderData => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://flexyplanner.onrender.com/crm/order',
      data: orderData,
    });
    const id = await response.data.id;
    return id;
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
};
const monoBasket = () => {
  const basket = order.orderedPlanners.map(planer => {
    return {
      name: planer.color,
      qty: planer.amount,
      sum: planer.amount * planer.price * 100,
      // sum: 20,
      code: planer.code,
    };
  });
  return basket;
};
// POST запит;
function postToAdd() {
  const total = Number(order.total - order.discountValueSum) * 100;
  const basketMono = monoBasket();
  return {
    amount: total,
    ccy: 980,
    merchantPaymInfo: {
      reference: `${reference}`,
      destination: 'Flexy Planner',
      basketOrder: basketMono,
    },

    redirectUrl: 'https://flexyplanner.com',
    // redirectUrl: 'http://localhost:1234/',
    // redirectUrl: 'https://iargina.github.io/FlexyPlanner/?' + queryData,
    webHookUrl: 'https://flexyplanner.onrender.com/mono/acquiring/webhook',
    validity: 3600,
  };
}

const monoPost = async (paymentData, id) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://flexyplanner.onrender.com/mono/' + id,
      data: paymentData,
    });

    const page = response.data.pageUrl;
    window.location.href = `${page}`;
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
};

async function onFinalSumBtnClick(e) {
  // orderCrmDataForm();
  e.currentTarget.disabled = true;
  preloader.start();
  try {
    console.log("Data was send");
    // const orderId = await crmPostOrder(orderCrmData);
    // if (!orderId) {
    //   throw new Error('no orderId');
    // }
    // queryData = stringifyOrder(orderCrmData);
    // const paymentData = postToAdd();
    // await monoPost(paymentData, orderId);
  } catch (error) {
    console.log(error.message);
  } finally {
    preloader.finish();
  }
}

// Правильна форма слова "продукт"
function correctProductWord(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
