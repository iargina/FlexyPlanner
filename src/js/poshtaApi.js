import axios from 'axios';

axios.defaults.baseURL = 'https://api.novaposhta.ua/v2.0/json/';

export default class PoshtaAPI {
  constructor() {
    this.city = '';
    this.warehouse = '';
  }

  selectCity(ref) {
    this.city = ref;
  }

  selectWarehouse(ref) {
    this.warehouse = ref;
  }

  async searchSettlements() {
    const response = await axios.post(
      '/',
      JSON.stringify({
        apiKey: 'b73bc55d6258ef2d3f026e4a35a63aa4',
        modelName: 'Address',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: this.city,
          Limit: '5',
          Page: '1',
        },
      })
    );
    return response.data;
  }

  async getWarehouses() {
    const response = await axios.post(
      '/',
      JSON.stringify({
        apiKey: 'b73bc55d6258ef2d3f026e4a35a63aa4',
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: this.city,
          Limit: '5',
        },
      })
    );
    return response.data;
  }
}
