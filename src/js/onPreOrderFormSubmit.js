// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Notify } from 'notiflix';
import axios from 'axios';

import IMask from 'imask';
import { itiInit, maskInit } from './helpers/phoneNumberInit';
import { maskOnCountryChange } from './helpers/maskOnCountryChange';
import { getPhoneNumber } from './helpers/getPhoneNumber';
import { hideNotification } from './helpers/hideNotification';

const form = document.querySelector('.modalFeedBack__form');
const inputs = document.querySelectorAll('.modalFeedBack__input');
const userNameRef = document.querySelector('.user-contacts__name');
const userPhoneRef = document.querySelector('.user-contacts__phone');
const userEmailRef = document.querySelector('.user-contacts__email');
const sendInfoBtnRef = document.querySelector('.modalFeedBack__btn');
const modal = document.querySelector('.modalFeedBack');
const successModal = document.querySelector('.modalFeedBackSuccess');

// INITIAL STATE
let itiDelvery = itiInit(userPhoneRef);
let maskDelivery = maskInit(userPhoneRef);
sendInfoBtnRef.disabled = true;

userPhoneRef.addEventListener('countrychange', e => {
  const placeHolderMask = itiDelvery.telInput.placeholder;
  const selectedCountryLabel = itiDelvery.getSelectedCountryData().iso2;
  const maskOptions = maskOnCountryChange(
    selectedCountryLabel,
    placeHolderMask
  );
  maskDelivery = IMask(userPhoneRef, maskOptions);
  userPhoneRef.setSelectionRange(0, 0);
  userPhoneRef.focus();
});

userPhoneRef.addEventListener('close:countrydropdown', e => {
  maskDelivery.destroy();
});

form.addEventListener('input', e => {
  const warningEl = document.querySelector('#NotiflixNotifyWrap');

  if (
    !userNameRef.validity.patternMismatch &&
    itiDelvery.isValidNumber() &&
    userNameRef.value.length > 0 &&
    !userEmailRef.validity.patternMismatch &&
    userEmailRef.value.length > 0
  ) {
    sendInfoBtnRef.disabled = false;
  } else {
    sendInfoBtnRef.disabled = true;
  }

  if (warningEl && !userNameRef.validity.patternMismatch) {
    warningEl.remove();
  }
  if (warningEl && !userEmailRef.validity.patternMismatch) {
    warningEl.remove();
  }
});

form.addEventListener('change', e => {
  let regexp = /['’ʼ-]/;
  if (
    userNameRef.value &&
    userNameRef.value[userNameRef.value.length - 1].match(regexp)
  ) {
    Notify.info(`Ви впевнені, що в імені немає помилки?`);
  }

  if (userNameRef.validity.patternMismatch) {
    Notify.info(`Введіть своє ім'я коректно`);
  }

  if (userEmailRef.validity.patternMismatch) {
    Notify.info(`В поштовій адресі помилка`);
  }

  let unmaskedLength = maskDelivery.unmaskedValue.length;
  let isValid = itiDelvery.isValidNumber();
  if (!isValid && unmaskedLength > 0) {
    Notify.info(`З номером щось не так. Перегляньте ще раз`);
  }
});

const onPreOrderFormSubmit = () => {
  form.addEventListener('submit', sendData);

  function sendData(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const nameData = formData.get('username');
    const phoneData = getPhoneNumber(itiDelvery, maskDelivery);
    const emailData = formData.get('email');
    const commentData = formData.get('comment');
    const leadData = {
      source_id: 1,
      title: commentData,
      pipeline_id: 1,
      contact: {
        full_name: nameData,
        phone: phoneData,
        email: emailData,
      },
    };

    axios({
      method: 'post',
      url: 'https://flexyplanner.onrender.com/crm/leads',
      data: leadData,
    });
    clearInputs();
    modal.classList.add('modal-is-hidden');
    successModal.classList.remove('modal-is-hidden');
  }

  function clearInputs() {
    inputs.forEach(input => {
      input.value = '';
    });
    maskDelivery.value = '';
  }
};

onPreOrderFormSubmit();
