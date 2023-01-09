import { order } from './utils';

const submitBtnEl = document.querySelector('.contacts__btn');
const formEl = document.querySelector('form');

submitBtnEl.addEventListener('click', (e) => {
  e.preventDefault();

  const formData = new FormData(formEl);
  const arrOfArrs = [...formData.entries()];
  const obj = Object.fromEntries(arrOfArrs);

  order.contactInfo = obj;
});