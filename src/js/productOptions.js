import { order } from './utils';
import { makeMarkup } from './finalSum';
import sprite from '../icons/sprite.svg';
import { Notify } from 'notiflix';
import axios from 'axios';
import { hideNotification } from './helpers/hideNotification';

const listEl = document.querySelector('.orderProcessing__list');
const firstCostEl = document.querySelector('.orderProcessing__firstCostWrapper');
const amountWordEl = document.querySelector('.orderProcessing__amountTitle');

let products = [];

listEl.addEventListener('click', onElementClick);


// ========== OrderModule Checking ============================
const fetchOrderModule = async () => {
  let middleDataObj = {};

  try {
    const response = await axios.get(
      'https://flexyplanner.onrender.com/markup'
    );
    middleDataObj = response.data;
  } catch (error) {
    console.log(error.message);
  } finally {
    // Рендерю список планерів
    listMarkupRender(middleDataObj);
  }
};

fetchOrderModule();

// =====================================================

// ========== Fetching Planners Data ===================

const fetchPlannersData = async dataObj => {
  try {
    const response = await axios.get(
      'https://flexyplanner.onrender.com/crm/offers'
    );
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  } finally {
    // Прибераю спінер
    document.querySelector('.preloader').classList.add('loader-is-hidden');

  }
};

async function listMarkupRender(dataObj) {
  const data = await fetchPlannersData(dataObj);
  const plannersArr = data;
  let filteredPlannersArr = [];

  if (dataObj.type === 'to-order') {
    filteredPlannersArr = plannersArr.filter(
      el => el.sku.startsWith('FP') && el.quantity > 0
    );
  }
  if (dataObj.type === 'pre-order') {
    filteredPlannersArr = plannersArr.filter(el => el.sku.startsWith('PO') && el.quantity > 0);
  }

  // console.log('order :>> ', order);
  // console.log('filteredPlannersArr :>> ', filteredPlannersArr);

  if (filteredPlannersArr.length > 0) {
    const markup = filteredPlannersArr
      .map(({ product, sku, quantity, price }) => {
        let lastItemsMarkup = '';
        if (dataObj.type === 'to-order' && quantity < 20) {
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
                  <p class="orderProcessing__price">${price.toFixed(2)} грн</p>                  
                  <p class="orderProcessing__cost">${price.toFixed(2)} грн</p>
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
    initialState();
  } else {
    amountWordEl.classList.add('visually-hidden');
    listEl.innerHTML = `
    <h4 class="orderProcessing__noPlannersWarning">На жаль, усі планери закінчились...</h4>
    <h4 class="orderProcessing__noPlannersWarning">Але вже незабаром в наявності буде нова порція!)</h4>
    `;
  }



}
// ========================================================================



// ========================================================================
async function initialState() {
  try {
    const listItemsArr = document.querySelectorAll('.orderProcessing__item');
    console.log('listItemsArr[0] :>> ', listItemsArr[0]);

    for (let i = 1; i < listItemsArr.length; i += 1) {
      resetAmount(listItemsArr[i]);


      // const amountCostEl = listItemsArr[i].querySelector('.orderProcessing__cost');
      // console.log('amountCostEl :>> ', amountCostEl);
      // amountCostEl.classList.add("visually-hidden");
      // amountCostEl.innerText = "";
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
  const priceEl = listItem.querySelector('.orderProcessing__price');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');
  const quantity = Number(
    listItem.querySelector('.orderProcessing__plus').dataset.quantity
  );

  let numberElValue = Number(numberEl.textContent);
  const priceValue = Number(priceEl.innerText.slice(0, -4));

  if (operation === 'minus') {
    if (numberElValue === 1) {
      numberEl.textContent = 0;
      resetAmount(listItem);
      return;
    }
    numberElValue -= 1;
  }
  if (operation === 'plus') {
    if (numberElValue === quantity) {
      Notify.info(`Ой, а планерів то більше нема...`);
      setTimeout(hideNotification, 3000);
      return;
    }
    numberElValue += 1;
  }
  numberEl.textContent = numberElValue;

  let planersCost = numberElValue * priceValue;
  amountCostEl.innerText = `${planersCost.toFixed(2)} грн`;

  recalcAmount();
}

function resetAmount(listItem) {
  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector(
    '.orderProcessing__inputWrapper'
  );
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');
  // const amountCostEl = listItem.querySelector('.orderProcessing__cost');

  numberEl.textContent = 0;
  inputWrapperEl.classList.add('visually-hidden');
  addBtnEl.classList.remove('visually-hidden');


  const amountCostEl = listItem.querySelector('.orderProcessing__cost');
  console.log('amountCostEl reset:>> ', amountCostEl);
  amountCostEl.classList.add("visually-hidden");

  // amountCostEl.innerText = `0.00 грн`;

  recalcAmount();
}

function addItem(listItem) {

  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector(
    '.orderProcessing__inputWrapper'
  );
  const priceEl = listItem.querySelector('.orderProcessing__price');
  const priceValue = Number(priceEl.innerText.slice(0, -4)).toFixed(2);
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');

  numberEl.textContent = 1;
  inputWrapperEl.classList.remove('visually-hidden');
  addBtnEl.classList.add('visually-hidden');

  console.log('amountCostEl addItem:>> ', amountCostEl);
  amountCostEl.classList.remove("visually-hidden");

  amountCostEl.innerText = `${priceValue} грн`;

  recalcAmount();
}

function recalcAmount() {
  const listItemsArr = document.querySelectorAll('.orderProcessing__item');

  products = [];
  listItemsArr.forEach(el => {
    const plTitle = el.querySelector('.orderProcessing__itemTitle').innerText;
    const plAmount = el.querySelector('.orderProcessing__number').innerText;
    const plPrice = el.querySelector('.orderProcessing__price').innerText;
    const plParagraph = el.querySelector('.orderProcessing__itemParagraph').innerText;
    if (Number(plAmount) !== 0) {
      products.push({
        color: plTitle,
        amount: Number(plAmount),
        price: Number(plPrice.slice(0, -4)),
        code: plParagraph,
      });
    }
  });

  order.orderedPlanners = products;
  order.setTotal();
  order.setDiscount();
  makeMarkup();

  // console.log('Order: ', order);
  // console.log('order.getWholeOrderData: ', order.getWholeOrderData());


  firstCostEl.innerHTML = `
  <div class="orderProcessing__firstCostTitle">Попередня вартість:</div>    
  <div class="orderProcessing__firstCostValue">${order.total.toFixed(2)} грн</div>
  `;
}
