import axios from 'axios';
const instancePromocode = axios.create({
  baseURL: 'https://api.flexyplanner.com',
});

export const checkPromocode = async promo => {
  const { data } = await instancePromocode.get(`/promo?promo=${promo}`);
  console.log(data);
  return data;
};
export const deletePromocode = async promocode => {
  const response = await instancePromocode.delete('/promo', promocode);
  return response.data;
};
