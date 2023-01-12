import axios from 'axios';
import { Notify } from 'notiflix';

const instance = axios.create({
  baseURL: 'https://flexyplanner.onrender.com/auth/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

function signin() {
  return instance.post('', {
    email: form.elements.login.value,
    password: form.elements.password.value,
  });
}

async function login(e) {
  e.preventDefault();
  try {
    const res = await signin();

    const { accessToken } = res.data;
    window.sessionStorage.setItem('accessToken', accessToken);
    window.location.href = '/admin_main.html';
  } catch (err) {
    Notify.failure('Неправильний e-mail або пароль');
    form.reset();
  }
}

const form = document.querySelector('#admin-form-js');
form.addEventListener('submit', login);