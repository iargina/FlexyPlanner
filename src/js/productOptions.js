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
const priceCancelEl = document.querySelector(
  '.orderProcessing__priceCancelled'
);

listEl.addEventListener('click', onElementClick);

let products = [];


// ========== OrderModule Checking ============================
const fetchOrderModule = async () => {
  let middleDataObj = {};

  try {
    const response = await fetch('https://flexyplanner.onrender.com/markup');
    const dataObj = await response.json();
    middleDataObj = dataObj;
  } catch (error) {
    console.log(error.message);
  } finally {
    // Прибераю спінер
    document.querySelector('.preloader').classList.add('loader-is-hidden');
    // Рендерю список планерів
    listMarkupRender(middleDataObj);
  }
};

fetchOrderModule();

// =====================================================



// ========== Fetching Planners Data ===================

const fetchPlannersData = async (dataObj) => {
  try {
    const response = await axios.get(
      'https://flexyplanner.onrender.com/crm/offers'
    );
    const productArr = response.data.data;
    // console.log(productArr);

    const filteredPreOrderPrice = productArr.filter(el => el.sku.startsWith('PO'));
    // console.log('filteredPreOrderPrice', filteredPreOrderPrice)
    // В наступний список включати той планер із нульовою ціною? Бо поки я його просто проігнорував
    const filteredOrderPrice = productArr.filter(el => el.sku.startsWith('FP') && el.price !== 0);
    // console.log('filteredOrderPrice', filteredOrderPrice);

    function priceSumCounter(filteredArray) {
      let counterOrder = 0;
      const priceSum = filteredArray.reduce((acc, val) => {
        counterOrder += 1;
        return acc + val.price
      },
        0
      );
      return {
        priceSum, counterOrder
      };
    }

    const pricePreOrderSum = priceSumCounter(filteredPreOrderPrice).priceSum;
    const priceOrderSum = priceSumCounter(filteredOrderPrice).priceSum;
    const counterPreOrder = priceSumCounter(filteredPreOrderPrice).counterOrder;
    const counterOrder = priceSumCounter(filteredOrderPrice).counterOrder;


    if (pricePreOrderSum / counterPreOrder === filteredPreOrderPrice[0].price) {
      // console.log("З ціною все ок, вона", filteredPreOrderPrice[0].price);
      // Формую об'єкт із ціною:
      priceSetter();
    } else {
      // console.log("З ціною щось не те");
      // Вивести на сторінку щось
    }

    if (priceOrderSum / counterOrder === filteredOrderPrice[0].price) {
      // console.log("З ціною все ок, вона", filteredOrderPrice[0].price);
      // Формую об'єкт із ціною:
      priceSetter();

    } else {
      // console.log("З ціною щось не те");
      // Вивести на сторінку щось
    }



    function priceSetter() {
      // console.log(dataObj);
      if (dataObj.type === 'pre-order') {
        console.log("Active module: Pre-Order!");
        // Формую об'єкт із ціною:
        order.price = { orderPrice: filteredOrderPrice[0].price, preOrderPrice: filteredPreOrderPrice[0].price }
      }

      if (dataObj.type === 'to-order') {
        console.log("Active module: Order!");
        // Формую об'єкт із ціною:
        order.price = { orderPrice: filteredOrderPrice[0].price }
        // А може так?:
        // order.price = { orderPrice: filteredOrderPrice[0].price, preOrderPrice: null }
      }
    }

    return productArr;
  } catch (error) {
    console.log(error.message);
  } finally {

    // Виводжу ціну наверху в секції
    priceMarkupRender();


  }
};

// ======= RESPONSE EXAMPLE FROM CRM ====================
const res = response_2;
// ========================================================





async function listMarkupRender(dataObj) {
  // USING FAKE JSON DATA
  /*   const plannersArr = res.data; */

  // USING REAL REQUEST
  const data = await fetchPlannersData(dataObj);
  const plannersArr = data;
  // console.log(plannersArr);
  let filteredPlannersArr = [];

  if (dataObj.type === 'to-order') {
    filteredPlannersArr = plannersArr.filter(
      // el => el.sku.startsWith('FP') && el.quantity > 0
      el => el.sku.startsWith('FP') && el.price > 0
    );
  }
  if (dataObj.type === 'pre-order') {
    filteredPlannersArr = plannersArr.filter(el => el.sku.startsWith('PO'));
  }

  let plannerPrice = priceGetter();

  const markup = filteredPlannersArr
    .map(({ id, product, sku, quantity }) => {
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
          </li > `;
    })
    .join('');

  listEl.innerHTML = markup;
  recalcAmount();

  // Застосовую початковий стан до планерів:
  console.log(dataObj);
  initialState(dataObj);
}
// ========================================================================




// ========================================================================
// ========================================================================
// ========== Section price view =========================================
function priceMarkupRender() {
  // Витягую ціну та ціну для попереднього замовлення,
  // якщо така є для верхньої секції
  let priceObj = order.price;
  if (Object.keys(priceObj).length === 1) {
    priceEl.innerHTML = `${priceObj.orderPrice} грн`;
  } else {
    priceEl.innerHTML = `${priceObj.preOrderPrice} грн`;
    priceCancelEl.innerHTML = `${priceObj.orderPrice} грн`;
  }
}

async function initialState() {
  try {
    const listItemsArr = document.querySelectorAll('.orderProcessing__item');
    console.log('listItemsArr', listItemsArr)
    for (let i = 1; i < listItemsArr.length; i += 1) {
      resetAmount(listItemsArr[i]);
    }
  } catch (error) {
    console.log(message.error);
  }

}

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
  const quantity = Number(
    listItem.querySelector('.orderProcessing__plus').dataset.quantity
  );

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

  let planerCost = numberElValue * priceValue;
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

function priceGetter() {
  let price = 0;
  if (Object.keys(order.price).length > 1) {
    price = order.price.preOrderPrice;
  } else {
    price = order.price.orderPrice;
  }
  return price;
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