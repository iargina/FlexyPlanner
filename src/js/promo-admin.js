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

const commonArray = [
  {
    type: 'common',
    discount: '30',
    date: '2023-01-05 - 2023-02-05',
    name: 'hT143Sfv',
  },
  {
    type: 'common',
    discount: '10',
    date: '2023-01-05 - 2023-02-05',
    name: 'ntj53ken',
  },
  {
    type: 'common',
    discount: '20',
    date: '2023-01-05 - 2023-02-05',
    name: 'h198dSfv',
  },
];
const PersonalArray = [
  {
    type: 'personal',
    discount: '30',
    name: ['sdvsdv', 'dngsfgnv', 'DFBDFbz'],
  },
  {
    type: 'personal',
    discount: '20',
    name: ['dfvzx', 'bfdbmmghm', 'fgncvb'],
  },
];

function createPromocodeMarkup(array) {
  return array
    .map((promo, i) => {
      if (promo.type === 'common') {
        return `<li class="list__item" data-name='${promo.name}'>
            <p>Знижка ${promo.discount}</p>
            <p>Термін дії: ${promo.date}</p>
            <div class="common__wrapper">
            <p>${i + 1}. Промокод <b>${promo.name}</b></p>
            <button data-action="delete" class="btn btn-danger" type="button">Видалити</button>
            </div>
            </li>`;
      } else {
        return `<li class="list__item">
            <p>Знижка ${promo.discount}</p>            
            <ul>
            ${promo.name
              .map((p, i) => {
                return `               
                <li class="personal__wrapper" data-name='${p}'>
                <span>${i + 1}. Промокод <b>${p}</b></span>
                <div class="btn-wrapper">
                <button data-action="active" class="btn btn-success" type="button">Активувати</button>
                 <button data-action="delete" class="btn btn-danger" type="button">Видалити</button></div>
                </li>                 
                `;
              })
              .join('')}
            </ul>
            </li>`;
      }
    })
    .join('');
}

commonList.innerHTML = createPromocodeMarkup(commonArray);
personalList.innerHTML = createPromocodeMarkup(PersonalArray);

initForm.addEventListener('change', onFormChange);
initForm.addEventListener('submit', onFormSubmit);
commonList.addEventListener('click', onCommonList);
personalList.addEventListener('click', onPersonalList);
