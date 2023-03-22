import axios from 'axios';
const instancePromocode = axios.create({
  baseURL: 'https://api.flexyplanner.com',
});

export const checkPromocode = async promo => {
  const { data } = await instancePromocode.get(`/promo?promo=${promo}`);
  return data;
};

export const togglePromocodeStatus = async promocode => {
  const response = await instancePromocode.patch('/promo', promocode);
  return response.data;
};
