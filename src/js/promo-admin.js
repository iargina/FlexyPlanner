const initForm = document.querySelector('.promocode__form');
const inputAmount = document.querySelector('.input-amount-js');
const dateGroup = document.querySelector('.date__wrapper');
const commonList = document.querySelector('.common-promocode');
const personalList = document.querySelector('.personal-promocode');
const startDate = document.querySelector('#dateStart');
const stopDate = document.querySelector('#dateTo');

const promocodeObj = {};

startDate.value = todayDate();
stopDate.value = todayDate();

function todayDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  const today = year + '-' + month + '-' + day;
  return today;
}

function onFormChange(e) {
  e.preventDefault();
  let promoType = e.currentTarget.elements.promocode.value;
  if (promoType === 'personal') {
    if (inputAmount.disabled) inputAmount.disabled = false;
    dateGroup.classList.add('visually-hidden');
  } else {
    if (dateGroup.classList.contains('visually-hidden'))
      dateGroup.classList.remove('visually-hidden');
    inputAmount.disabled = true;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const {
    elements: { promocode, amound, discount, dateStart, dateTo },
  } = form;
  if (promocode.value === 'personal') {
    promocodeObj.type = promocode.value;
    promocodeObj.amound = amound.value;
    promocodeObj.discount = discount.value;
    promocodeObj.period = null;
  } else {
    promocodeObj.type = promocode.value;
    promocodeObj.discount = discount.value;
    promocodeObj.discount = amound.value;
    promocodeObj.period = {
      from: dateStart.value,
      to: dateTo.value,
    };
  }
  console.log(promocodeObj);
  if (inputAmount.disabled) inputAmount.disabled = false;
  if (dateGroup.classList.contains('visually-hidden'))
    dateGroup.classList.remove('visually-hidden');
  form.reset();
  startDate.value = todayDate();
  stopDate.value = todayDate();
}

function onCommonList(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const promoName = e.target.closest('li').dataset.name;
  let isDelete = confirm(`Дійсно видалити цей промокод: ${promoName} ?`);
  if (isDelete) {
    console.log(`delete ${promoName}`);
  } else {
    console.log(`do not delete ${promoName}`);
  }
}

function onPersonalList(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const btnName = e.target.dataset.action;
  const promoName = e.target.closest('li').dataset.name;

  if (btnName === 'delete') {
    const isDelete = confirm(`Дійсно видалити цей промокод: ${promoName} ?`);
    if (isDelete) {
      console.log(`delete ${promoName}`);
    } else {
      console.log(`do not delete ${promoName}`);
    }
  } else {
    const isActivate = confirm(
      `Дійсно активувати цей промокод: ${promoName} ?`
    );
    if (isActivate) {
      console.log(`active ${promoName}`);
      e.target.disabled = true;
      e.target.innerText = 'Активовано';
    } else {
      console.log(`do not active ${promoName}`);
    }
  }
}

const objFromBack = {
  common: [
    {
      discount: 10,
      isUsing: null,
      promo: '48383627',
      type: 'Common',
      period: {
        from: '2023-02-03T22:00:00.000Z',
        to: '2023-04-18T21:00:00.000Z',
      },
    },
    {
      discount: 20,
      isUsing: null,
      promo: '38417820',
      type: 'Common',
      period: {
        from: '2023-02-03T22:00:00.000Z',
        to: '2023-04-18T21:00:00.000Z',
      },
    },
  ],
  personal: [
    {
      discount: 30,
      isUsing: false,
      type: 'personal',
      promo: 'sdvsdv',
      period: null,
    },
    {
      discount: 30,
      isUsing: false,
      type: 'personal',
      promo: '1dbfd45',
      period: null,
    },
    {
      discount: 10,
      isUsing: false,
      type: 'personal',
      promo: 'v63sd1v2',
      period: null,
    },
    {
      discount: 30,
      isUsing: false,
      type: 'personal',
      promo: 'sdv2fd1',
      period: null,
    },
    {
      discount: 20,
      isUsing: false,
      type: 'personal',
      promo: 'dfvzx',
      period: null,
    },
    {
      discount: 20,
      isUsing: false,
      type: 'personal',
      promo: '137dsv5df',
      period: null,
    },
  ],
};

function createPromocodeMarkup({ common, personal }) {
  const commonMarkup = common
    .map(({ discount, promo, period }, i) => {
      return `<li class="list__item" data-name='${promo}'>
            <p>Знижка ${discount}%</p>
            <p>Термін дії: ${period.from.slice(0, 10)} - ${period.to.slice(
        0,
        10
      )}</p>
            <div class="common__wrapper">
            <p>${i + 1}. <span class="promo__name">${promo}</span></p>
            <button data-action="delete" class="btn btn-danger" type="button">Видалити</button>
            </div>
            </li>`;
    })
    .join('');

  const fixedPersonalPromocode = personal.reduce((acc, promocode) => {
    acc[promocode.discount] = acc[promocode.discount] || [];
    acc[promocode.discount].push(promocode);
    return acc;
  }, {});
  const promocodeMarkUp = Object.entries(fixedPersonalPromocode)
    .map(list => {
      return `
        <p>Знижка ${list[0]}%</p>
        <ul class="list__item">
          ${list[1]
            .map((p, i) => {
              return `
                    <li class="personal__wrapper" data-name='${p.promo}'>
                    <span>${i + 1}. 
                      <span class="promo__name">${p.promo}</span>
                    </span>
                    <div class="btn-wrapper">
                    <button data-action="active" class="btn btn-success" type="button">Активувати</button>
                    <button data-action="delete" class="btn btn-danger" type="button">Видалити</button></div>
                    </li>`;
            })
            .join('')}</ul>`;
    })
    .join('');
  commonList.innerHTML = commonMarkup;
  personalList.innerHTML = promocodeMarkUp;
}

createPromocodeMarkup(objFromBack);
initForm.addEventListener('change', onFormChange);
initForm.addEventListener('submit', onFormSubmit);
commonList.addEventListener('click', onCommonList);
personalList.addEventListener('click', onPersonalList);
