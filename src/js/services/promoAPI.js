import axios from 'axios';
const instancePromocode = axios.create({
  baseURL: 'https://flexyplanner.onrender.com/promo',
  headers: {           
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`    
  }
});

export const getAllPromocodes = async () => {
  const { data } = await instancePromocode.get('/');
  return data;
};

export const postPromocodesCreate = async (promoData) => {
  const response = await instancePromocode.post('', promoData);
  return response.data;
};
export const patchPromocodeStatus = async (promocode) => {
  const response = await instancePromocode.patch('', promocode);
  return response.data;
};
export const deletePromocode = async (promocode) => {
  const response = await instancePromocode.delete('', promocode);
  return response.data;
};