import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import PoshtaAPI from './services/poshtaApi';
import { Order } from './utils';

const cityInputRef = document.querySelector('#city');
const citiesListRef = document.querySelector('.cities');
const warehouseInputRef = document.querySelector('#warehouse');
const warehousesListRef = document.querySelector('.warehouses');
const warehouseSearchRef = document.querySelector('.warehouse-search');
const warehouseBtnRef = document.querySelector('.warehouse-btn');

const api = new PoshtaAPI();
let order = new Order();

async function selectCity(e) {
  warehouseInputRef.value = '';
  warehousesListRef.classList.remove('show');

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
  if (!cityInputRef.value) {
    Notify.info(`Спочатку вкажіть ваш населений пункт`);
    return;
  }

  api.selectWarehouse(e.target.value);

  try {
    const res = await api.getWarehouses();
    const warehouses = res.data;
    const warehousesList = warehouses.map(
      warehouse => `<li>${warehouse.Description}</li>`
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
  warehouseSearchRef.classList.toggle('show');
}

function onCitiesListClick(e) {
  if (e.target.tagName !== 'LI') {
    return;
  }
  cityInputRef.value = e.target.textContent;

  // order.cityName = e.target.textContent;
  order.delivery = { city: e.target.textContent };

  api.selectCity(e.target.dataset.ref);
  citiesListRef.innerHTML = '';
  citiesListRef.classList.remove('show');
}

function onWarehousesListClick(e) {
  if (e.target.tagName !== 'LI') {
    return;
  }
  warehouseInputRef.value = e.target.textContent;

  // order.warehouse = e.target.textContent;
  order.delivery = { warehouse: e.target.textContent };

  warehousesListRef.innerHTML = '';
  warehousesListRef.classList.remove('show');
}

cityInputRef.addEventListener('input', debounce(selectCity, 300));
warehouseInputRef.addEventListener('focus', selectWarehouse);
warehouseInputRef.addEventListener('input', debounce(selectWarehouse, 300));
citiesListRef.addEventListener('click', onCitiesListClick);
warehousesListRef.addEventListener('click', onWarehousesListClick);
warehouseBtnRef.addEventListener('click', toggleWarehouseSearch);
