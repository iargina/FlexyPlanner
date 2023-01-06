// import moment from 'moment';
import { Order } from './utils';
// import toggleModal from './toggleModal';

const finalSumBtn = document.querySelector('.finalSum__btn');
const finalSum = document.querySelector('.finalSum__wrapper');
// let reference = moment().format('YYYY-MM-DD hh:mm:ss.SS b');

let orderP = new Order();

//Тестові константи для кількості, суми і знижки
// /////////////////////////////////////////////
let amount = 0;
const wordAmount = correctProductWord(amount, ['товар', 'товари', 'товарів']);
const sum = amount * 1500;
const discount = getRandomInt(500);
const totalSum = sum - discount;
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// ////////////////////////////////////////////

// finalSumBtn.addEventListener('click', onFinalSumBtnClick);

// Початкова ініцалізація відбувається в моїй секції, тому нижче її не потрібно
// makeMarkup();
export function makeMarkup() {
  finalSum.innerHTML = createFinalOrderMarkup();
}

function createFinalOrderMarkup() {

  // Обчислювальну логіку треба винести звідси =====
  array1 = orderP.orderedPlanners;
  // console.log(array1);
  let sumAmount = array1.reduce(
    (accumulator, el) => accumulator + el.amount, amount
  );

  let sumCost = array1.reduce(
    (accumulator, el) => accumulator + (el.amount * el.price), amount
  );
  // ================================================

  return `
    <ul class="finalSum__list">
      <li class="finalSum__item">
        <p class="finalSum__descr">${sumAmount} ${wordAmount} на суму</p>
        <p class="finalSum__amount">${sumCost} грн</p>
      </li>
      <li class="finalSum__item">
        <p class="finalSum__descr">Вартість доставки</p>
        <p class="finalSum__amount finalSum__amount--font">
          за тарифами перевізника
        </p>
      </li>
      <li class="finalSum__item">
        <p class="finalSum__descr">Знижка за промокодом</p>
        <p class="finalSum__amount">${discount} грн</p>
      </li>
    </ul>
    <div class="finalSum__total">
      <p class="finalSum__totalDescr">До сплати</p>
      <p class="finalSum__totalAmount">${totalSum} грн</p>
    </div>
    `;
}

// POST
// function onFinalSumBtnClick() {
//   fetch('https://api.monobank.ua/api/merchant/invoice/create', options)
//     .then(response => response.json())
//     .then(post => {
//       const page = post.pageUrl;
//       window.location.href = `${page}`;
//     })
//     .catch(error => console.log(error));
// }
// const postToAdd = {
//   amount: 5000,
//   ccy: 980,
//   merchantPaymInfo: {
//     reference: `${reference}`,
//     destination: 'Покупка щастя',
//   },
//   redirectUrl: 'http://localhost:1234/?status=success',
//   validity: 3600,
// };
// const options = {
//   method: 'POST',
//   body: JSON.stringify(postToAdd),
//   headers: {
//     'X-Token': 'ugAI3yR-ILBoA2FEZ_C0fZ1l_sERRYPCaL7enjvjHHE8',
//     'Content-Type': 'application/json; charset=UTF-8',
//   },
// };

// Квері параметр після успішної оплати

// const urlParams = new URLSearchParams(window.location.search);
// const successParam = urlParams.get('status');
// console.log(successParam);
// successPayment();
// function successPayment() {
//   if (successParam === 'success') {
//     // toggleModal('.modal__btn', '.close-btn', '.success');
//   }
//   return;
// }

// Правильна форма слова "продукт"
function correctProductWord(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
