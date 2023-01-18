import { order } from './utils';
import { Notify } from 'notiflix';

const submitBtnEl = document.querySelector('.contacts__btn');
const conatctName = document.querySelector('.contacts__name');
const conatctPhone = document.querySelector('.contacts__phone');
const formEl = document.querySelector('form');
submitBtnEl.disabled = true;

if (window.innerWidth >= 1440) {
  document
    .querySelector('.finalSum__container')
    .classList.remove('finalSum__ishidden');
  document
    .querySelector('.promo__container')
    .classList.remove('promo__ishidden');
} else {
  document
    .querySelector('.finalSum__container')
    .classList.add('finalSum__ishidden');
  document.querySelector('.promo__container').classList.add('promo__ishidden');
}

formEl.addEventListener('change', e => {
  if (conatctName.validity.patternMismatch) {
    Notify.info(`Введіть Прізвище та Ім'я`);
  }
  if (conatctPhone.validity.patternMismatch) {
    Notify.info(`Введіть номер телефону у форматі +380999999999`);
  }
  if (
    !conatctName.validity.patternMismatch &&
    !conatctPhone.validity.patternMismatch &&
    conatctName.value.length > 0 &&
    conatctPhone.value.length > 0
  ) {
    submitBtnEl.disabled = false;
  }
});

console.log(formEl);
submitBtnEl.addEventListener('click', e => {
  e.preventDefault();

  const formData = new FormData(formEl);
  const arrOfArrs = [...formData.entries()];
  const obj = Object.fromEntries(arrOfArrs);
  order.contactInfo = obj;

  const finalSumBtn = document.querySelector('.finalSum__btn');
  const deliveryContainer = document.querySelector('.delivery__container');
  const finalSumContainer = document.querySelector('.finalSum__container');
  const promoContainer = document.querySelector('.promo__container');

  deliveryContainer.classList.remove('delivery__ishidden');
  if (window.innerWidth <= 1440) {
    finalSumContainer.classList.remove('finalSum__ishidden');
    promoContainer.classList.remove('promo__ishidden');
  }
  submitBtnEl.style.display = 'none';
  finalSumBtn.disabled = false;

  window.scrollBy({
    top: 500,
    behavior: 'smooth',
  });
});
