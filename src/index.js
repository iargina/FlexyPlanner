import debounce from 'lodash.debounce';
import PoshtaAPI from './js/poshtaApi';

const cityInputRef = document.querySelector('#city');
const citiesListRef = document.querySelector('.cities');
const warehouseInputRef = document.querySelector('#warehouse');
const warehousesListRef = document.querySelector('.warehouses');

const api = new PoshtaAPI();

async function selectCity(e) {
  warehouseInputRef.value = '';
  if (!e.target.value) {
    citiesListRef.classList.remove('show');
    return;
  }

  warehousesListRef.classList.remove('show');

  api.selectCity(e.target.value);
  const res = await api.searchSettlements();
  const cities = res.data[0].Addresses;
  const citiesList = cities.map(
    city => `<li data-ref=${city.DeliveryCity}>${city.Present}</li>`
  );
  citiesListRef.innerHTML = citiesList.join('');
  citiesListRef.classList.add('show');
}

async function selectWarehouse(e) {
  if (!cityInputRef.value) {
    return;
  }

  warehouseInputRef.placeholder = 'Введіть адресу або номер відділення';
  api.selectWarehouse(e.target.value);

  const res = await api.getWarehouses();
  const warehouses = res.data;
  const warehousesList = warehouses.map(
    warehouse => `<li>${warehouse.Description}</li>`
  );
  warehousesListRef.innerHTML = warehousesList.join('');
  warehousesListRef.classList.add('show');
}

cityInputRef.addEventListener('input', debounce(selectCity, 300));
warehouseInputRef.addEventListener('focus', selectWarehouse);
warehouseInputRef.addEventListener('input', debounce(selectWarehouse, 300));

citiesListRef.addEventListener('click', onCitiesListClick);
warehousesListRef.addEventListener('click', onWarehousesListClick);

function onCitiesListClick(e) {
  if (e.target.tagName !== 'LI') {
    return;
  }
  cityInputRef.value = e.target.textContent;
  api.selectCity(e.target.dataset.ref);
  citiesListRef.innerHTML = '';
  citiesListRef.classList.remove('show');
}

function onWarehousesListClick(e) {
  if (e.target.tagName !== 'LI') {
    return;
  }
  warehouseInputRef.value = e.target.textContent;
  warehousesListRef.innerHTML = '';
  warehousesListRef.classList.remove('show');
}
