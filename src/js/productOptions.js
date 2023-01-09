import { order } from "./utils";
// import { makeMarkup } from "./finalSum";

const listEl = document.querySelector('.orderProcessing__list');
const listItemsArr = document.querySelectorAll('.orderProcessing__item');
const amountElArr = document.querySelectorAll('.orderProcessing__number');
const titlesArr = document.querySelectorAll('.orderProcessing__itemTitle');
const priceEl = document.querySelector('.orderProcessing__priceCurrent');

listEl.addEventListener('click', onElementClick);

// Usage:
let products = [];

// ============== INITIAL STATE ================
for (let i = 1; i < listItemsArr.length; i += 1) {
  resetAmount(listItemsArr[i]);
}
// =============================================

function onElementClick(e) {

  if (e.target.nodeName === 'svg' || e.target.nodeName === 'use') {
    const btnName = e.target.closest('svg').dataset.action;
    const listItem = e.target.closest('li');

    if (btnName === "minus") {
      operationMaker(listItem, "minus");
    }

    if (btnName === "plus") {
      operationMaker(listItem, "plus");
    }

    if (btnName === "reset") {
      resetAmount(listItem);
    }
  }

  if (e.target.nodeName === 'P' && e.target.className === "orderProcessing__addBtn") {
    const btnName = e.target.dataset.action;
    const listItem = e.target.closest('li');

    if (btnName === "addAmount") {
      addItem(listItem);
    }
  }

}

function operationMaker(listItem, operation) {
  const numberEl = listItem.querySelector('.orderProcessing__number');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');


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
    numberElValue += 1;
  }
  numberEl.textContent = numberElValue;

  let colorCost = numberElValue * priceValue;
  amountCostEl.innerText = `${colorCost} грн`;

  recalcAmount();
}

function resetAmount(listItem) {

  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector('.orderProcessing__inputWrapper');
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
  const inputWrapperEl = listItem.querySelector('.orderProcessing__inputWrapper');
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');
  const amountCostEl = listItem.querySelector('.orderProcessing__cost');

  numberEl.textContent = 1;
  inputWrapperEl.classList.remove('visually-hidden');
  addBtnEl.classList.add('visually-hidden');

  amountCostEl.innerText = `995 грн`;

  recalcAmount();
}

function recalcAmount() {
  products = [];
  titlesArr.forEach((el, idx) => {
    products.push({
      color: el.textContent,
      amount: Number(amountElArr[idx].textContent),
      price: 995,
    });
  })

  order.orderedPlanners = products;
  order.setTotal();
  // makeMarkup();
  // console.log("Order: ", order.getWholeOrderData());
}

