const listEl = document.querySelector('.orderProcessing__list');
const listItemsArr = document.querySelectorAll('.orderProcessing__item');
const amountElArr = document.querySelectorAll('.orderProcessing__number');
const titlesArr = document.querySelectorAll('.orderProcessing__itemTitle');

listEl.addEventListener('click', onElementClick);

// ============== INITIAL STATE ================
for (let i = 1; i < listItemsArr.length; i += 1) {
  resetAmount(listItemsArr[i]);
}
// =============================================

function onElementClick(e) {
  if (e.target.nodeName === 'svg') {
    const btnName = e.target.dataset.action;
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
  let elNumberValue = Number(numberEl.textContent);

  if (operation === 'minus') {
    if (elNumberValue === 1) {
      numberEl.textContent = 0;
      resetAmount(listItem);
      return;
    }
    elNumberValue -= 1;
  }
  if (operation === 'plus') {
    elNumberValue += 1;
  }
  numberEl.textContent = elNumberValue;

  recalcAmount();
}

function resetAmount(listItem) {

  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector('.orderProcessing__inputWrapper');
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');

  numberEl.textContent = 0;
  inputWrapperEl.classList.add('visually-hidden');
  addBtnEl.classList.remove('visually-hidden');

  recalcAmount();
}

function addItem(listItem) {

  const numberEl = listItem.querySelector('.orderProcessing__number');
  const inputWrapperEl = listItem.querySelector('.orderProcessing__inputWrapper');
  const addBtnEl = listItem.querySelector('.orderProcessing__addBtn');

  numberEl.textContent = 1;
  inputWrapperEl.classList.remove('visually-hidden');
  addBtnEl.classList.add('visually-hidden');

  recalcAmount();
}

function recalcAmount() {
  products = [];
  titlesArr.forEach((el, idx) => {
    products.push({
      color: el.textContent,
      amount: amountElArr[idx].textContent,
    });
  })
  console.log(products);
}

