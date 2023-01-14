import { order } from './utils';

const submitBtnEl = document.querySelector('.contacts__btn');
const formEl = document.querySelector('form');

submitBtnEl.addEventListener('click', e => {
  e.preventDefault();

  const formData = new FormData(formEl);
  const arrOfArrs = [...formData.entries()];
  const obj = Object.fromEntries(arrOfArrs);

  order.contactInfo = obj;
  document.querySelector('.delivery__container').classList.remove('delivery__ishidden')
  document.querySelector('.promo__container').classList.remove('promo__ishidden')
  
  window.scrollBy({
    top: 500,
    behavior: "smooth",
    });
});
