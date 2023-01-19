import { order } from './utils';

const submitBtnEl = document.querySelector('.contacts__btn');
const formEl = document.querySelector('form');
const bodyHeight = getComputedStyle(document.body, '').height;

function setTotalSumInitialHeight() {
  if (window.innerWidth >= 1440) {
    document.querySelector('.finalSum__container').style.height = bodyHeight;
  } else {
    document.querySelector('.finalSum__container').style.height = '100%';
  }
}
setTotalSumInitialHeight();
window.addEventListener('resize', setTotalSumInitialHeight);

submitBtnEl.addEventListener('click', e => {
  e.preventDefault();

  const formData = new FormData(formEl);
  const arrOfArrs = [...formData.entries()];
  const obj = Object.fromEntries(arrOfArrs);

  order.contactInfo = obj;

  const deliveryContainer = document.querySelector('.delivery__container');
  deliveryContainer.classList.remove('delivery__ishidden');
  document
    .querySelector('.promo__container')
    .classList.remove('promo__ishidden');

  function setTotalSumHeight() {
    if (window.innerWidth >= 1440) {
      const deliveryHeight = getComputedStyle(deliveryContainer, '').height;
      document.querySelector('.finalSum__container').style.height =
        parseInt(bodyHeight) + parseInt(deliveryHeight) + 'px';
    } else {
      document.querySelector('.finalSum__container').style.height = '100%';
    }
  }
  setTotalSumHeight();
  window.addEventListener('resize', setTotalSumHeight);

  window.scrollBy({
    top: 500,
    behavior: 'smooth',
  });
});
