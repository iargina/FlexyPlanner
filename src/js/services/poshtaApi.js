import axios from 'axios';

axios.defaults.baseURL = 'https://api.novaposhta.ua/v2.0/json/';
const API_KEY = 'b73bc55d6258ef2d3f026e4a35a63aa4';

export default class PoshtaAPI {
  constructor() {
    this.city = '';
    this.warehouse = '';
  }

  selectCity(inputValue) {
    this.city = inputValue;
  }

  selectWarehouse(inputValue) {
    this.warehouse = inputValue;
  }

  async getSettlements() {
    try {
      const response = await axios.post(
        '/',
        JSON.stringify({
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: this.city,
            Limit: '3',
            Page: '1',
          },
        })
      );
      if (response.data.errors.length > 0) {
        throw { message: response.data.errors[0] };
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getWarehouses() {
    try {
      const response = await axios.post(
        '/',
        JSON.stringify({
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: this.city,
            FindByString: this.warehouse,
          },
        })
      );
      if (response.data.errors.length > 0) {
        throw { message: response.data.errors[0] };
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
