import axios from 'axios';

const logoutButton = document.querySelector('#logoutButton');
const spinnerLoader = document.querySelector('.spinner-border');

const instanceLogout = axios.create({
  baseURL: 'https://flexyplanner.onrender.com/auth/logout',
  headers: {
    Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
  },
});

const logout = async () => {
  spinnerLoader.style.display = 'inline-block';
  try {
    await instanceLogout.post('', {});
    window.location.href = '/login.html';
    window.sessionStorage.removeItem('accessToken');
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/login.html';
      window.sessionStorage.removeItem('accessToken');
    }
  } finally {
    spinnerLoader.style.display = 'none';
  }
};

logoutButton.addEventListener('click', logout);
