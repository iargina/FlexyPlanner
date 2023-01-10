import axios from 'axios';
const instancePromocode = axios.create({
  baseURL: 'https://flexyplanner.onrender.com/promo',
  headers: {           
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2I4NWJjNDdmMDBlYTAwMzRjNGQ1ZGUiLCJzaWQiOiI2M2JkNDNmYWJlMmFmMDAwMzQzZDgxZTMiLCJpYXQiOjE2NzMzNDgwOTAsImV4cCI6MTY3MzM1MTY5MH0.YHt0Cgfh3YqRPeiGGLgXMUk0d950NWvC_owMoYzm9Q4'    
  }
});
const createConfigFromLocal = () => {
  return { headers: {           
    'Authorization': localStorage.getItem('Authorization')    
  }}
}
export const getAllPromocodes = async () => {
  const { data } = await instancePromocode.get('/');
  return data;
};
export const checkPromocode = async (query) => {
  const { data } = await instancePromocode.get(`/${query}`);
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