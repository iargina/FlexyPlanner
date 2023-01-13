import { order } from './utils';
import { makeMarkup } from './finalSum';
import sprite from '../icons/sprite.svg';
// import planner from '../images/hero/mob_1x_planner_yellow.jpg';
import { Notify } from 'notiflix';
// import response_1 from './response_1.json';
import response_2 from './response_2.json';
import axios from 'axios';

const listEl = document.querySelector('.orderProcessing__list');
const priceEl = document.querySelector('.orderProcessing__priceCurrent');
const priceCancelEl = document.querySelector('.orderProcessing__priceCancelled');

listEl.addEventListener('click', onElementClick);

let products = [];

// ============== INITIAL STATE ================
function initialState() {
  const listItemsArr = document.querySelectorAll('.orderProcessing__item');
  for (let i = 1; i < listItemsArr.length; i += 1) {
    resetAmount(listItemsArr[i]);
  }
}



// ========== OrderModule Checking ============================
const fetchOrderModule = async () => {

  let middleDataObj = {};

  try {

    const response = await fetch("https://flexyplanner.onrender.com/markup");
    const dataObj = await response.json();
    // console.log(dataObj);

    // Присвоюю об'єкт ціни в екземпляр класу
    // Можна без перевірки, якщо не треба валідації
    order.price = dataObj.data;
    // if (dataObj.type === 'to-order') {
    //   order.price = { price: dataObj.data.price }
    // }
    // if (dataObj.type === 'pre-order') {

    //   if (dataObj.data.preOrderPrice < dataObj.data.price) {
    //     order.price = dataObj.data;
    //     // return;
    //   }

    //   // if (dataObj.data.preOrderPrice === 0) {
    //   //   order.price = { price: dataObj.data.price }
    //   //   console.log("Нульова ціна");
    //   //   // return;
    //   // }

    //   if (dataObj.data.preOrderPrice > dataObj.data.price) {
    //     order.price = { price: dataObj.data.price }
    //     // return;
    //   }
    // }

    middleDataObj = dataObj;

  } catch (error) {
    console.log(error.message);
  } finally {

    // Прибераю спінер
    document.querySelector('.preloader').classList.add('loader-is-hidden');

    // Виводжу ціну наверху в секції
    priceMarkupRender();

    // Рендерю список планерів
    listMarkupRender(middleDataObj);
    console.log("Order after first fetch: ", order.getWholeOrderData());

    // Застосовую початковий стан до планерів:
    initialState();

  }
};

fetchOrderModule();

// =====================================================


// ========== Fetching Planners Data from CRM ==========

const fetchPlannersData = async () => {
  const response = await axios.get('https://openapi.keycrm.app/v1/offers', {
    headers: {
      Authorization: 'Bearer MjA3NDhmMzYyY2M3YjlkNDlhZTZiZDAyYzcyMWY2YWUxOGIxNTY2OA'
    },
    params: {
      'include': 'product'
    }
  })
  return response;
}

// fetchPlannersData();




// ======= RESPONSE EXAMPLE FROM CRM ====================
const res = response_2;

// ========================================================

// ========== Section price view =========================
function priceMarkupRender() {
  // Витягую ціну та ціну для попереднього замовлення,
  // якщо така є
  let priceObj = order.price;
  if (Object.keys(priceObj).length === 1) {
    priceEl.innerHTML = `${priceObj.price} грн`;
  } else {
    priceEl.innerHTML = `${priceObj.preOrderPrice} грн`;
    priceCancelEl.innerHTML = `${priceObj.price} грн`;
  }
}
// ======================================================

function priceGetter() {
  let price = 0;
  if (Object.keys(order.price).length > 1) {
    price = order.price.preOrderPrice;
  } else {
    price = order.price.price;
  }
  return price;
}

async function listMarkupRender(dataObj) {


  // USING FAKE JSON DATA
  // const plannersArr = res.data;
  // console.log(plannersArr);

  // USING REAL REQUEST
  const data = await fetchPlannersData()
  const plannersArr = data.data;
  let filteredPlannersArr = [];


  if (dataObj.type === 'to-order') {
    filteredPlannersArr = plannersArr.filter(el => el.sku.startsWith('FP') && el.quantity > 0);
  }
  if (dataObj.type === 'pre-order') {
    filteredPlannersArr = plannersArr.filter(el => el.sku.startsWith('PO'));
  }

  let plannerPrice = priceGetter();

  const markup = filteredPlannersArr.map(({ id, product, sku, quantity }) => {

    let lastItemsMarkup = '';
    if (dataObj.type === 'to-order' && quantity < 10) {
      lastItemsMarkup = `<p class="orderProcessing__lastItemsLabel">закінчується</p>`;
    }

    return `<li class="orderProcessing__item" data-idx="#2378560">
            <div class="orderProcessing__itemWrapper">
              <div class="orderProcessing__ItemImgWrapper" >
                <img src="${product.thumbnail_url}" alt="Flexxy Planner Folder" class="orderProcessing__ItemImg" />
              </div>
              <div class="orderProcessing__textWrapper">
                <div class="orderProcessing__itemDescr">
                  <div class="orderProcessing__titleWrapper">
                    <h4 class="orderProcessing__itemTitle">${product.name}</h4>
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
                <div class="orderProcessing__costBlock">
                  <p class="orderProcessing__cost">${plannerPrice} грн</p>
                  ${lastItemsMarkup}
                </div>
                <svg class="orderProcessing__close" data-action="reset">
                  <use href="${sprite}#reset_order"></use>
                </svg >
              </div >
            </div >
          </li > `
  }).join('');

  listEl.innerHTML = markup;
  recalcAmount();
}
// ========================================================================





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

  let plannerPrice = priceGetter();

  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector(
    '.orderProcessing__inputWrapper'
  );
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');

  numberEl.textContent = 1;
  inputWrapperEl.classList.remove('visually-hidden');
  addBtnEl.classList.add('visually-hidden');

  amountCostEl.innerText = `${plannerPrice} грн`;

  recalcAmount();
}

function recalcAmount() {

  const listItemsArr = document.querySelectorAll('.orderProcessing__item');

  products = [];
  listItemsArr.forEach(el => {
    const plTitle = el.querySelector('.orderProcessing__itemTitle').innerText;
    const plAmount = el.querySelector('.orderProcessing__number').innerText;

    if (Number(plAmount) !== 0) {
      products.push({
        color: plTitle,
        amount: Number(plAmount),
        price: priceGetter(),
      });
    }

  });

  order.orderedPlanners = products;
  order.setTotal();
  order.setDiscount();
  makeMarkup();
  console.log("Order: ", order.getWholeOrderData());
}