import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.flexyplanner.com',
});

export const getMarkup = async () => {
  const { data } = await instance.get('/markup');
  return data;
};

export const toggleActiveOrderModule = async () => {
  const { data } = await instance.patch('/markup');
  return data;
};

export const setCurrentPrice = async obj => {
  const { data } = await instance.put('/markup', obj);
  return data;
};

export const getCurrentPriceFromCrm = async () => {
  const { data } = await instance.get('/crm/offers');
  return data.data;
};
