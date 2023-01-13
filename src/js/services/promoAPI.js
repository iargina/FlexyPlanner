import axios from 'axios';

const instancePromocode = axios.create({
  baseURL: 'https://flexyplanner.onrender.com',
  headers: {
    Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2I4NWJjNDdmMDBlYTAwMzRjNGQ1ZGUiLCJzaWQiOiI2M2MxYTcwNzUyN2U4MDAwMzUzZDFkZDQiLCJpYXQiOjE2NzM2MzU1OTEsImV4cCI6MTY3MzYzOTE5MX0.ywcIngjxREx_yyN7GFjN3eUiPwbCRTeOFJNxFeRykSg`,
  },
});

export const getAllPromocodes = async () => {
  const { data } = await instancePromocode.get('/promo/');
  return data;
};

export const postPromocodesCreate = async promoData => {
  const response = await instancePromocode.post('/promo', promoData);
  return response.data;
};
export const patchPromocodeStatus = async promocode => {
  const response = await instancePromocode.patch('/promo', promocode);
  return response.data;
};
export const deletePromocode = async promocode => {
  const response = await instancePromocode.delete('/promo', promocode);
  return response.data;
};
