import axios from 'axios';

const instancePromocode = axios.create({
  baseURL: 'https://flexyplanner.onrender.com',
  headers: {
    Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2I4NWJjNDdmMDBlYTAwMzRjNGQ1ZGUiLCJzaWQiOiI2M2MxY2Y5YTEyNmYzNDAwMzQzMTdhZWQiLCJpYXQiOjE2NzM2NDU5NzksImV4cCI6MTY3MzY0OTU3OX0.n4Mx9rkeSBK1z7cC6EjvhwWpZzE8jhH4g63CyGaQLCs`,
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
