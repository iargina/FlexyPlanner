import axios from 'axios';
import { Notify } from 'notiflix';

const instance = axios.create({
  baseURL: 'https://api.flexyplanner.com/auth/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

const signIn = () => {
  return instance.post('', {
    email: form.elements.login.value,
    password: form.elements.password.value,
  });
};

const login = async e => {
  e.preventDefault();
  spinnerLoader.style.display = 'inline-block';
  try {
    const res = await signIn();

    const { accessToken } = res.data;
    window.sessionStorage.setItem('accessToken', accessToken);
    window.location.href = '/admin_main.html';
  } catch (err) {
    Notify.failure('Неправильний e-mail або пароль');
    form.reset();
  } finally {
    spinnerLoader.style.display = 'none';
  }
};
const spinnerLoader = document.querySelector('.spinner-border');
const form = document.querySelector('#admin-form-js');
form.addEventListener('submit', login);
