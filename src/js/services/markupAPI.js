import axios from 'axios';

const instanceMarkup = axios.create({
  baseURL: 'https://flexyplanner.onrender.com/markup',
});

export const getMarkup = async () => {
  const { data } = await instanceMarkup.get('');
  return data;
};

export const toggleActiveOrderModule = async () => {
  const { data } = await instanceMarkup.patch('');
  return data;
};

export const setCurrentPrice = async obj => {
  const { data } = await instanceMarkup.put('', obj);
  return data;
};
