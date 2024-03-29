import { order } from './utils';
import { Notify } from 'notiflix';
import IMask from 'imask';
import { itiInit, maskInit } from './helpers/phoneNumberInit';
import { maskOnCountryChange } from './helpers/maskOnCountryChange';
import { getPhoneNumber } from './helpers/getPhoneNumber';

const submitBtnEl = document.querySelector('.contacts__btn');
const contactName = document.querySelector('.contacts__name');
const contactPhone = document.querySelector('.contacts__phone');
const receiverNameRef = document.querySelector('#receiverName');
const conactInfo = document.querySelectorAll('.contacts__input');
const receiverCheckboxRef = document.querySelector('#receiverCheckbox');



let itiContact = itiInit(contactPhone);
let maskContact = maskInit(contactPhone);

contactName.addEventListener("input", (e)=> {
  if(receiverCheckboxRef.checked){receiverNameRef.value = e.target.value}

})
contactPhone.addEventListener("countrychange", (e) => {
  const placeHolderMask = itiContact.telInput.placeholder;
  let selectedCountryLabel = itiContact.getSelectedCountryData().iso2;
  contactPhone.dataset.country = selectedCountryLabel;
  maskOptions = maskOnCountryChange(selectedCountryLabel, placeHolderMask);
  maskContact = IMask(contactPhone, maskOptions);
  contactPhone.setSelectionRange(0, 0);
  contactPhone.focus();
});

contactPhone.addEventListener("close:countrydropdown", (e) => {
  maskContact.destroy();
})

conactInfo.forEach(input => input.addEventListener('input', () => {
  if (input.validity.valid) {
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
  }
}))



const formEl = document.querySelector('form');
submitBtnEl.disabled = true;

if (window.innerWidth >= 1440) {
  // if (window.innerWidth >= 375) {
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

formEl.addEventListener('input', e => {

  const warningEl = document.querySelector("#NotiflixNotifyWrap");

  if (
    !contactName.validity.patternMismatch &&
    itiContact.isValidNumber() &&
    contactName.value.length > 0
  ) {
    submitBtnEl.disabled = false;
  } else {
    submitBtnEl.disabled = true;
  }

  if (contactName.validity.patternMismatch) {
    Notify.info(`Введіть своє ім'я коректно`);
  }

  if (!contactName.validity.patternMismatch && warningEl) {
    warningEl.remove();
  }

});

formEl.addEventListener('change', e => {


  let regexp = /['’ʼ-]/;
  if (contactName.value && contactName.value[contactName.value.length - 1].match(regexp)) {
    Notify.info(`Ви впевнені, що в імені немає помилки?`);
  }

  if (!contactName.validity.patternMismatch) {
    contactPhone.setSelectionRange(0, 0);
    contactPhone.focus();
  }

  let unmaskedLength = maskContact.unmaskedValue.length;
  let isValid = itiContact.isValidNumber();
  if (!isValid && unmaskedLength > 0) {
    contactPhone.classList.add('invalid')
    Notify.info(`З номером щось не так. Перегляньте ще раз`);
  }

/*   if (contactName.value.length > 0 && isValid) {
    const comment = document.querySelector("#comment");
    comment.focus();
  } */

  if (isValid) {
    order.contactInfo = {
      ...order.contactInfo,
      phone: getPhoneNumber(itiContact, maskContact),
    };
  }

});




submitBtnEl.addEventListener('click', e => {
  e.preventDefault();

  const formData = new FormData(formEl);
  const arrOfArrs = [...formData.entries()];
  let obj = Object.fromEntries(arrOfArrs);
  obj = {
    ...obj,
    phone: getPhoneNumber(itiContact, maskContact),
  }
  order.contactInfo = obj;

  const deliveryContainer = document.querySelector('.delivery__container');
  const finalSumContainer = document.querySelector('.finalSum__container');
  const promoContainer = document.querySelector('.promo__container');

  deliveryContainer.classList.remove('delivery__ishidden');
  receiverNameRef.focus();

  if (window.innerWidth <= 1440) {
    finalSumContainer.classList.remove('finalSum__ishidden');
    promoContainer.classList.remove('promo__ishidden');
  }
  submitBtnEl.style.display = 'none';

  window.scrollBy({
    top: 500,
    behavior: 'smooth',
  });
});