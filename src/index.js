import debounce from 'lodash.debounce';
import PoshtaAPI from './js/poshtaApi';

const cityInputRef = document.querySelector('#city');
const citiesListRef = document.querySelector('.cities');
const warehouseInputRef = document.querySelector('#warehouse');
const warehousesListRef = document.querySelector('.warehouses');

const api = new PoshtaAPI();

async function selectCity(e) {
  api.selectCity(e.target.value);

  const res = await api.searchSettlements();
  const cities = res.data[0].Addresses;
  const citiesList = cities.map(
    city => `<li data-ref=${city.DeliveryCity}>${city.Present}</li>`
  );
  citiesListRef.innerHTML = citiesList.join('');
}

async function selectWarehouse(e) {
  // api.selectWarehouse(e.target.value);

  const res = await api.getWarehouses();
  const warehouses = res.data;
  const warehousesList = warehouses.map(
    warehouse => `<li>${warehouse.Description}</li>`
  );
  warehousesListRef.innerHTML = warehousesList.join('');
}

cityInputRef.addEventListener('input', debounce(selectCity, 300));
warehouseInputRef.addEventListener('focus', selectWarehouse);

citiesListRef.addEventListener('click', onCitiesListClick);
warehousesListRef.addEventListener('click', onWarehousesListClick);

function onCitiesListClick(e) {
  cityInputRef.value = e.target.textContent;
  api.selectCity(e.target.dataset.ref);
  citiesListRef.innerHTML = '';
}

function onWarehousesListClick(e) {
  warehouseInputRef.value = e.target.textContent;
  warehousesListRef.innerHTML = '';
}
