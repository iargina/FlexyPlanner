import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import PoshtaAPI from './services/poshtaApi';
import { order } from './utils';

const cityInputRef = document.querySelector('#city');
const citiesListRef = document.querySelector('.cities');
const warehouseInputRef = document.querySelector('#warehouse');
const warehousesListRef = document.querySelector('.warehouses');
const warehouseSearchRef = document.querySelector('.warehouse-search');
const warehouseBtnRef = document.querySelector('.warehouse-btn');

const userNameRef = document.querySelector('#username');
const userPhoneRef = document.querySelector('#phone');
const receiverNameRef = document.querySelector('#receiverName');
const receiverPhoneRef = document.querySelector('#receiverPhone');
const receiverCheckboxRef = document.querySelector('#receiverCheckbox');

const api = new PoshtaAPI();

let warehousesArr = [];

async function selectCity(e) {
  warehouseInputRef.value = '';
  warehouseSearchRef.classList.remove('show');
  warehousesListRef.classList.remove('show');
  warehouseBtnRef.classList.remove('active');

  if (!e.target.value) {
    citiesListRef.classList.remove('show');
    return;
  }

  api.selectCity(e.target.value);

  try {
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
  }
}

function toggleWarehouseSearch() {
  if (!cityInputRef.value) {
    Notify.info(`Спочатку вкажіть ваш населений пункт`);
    return;
  }

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
  citiesListRef.classList.remove('show');

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
    recipient_phone: receiverPhoneRef.value,
  };

  console.log(order);

  order.delivery = deliveryInfo;
  console.log(order);

  warehousesListRef.innerHTML = '';
  warehousesListRef.classList.remove('show');
}

function onInputBlur(e) {
  if (
    e.currentTarget === citiesListRef ||
    e.currentTarget === warehousesListRef
  )
    return;
  setTimeout(() => {
    if (e.target.name === 'city') {
      citiesListRef.classList.remove('show');
    }
    if (e.target.name === 'warehouse') {
      warehousesListRef.classList.remove('show');
    }
  }, 100);
}

function onCheckboxChange(e) {
  if (e.target.checked) {
    receiverNameRef.value = userNameRef.value;
    receiverNameRef.disabled = true;

    receiverPhoneRef.value = userPhoneRef.value;
    receiverPhoneRef.disabled = true;
  } else {
    receiverNameRef.value = '';
    receiverNameRef.disabled = false;

    receiverPhoneRef.value = '';
    receiverPhoneRef.disabled = false;
  }
}

cityInputRef.addEventListener('input', debounce(selectCity, 300));
// cityInputRef.addEventListener('blur', onInputBlur);

warehouseInputRef.addEventListener('input', debounce(selectWarehouse, 300));
// warehouseInputRef.addEventListener('blur', onInputBlur);

citiesListRef.addEventListener('click', onCitiesListClick);
warehousesListRef.addEventListener('click', onWarehousesListClick);
warehouseBtnRef.addEventListener('click', toggleWarehouseSearch);

document.body.addEventListener('click', onInputBlur);
receiverCheckboxRef.addEventListener('change', onCheckboxChange);
