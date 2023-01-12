import {
  getAllPromocodes,
  postPromocodesCreate,
  patchPromocodeStatus,
  deletePromocode,
} from './services/promoAPI';
import { Notify } from 'notiflix';
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
  if (promoType === 'Personal') {
    if (inputAmount.disabled) inputAmount.disabled = false;
    dateGroup.classList.add('visually-hidden');
  } else {
    if (dateGroup.classList.contains('visually-hidden'))
      dateGroup.classList.remove('visually-hidden');
    inputAmount.disabled = true;
  }
}

async function onFormSubmit(e) {
  try {
    e.preventDefault();
    const form = e.currentTarget;
    const {
      elements: { promocode, amount, discount, dateStart, dateTo },
    } = form;
    if (promocode.value === 'Personal') {
      promocodeObj.type = promocode.value;
      promocodeObj.amount = Number(amount.value);
      promocodeObj.discount = Number(discount.value);
    } else {
      promocodeObj.type = promocode.value;
      promocodeObj.discount = Number(discount.value);
      promocodeObj.amount = Number(amount.value);
      promocodeObj.from = new Date(dateStart.value).toISOString();
      promocodeObj.to = new Date(dateTo.value).toISOString();
    }

    const response = await postPromocodesCreate(promocodeObj);
    if (response.length) {
      const promo = await getAllPromocodes();
      createPromocodeMarkup(promo);
      Notify.success(`Список промокодів успішно оновлено!`);
    }

    if (inputAmount.disabled) inputAmount.disabled = false;
    if (dateGroup.classList.contains('visually-hidden'))
      dateGroup.classList.remove('visually-hidden');
    form.reset();
    startDate.value = todayDate();
    stopDate.value = todayDate();
  } catch (error) {
    logout(error);
  }
}

function onCommonList(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const promoEl = e.target.closest('li');
  const promoName = promoEl.dataset.name;
  let isDelete = confirm(`Дійсно видалити цей промокод: ${promoName} ?`);
  if (isDelete) {
    deletePromocode({
      data: {
        promocode: promoName,
      },
    })
      .then(data => {
        if (data.ok == 1) {
          Notify.failure(`${promoName} успішно видалено!`);
          promoEl.remove();
        }
      })
      .catch(error => logout(error));
  } else {
    Notify.info(`Видалення ${promoName} відмінено`);
  }
}

function onPersonalList(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const btnName = e.target.dataset.action;
  const promoEl = e.target.closest('li');
  const promoName = promoEl.dataset.name;
  if (btnName === 'delete') {
    const isDelete = confirm(`Дійсно видалити цей промокод: ${promoName} ?`);
    if (isDelete) {
      deletePromocode({
        data: {
          promocode: promoName,
        },
      })
        .then(data => {
          if (data.ok == 1) {
            Notify.failure(`${promoName} успішно видалено!`);
            promoEl.remove();
          }
        })
        .catch(error => logout(error));
    } else {
      Notify.info(`Видалення ${promoName} відмінено.`);
    }
  } else {
    const isActivate = confirm(
      `Дійсно активувати цей промокод: ${promoName} ?`
    );
    if (isActivate) {
      patchPromocodeStatus({
        promocode: promoName,
      })
        .then(data => {
          if (data === 'switchPromoStatus') {
            e.target.disabled = true;
            e.target.innerText = 'Активовано';
            Notify.success(`${promoName} успішно активовано.`);
          }
        })
        .catch(error => logout(error));
    } else {
      Notify.info(`Активацію ${promoName} відмінено.`);
    }
  }
}
getAllPromocodes()
  .then(data => {
    return createPromocodeMarkup(data);
  })
  .catch(error => console.log(error.message));

setInterval(() => {
  getAllPromocodes()
    .then(data => createPromocodeMarkup(data))
    .catch(error => console.log(error.message));
}, 1000 * 60 * 60);

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
                    ${
                      p.isUsing
                        ? '<button data-action="active" disabled class="btn btn-success" type="button">Активовано</button>'
                        : '<button data-action="active" class="btn btn-success" type="button">Активувати</button>'
                    }
                    <button data-action="delete" class="btn btn-danger" type="button">Видалити</button></div>
                    </li>`;
            })
            .join('')}</ul>`;
    })
    .join('');
  commonList.innerHTML = commonMarkup;
  personalList.innerHTML = promocodeMarkUp;
}

function logout(error) {
  if (error.response.request.status === 401) {
    alert(`Час сесії минув. Будь ласка, пройдіть повторну авторизацію!`);
    window.location.href = '/login.html';
  }
}

initForm.addEventListener('change', onFormChange);
initForm.addEventListener('submit', onFormSubmit);
commonList.addEventListener('click', onCommonList);
personalList.addEventListener('click', onPersonalList);
