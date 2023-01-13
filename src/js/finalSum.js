import moment from 'moment';
import { order } from './utils';
import { orderCrmData, orderCrmDataForm } from './services/crm-order-data';
import { stringifyOrder } from './services/query-methods';

const finalSumBtn = document.querySelector('.finalSum__btn');
const finalSum = document.querySelector('.finalSum__wrapper');
let reference = moment().format('YYYY-MM-DD hh:mm:ss.SS');
console.log(order.sumWithDiscount);
let amount = 0;
let sumAmount = 0;

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
      <p class="finalSum__totalAmount">${
        order.total - order.discountValueSum
      } грн</p>
    </div>
    `;
}

// POST запит;
function postToAdd() {
  const total = Number(order.total - order.discountValueSum) * 100;
  return {
    amount: total,
    ccy: 980,
    merchantPaymInfo: {
      reference: `${reference}`,
      destination: 'Flexy Planner',
    },
    redirectUrl: 'http://localhost:1234/?' + queryData,
    validity: 3600,
  };
}

let queryData;
function onFinalSumBtnClick(e) {
  orderCrmDataForm();
  queryData = stringifyOrder(orderCrmData);
  api();
}

function api() {
  const options = {
    method: 'POST',
    body: JSON.stringify(postToAdd()),
    headers: {
      'X-Token': 'ugAI3yR-ILBoA2FEZ_C0fZ1l_sERRYPCaL7enjvjHHE8',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  fetch('https://api.monobank.ua/api/merchant/invoice/create', options)
    .then(response => response.json())
    .then(post => {
      const page = post.pageUrl;
      window.location.href = `${page}`;
    })
    .catch(error => console.log(error));
}

// Правильна форма слова "продукт"
function correctProductWord(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
