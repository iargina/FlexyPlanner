import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import PoshtaAPI from './services/poshtaApi';
import { order } from './utils';

import IMask from 'imask';
import { itiInit, maskInit } from './helpers/phoneNumberInit';
import { maskOnCountryChange } from './helpers/maskOnCountryChange';
import { hideNotification } from './helpers/hideNotification';

const cityInputRef = document.querySelector('#city');
const citiesListRef = document.querySelector('.cities');
const warehouseInputRef = document.querySelector('#warehouse');
const warehousesListRef = document.querySelector('.warehouses');
const warehouseSearchRef = document.querySelector('.warehouse-search');
const warehouseBtnRef = document.querySelector('.warehouse-btn');
const finalSumBtn = document.querySelector('.finalSum__btn');

const receiverNameRef = document.querySelector('#receiverName');
const receiverLastNameRef = document.querySelector('#receiverLastName');
const recieverContactPhoneRef = document.querySelector(
  '.reciever-contacts__phone'
);
const receiverCheckboxRef = document.querySelector('#receiverCheckbox');
const cityWrapperEl = document.querySelector(".city-wrapper");

// INITIAL STATE
let itiDelvery = itiInit(recieverContactPhoneRef);
let maskDelivery = maskInit(recieverContactPhoneRef);

finalSumBtn.disabled = false;
finalSumBtn.classList.add("visually-hidden");

recieverContactPhoneRef.addEventListener('countrychange', e => {
  const placeHolderMask = itiDelvery.telInput.placeholder;
  const selectedCountryLabel = itiDelvery.getSelectedCountryData().iso2;
  const maskOptions = maskOnCountryChange(
    selectedCountryLabel,
    placeHolderMask
  );
  maskDelivery = IMask(recieverContactPhoneRef, maskOptions);
  recieverContactPhoneRef.setSelectionRange(0, 0);
  recieverContactPhoneRef.focus();
});

recieverContactPhoneRef.addEventListener('close:countrydropdown', e => {
  maskDelivery.destroy();
});

const api = new PoshtaAPI();

let warehousesArr = [];

async function selectCity(e) {
  warehouseInputRef.value = '';
  warehouseSearchRef.classList.remove('show');
  warehousesListRef.classList.remove('show');
  warehouseBtnRef.classList.remove('active');

  const warningEl = document.querySelector('#NotiflixNotifyWrap');

  if (!e.target.value) {
    citiesListRef.classList.remove('show');
    if (warningEl) {
      warningEl.remove();
    }
    return;
  }

  api.selectCity(e.target.value.trim());

  if (cityInputRef.validity.patternMismatch) {
    Notify.info(`Введіть назву міста українською мовою`);
    return;
  }

  try {
    if (warningEl) {
      warningEl.remove();
    }
    const res = await api.getSettlements();
    const cities = res.data[0].Addresses;
    const citiesList = cities.map(
      city => `<li data-ref=${city.DeliveryCity}>${city.Present}</li>`
    );
    citiesListRef.innerHTML = citiesList.join('');
    citiesListRef.classList.add('show');
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
}

async function selectWarehouse(e) {
  api.selectWarehouse(e.target.value);

  try {
    const res = await api.getWarehouses();
    const warehouses = res.data;

    const warehousesList = warehouses.map(
      warehouse => `<li data-ref=${warehouse.Ref}>${warehouse.Description}</li>`
    );
    warehousesListRef.innerHTML = warehousesList.join('');
    warehousesListRef.classList.add('show');
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
}

function toggleWarehouseSearch(e) {
  if (!cityInputRef.value) {
    Notify.info(`Спочатку вкажіть ваш населений пункт`);
    return;
  }

  warehousesListRef.classList.add('show');
  e.stopPropagation();

  warehouseSearchRef.classList.toggle('show');
  warehouseBtnRef.classList.toggle('active');

  if (
    warehouseSearchRef.classList.contains('show') &&
    warehouseInputRef.value === ''
  ) {
    warehousesListRef.classList.add('show');
    warehouseInputRef.focus();
  }
}

async function onCitiesListClick(e) {
  if (e.target.tagName !== 'LI') {
    return;
  }

  cityInputRef.value = e.target.textContent;

  api.selectCity(e.target.dataset.ref);
  citiesListRef.innerHTML = '';

  try {
    const res = await api.getWarehouses();
    const warehouses = res.data;
    warehousesArr = warehouses;
    const warehousesList = warehouses.map(warehouse => {
      return `<li data-ref=${warehouse.Ref}>${warehouse.Description}</li>`;
    });
    warehousesListRef.innerHTML = warehousesList.join('');
    warehousesListRef.classList.add('show');
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
}

function onWarehousesListClick(e) {
  if (e.target.tagName !== 'LI') {
    return;
  }

  warehouseInputRef.value = e.target.textContent;

  const warehouseObj = warehousesArr.find(
    warehouse => warehouse.Ref === e.target.dataset.ref
  );

  const deliveryInfo = {
    // місто
    shipping_address_city: warehouseObj.CityDescription,

    // область
    shipping_address_region: warehouseObj.SettlementAreaDescription,

    // номер відділення
    shipping_receive_point:
      'Відділення/поштомат/склад №  ' + warehouseObj.Number,

    // description
    shipping_secondary_line: warehouseObj.Description,

    // postal code
    shipping_postal_code: warehouseObj.PostalCodeUA,

    // ref
    shipping_ref: warehouseObj.Ref,

    // short address
    shipping_short_address: warehouseObj.ShortAddress,

    // receiver name
    recipient_full_name: receiverNameRef.value,

    // receiver phone
    recipient_phone: order.contactInfo.phone,
  };

  order.delivery = deliveryInfo;

  warehousesListRef.innerHTML = '';

  // Check if all inputs has values before select warehouse
  // and enabled finalSumBtn
  if (
    receiverNameRef.value.length > 0 &&
    receiverLastNameRef.value.length > 0 &&
    recieverContactPhoneRef.value.length > 0
  ) {
    // finalSumBtn.disabled = false;
    finalSumBtn.classList.remove("visually-hidden");
  }
}

function onInputBlur() {
  if (citiesListRef.classList.contains('show')) {
    citiesListRef.classList.remove('show');
    return;
  }

  if (warehousesListRef.classList.contains('show')) {
    warehousesListRef.classList.remove('show');
  }
}

function onCheckboxChange(e) {
  if (e.target.checked) {
    receiverNameRef.value = order.contactInfo.username;
    receiverNameRef.disabled = true;

    const contactDeliveryPhoneCodeString = `+${itiDelvery.getSelectedCountryData().dialCode
      }`;
    const cuttedPhoneNumber = order.contactInfo.phone.slice(
      contactDeliveryPhoneCodeString.length
    );
    maskDelivery.value = cuttedPhoneNumber;
    receiverLastNameRef.focus();
  } else {
    receiverNameRef.value = '';
    receiverLastNameRef.value = '';
    receiverNameRef.disabled = false;
    maskDelivery.value = '';
    receiverNameRef.focus();
  }
}

cityInputRef.addEventListener('input', debounce(selectCity, 300));
warehouseInputRef.addEventListener('input', debounce(selectWarehouse, 300));

citiesListRef.addEventListener('click', onCitiesListClick);
warehousesListRef.addEventListener('click', onWarehousesListClick);
warehouseBtnRef.addEventListener('click', toggleWarehouseSearch);

document.body.addEventListener('click', onInputBlur);
receiverCheckboxRef.addEventListener('change', onCheckboxChange);

cityWrapperEl.addEventListener("click", (e) => {
  if (receiverNameRef.value.length > 0 && receiverLastNameRef.value.length > 0 && !itiDelvery.isValidNumber()) {
    Notify.info(`З номером щось не так. Перегляньте ще раз`);
  }
});

cityWrapperEl.addEventListener("input", (e) => {

  const warningEl = document.querySelector('#NotiflixNotifyWrap');

  if (receiverNameRef.validity.patternMismatch) {
    Notify.info(`Введіть своє ім'я коректно`);
    finalSumBtn.classList.add("visually-hidden");
    return;
  }

  if (!receiverNameRef.validity.patternMismatch && warningEl) {
    hideNotification();
  }

  if (receiverLastNameRef.validity.patternMismatch) {
    Notify.info(`Введіть своє прізвище коректно`);
    finalSumBtn.classList.add("visually-hidden");
    return;
  }

  if (!receiverLastNameRef.validity.patternMismatch && warningEl) {
    hideNotification();
  }

  if (e.target.value.length === 0 || !itiDelvery.isValidNumber()) {
    finalSumBtn.classList.add("visually-hidden");
    return;
  }

  if (receiverNameRef.value.length > 0 &&
    receiverLastNameRef.value.length > 0 &&
    recieverContactPhoneRef.value.length > 0 &&
    warehouseInputRef.value.length > 0 &&
    e.target.value.length > 0) {
    hideNotification();
    finalSumBtn.classList.remove("visually-hidden");
  }

});

cityWrapperEl.addEventListener("change", (e) => {

  if (receiverNameRef.value.length > 0 && receiverLastNameRef.value.length > 0) {
    recieverContactPhoneRef.setSelectionRange(0, 0);
    recieverContactPhoneRef.focus();
  }

  let unmaskedLength = maskDelivery.unmaskedValue.length;
  let isValid = itiDelvery.isValidNumber();
  if (!isValid && unmaskedLength > 0) {
    Notify.info(`З номером щось не так. Перегляньте ще раз`);
  }

  if (receiverNameRef.value.length > 0 &&
    receiverLastNameRef.value.length > 0 &&
    itiDelvery.isValidNumber() &&
    cityInputRef.value.length > 0) {
    return;
  }

  if (receiverNameRef.value.length > 0 && receiverLastNameRef.value.length > 0 && itiDelvery.isValidNumber()) {
    cityInputRef.focus();
  }
})