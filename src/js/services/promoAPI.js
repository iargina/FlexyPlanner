import axios from 'axios';
const instancePromocode = axios.create({
    baseURL: 'https://flexyplanner.onrender.com/promo',   
  });
  
  export const checkPromocode = async (promo) => {
    const { data } = await instancePromocode.get(`?promo=${promo}`);
    return data;
  };