import { order } from './utils';
import { makeMarkup } from './finalSum';
import sprite from '../icons/sprite.svg';
import planner from '../images/hero/mob_1x_planner_yellow.png';
import { Notify } from 'notiflix';

const listEl = document.querySelector('.orderProcessing__list');
const priceEl = document.querySelector('.orderProcessing__priceCurrent');
const priceCancelEl = document.querySelector('.orderProcessing__priceCancelled');

listEl.addEventListener('click', onElementClick);

let titlesArr = [];

// Usage:
let products = [];

// ============== INITIAL STATE ================
// for (let i = 1; i < listItemsArr.length; i += 1) {
//   resetAmount(listItemsArr[i]);
// }
// =============================================


// ======= RESPONSE EXAMPLE FROM CRM ====================
const res = {
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "sku": "FPYELLOW",
      "barcode": null,
      "price": 1499,
      "purchased_price": 700,
      "quantity": 3,
      "weight": 200,
      "length": 25,
      "height": 2,
      "width": 17,
      "properties": [
        {
          "name": "Колір",
          "value": "Жовтий"
        }
      ],
      "is_default": false,
      "is_archived": false,
      "created_at": "2023-01-09T22:00:33.000000Z",
      "updated_at": "2023-01-09T22:00:50.000000Z"
    },
    {
      "id": 2,
      "product_id": 1,
      "sku": "FPBLACK",
      "barcode": null,
      "price": 1499,
      "purchased_price": 700,
      "quantity": 2,
      "weight": 200,
      "length": 25,
      "height": 2,
      "width": 17,
      "properties": [
        {
          "name": "колір",
          "value": "Чорний"
        }
      ],
      "is_default": false,
      "is_archived": false,
      "created_at": "2023-01-09T22:00:33.000000Z",
      "updated_at": "2023-01-09T22:00:50.000000Z"
    }
  ],
  "first_page_url": "https://openapi.keycrm.app/v1/offers?limit=15&sort=id&filter%5Bid%5D=1%2C2&page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://openapi.keycrm.app/v1/offers?limit=15&sort=id&filter%5Bid%5D=1%2C2&page=1",
  "next_page_url": null,
  "path": "https://openapi.keycrm.app/v1/offers",
  "per_page": 15,
  "prev_page_url": null,
  "to": 2,
  "total": 2
}

// ========================================================

// =================== EXPERIMENTS WITH PRICE =============

const orderModule = {
  type: 'pre-order',
  data: {
    price: 1499,
    preOrderPrice: 995,
  },
  isActive: false,
};

// const orderModule = {
//   type: 'to-order',
//   data: {
//     price: 1499
//   },
//   isActive: true,
// };

// -------------------------------------------------------

function priceAssign(orderModule) {
  order.price = orderModule.data;
  // console.log("I've set price");
}
function priceGetter() {
  // console.log(order.price);
  return order.price;
}

setTimeout(priceGetter, 1500);
setTimeout(() => priceAssign(orderModule), 2000);
setTimeout(priceGetter, 2500);

// =======================================================

// ========== Section price view =========================
priceAssign(orderModule);
let priceObj = order.price;
if (Object.keys(priceObj).length === 1) {
  priceEl.innerHTML = `${priceObj.price} грн`;
} else {
  priceEl.innerHTML = `${priceObj.preOrderPrice} грн`;
  priceCancelEl.innerHTML = `${priceObj.price} грн`;
}
// ======================================================
























// ==== PLANNERS REQUEST ON CRM / EMULATION ===========

const plannersArr = res.data;
let planerCost = priceObj.preOrderPrice ? priceObj.preOrderPrice : priceObj.price;
// console.log(plannersArr);
const markup = plannersArr.map(({ id, properties, sku, quantity }) => {
  // console.log(properties[0].value);
  return `<li class="orderProcessing__item" data-idx="#2378560">
            <div class="orderProcessing__itemWrapper">
              <picture>
                <source srcset="
                    ./images/hero/mob_1x_planner_yellow.png 1x,
                    ./images/hero/mob_2x_planner_yellow.png 2x
                  " media="(max-width: 375px)" />
                <source srcset="
                    ./images/hero/desk_1x_planner_yellow.jpg 1x,
                    ./images/hero/desk_2x_planner_yellow.jpg 2x
                  " media="(min-width: 1440px)" />
                <img src="${planner}" alt="Flexxy Planner Folder"
                  class="orderProcessing__ItemImg" />
              </picture>
              <div class="orderProcessing__textWrapper">
                <div class="orderProcessing__itemDescr">
                  <div class="orderProcessing__titleWrapper">
                    <h4 class="orderProcessing__itemTitle">
                      ${properties[0].value} Flexy Planner
                    </h4>
                    <p class="orderProcessing__itemParagraph">#${sku}</p>
                  </div>

                  <div class="orderProcessing__inputWrapper">
                    <svg class="orderProcessing__minus" data-action="minus">
                      <use href="${sprite}#minus_order"></use>
                    </svg>
                    <span class="orderProcessing__number">1</span>
                    <svg class="orderProcessing__plus" data-action="plus" data-quantity="${quantity}">
                      <use href="${sprite}#plus_order"></use>
                    </svg>
                  </div>

                  <p class="orderProcessing__addBtn visually-hidden" data-action="addAmount">
                    Додати
                  </p>
                </div>
                <p class="orderProcessing__cost">${planerCost} грн</p>
                <svg class="orderProcessing__close" data-action="reset">
                  <use href="${sprite}#reset_order"></use>
                </svg >
              </div >
            </div >
          </li > `
}).join('');
listEl.innerHTML = markup;

titlesArr = document.querySelectorAll('.orderProcessing__itemTitle');
// console.log(titlesArr);

// =====================================================

























function onElementClick(e) {
  if (e.target.nodeName === 'svg' || e.target.nodeName === 'use') {
    const btnName = e.target.closest('svg').dataset.action;
    const listItem = e.target.closest('li');

    if (btnName === 'minus') {
      operationMaker(listItem, 'minus');
    }

    if (btnName === 'plus') {
      operationMaker(listItem, 'plus');
    }

    if (btnName === 'reset') {
      resetAmount(listItem);
    }
  }

  if (
    e.target.nodeName === 'P' &&
    e.target.className === 'orderProcessing__addBtn'
  ) {
    const btnName = e.target.dataset.action;
    const listItem = e.target.closest('li');

    if (btnName === 'addAmount') {
      addItem(listItem);
    }
  }
}

function operationMaker(listItem, operation) {
  const numberEl = listItem.querySelector('.orderProcessing__number');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');
  const quantity = Number(listItem.querySelector('.orderProcessing__plus').dataset.quantity);
  // console.log("Closest SVG with quantity: ", quantity);

  let numberElValue = Number(numberEl.textContent);
  let priceValue = Number(priceEl.innerText.slice(0, -4));

  if (operation === 'minus') {
    if (numberElValue === 1) {
      numberEl.textContent = 0;
      resetAmount(listItem);
      return;
    }
    numberElValue -= 1;
  }
  if (operation === 'plus') {
    // Здійснити перевірку на доступну кількість по quantity
    if (numberElValue === quantity) {
      Notify.info(`Ой, а планерів то більше нема...`);
      return;
    }
    numberElValue += 1;
  }
  numberEl.textContent = numberElValue;

  planerCost = numberElValue * priceValue;
  amountCostEl.innerText = `${planerCost} грн`;

  recalcAmount();
}

function resetAmount(listItem) {
  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector(
    '.orderProcessing__inputWrapper'
  );
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');

  numberEl.textContent = 0;
  inputWrapperEl.classList.add('visually-hidden');
  addBtnEl.classList.remove('visually-hidden');

  amountCostEl.innerText = `0 грн`;

  recalcAmount();
}

function addItem(listItem) {
  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector(
    '.orderProcessing__inputWrapper'
  );
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');

  numberEl.textContent = 1;
  inputWrapperEl.classList.remove('visually-hidden');
  addBtnEl.classList.add('visually-hidden');

  amountCostEl.innerText = `995 грн`;

  recalcAmount();
}

const listItemsArr = document.querySelectorAll('.orderProcessing__item');

function recalcAmount() {

  products = [];
  listItemsArr.forEach(el => {
    const plTitle = el.querySelector('.orderProcessing__itemTitle').innerText;
    const plAmount = el.querySelector('.orderProcessing__number').innerText;
    if (Number(plAmount) !== 0) {
      products.push({
        color: plTitle,
        amount: plAmount,
        // price: 995,
      });
    }

  });

  order.orderedPlanners = products;
  order.setTotal();
  makeMarkup();
  console.log("Order: ", order.getWholeOrderData());
}


