import { checkPromocode } from './services/promoAPI';
import { Notify } from 'notiflix';
import { order } from './utils';
import { makeMarkup } from './finalSum';

export const refs = {
  promoForm: document.querySelector('.promo__form'),
  btnToggle: document.querySelector('.promo__toggle'),
  inputContainer: document.querySelector('.promo__hide'),
  inputEl: document.querySelector('.promo__input'),
  submitBtn: document.querySelector('.promo__submit'),
  successContainer: document.querySelector('.promo__success'),
  discount: document.querySelector('.promo__discount'),
  errorIcon: document.querySelector('.promocode__icon'),
};

refs.btnToggle.addEventListener('click', onBtnToggle);
refs.promoForm.addEventListener('submit', onFormSubmit);

function onBtnToggle(e) {
  if (refs.inputContainer.classList.contains('visually-hidden')) {
    refs.promoForm.classList.add('complite-form');
    refs.btnToggle.innerText = 'Закрити';
    refs.inputContainer.classList.remove('visually-hidden');
  } else {
    refs.promoForm.classList.remove('complite-form');
    refs.btnToggle.innerText = 'Відкрити';
    refs.inputContainer.classList.add('visually-hidden');
  }
}
async function onFormSubmit(e) {
  try {
    e.preventDefault();
    if (!e.target.elements.promo.value) {
      return;
    }
    const promoFromInput = e.target.elements.promo.value;
    const data = await checkPromocode(promoFromInput);

    if (!data.length) {
      refs.errorIcon.classList.remove('visually-hidden');
      refs.successContainer.classList.add('visually-hidden');
      Notify.failure('Промокод введений не вірно!');
      refs.promoForm.reset();
      order.discountValue = 0;
    } else {
      const isErrorShown = refs.errorIcon.classList.contains('visually-hidden');
      if (!isErrorShown) refs.errorIcon.classList.add('visually-hidden');
      refs.successContainer.classList.remove('visually-hidden');
      const discount = data[0].discount;
      refs.discount.innerText = `${discount} %`;
      Notify.success('Промокод застосовано!');
      refs.promoForm.reset();
      order.discountValue = discount;
      order.promocode = promoFromInput;
      makeMarkup();
    }
  } catch (error) {
    console.log(error.message);
  }
}
