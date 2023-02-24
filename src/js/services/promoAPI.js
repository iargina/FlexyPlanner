import axios from 'axios';
const instancePromocode = axios.create({
  baseURL: 'https://api.flexyplanner.com/promo',
});

export const checkPromocode = async promo => {
  const { data } = await instancePromocode.get(`?promo=${promo}`);
  return data;
};
