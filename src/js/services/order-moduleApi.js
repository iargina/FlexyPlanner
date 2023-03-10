import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.flexyplanner.com',
});

export const getCurrentPriceFromCrm = async () => {
  const { data } = await instance.get('/crm/offers');
  return data.data;
};
