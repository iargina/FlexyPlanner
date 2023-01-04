const initForm = document.querySelector('.promocode__form');
const labelAmount = document.querySelector('.label-amount-js');
const dateGroup = document.querySelector('.date__wrapper');
const commonList = document.querySelector('.common-promocode');
const personalList = document.querySelector('.personal-promocode');

initForm.addEventListener('change', onFormChange);
initForm.addEventListener('submit', onFormSubmit);

const promocodeObj = {};

function onFormChange(e) {
  e.preventDefault();
  let promoType = e.currentTarget.elements.promocode.value;
  if (promoType === 'personal') {
    if (labelAmount.classList.contains('visually-hidden'))
      labelAmount.classList.remove('visually-hidden');
    dateGroup.classList.add('visually-hidden');
  } else {
    if (dateGroup.classList.contains('visually-hidden'))
      dateGroup.classList.remove('visually-hidden');
    labelAmount.classList.add('visually-hidden');
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
    promocodeObj.from = dateStart.value;
    promocodeObj.to = dateTo.value;
  }
  console.log(promocodeObj);
  form.reset();
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
    .map(promo => {
      if (promo.type === 'common') {
        return `<li class="list__item" data-name='${promo.name}'>
            <p>Discount ${promo.discount}</p>
            <p>Date ${promo.date}</p>
            <div class="common__wrapper">
            <p>Промокод <b>${promo.name}</b></p>
            <button class="btn btn-danger" type="button">Видалити</button>
            </div>
            </li>`;
      } else {
        return `<li class="list__item">
            <p>Discount ${promo.discount}</p>            
            <ul>
            ${promo.name
              .map((p, i) => {
                return `
                <div class="personal__wrapper">
                <li data-name='${p}'>${i + 1} Промокод <b>${p}</b></li>
                <div class="btn-wrapper">
                <button class="btn btn-success" type="button">Активувати</button>
                 <button class="btn btn-danger" type="button">Видалити</button></div>
                </div>
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
