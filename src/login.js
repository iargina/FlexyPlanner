import axios from 'axios';
import { Notify } from 'notiflix';

// function getLocalAccessToken() {
//   const accessToken = window.localStorage.getItem('accessToken');
//   return accessToken;
// }

// function getLocalRefreshToken() {
//   const refreshToken = window.localStorage.getItem('refreshToken');
//   return refreshToken;
// }

const instance = axios.create({
  baseURL: 'https://flexyplanner.onrender.com/auth/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use(
//   config => {
//     console.log(config);
//     const token = window.localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['x-access-token'] = token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// function refreshToken() {
//   return instance.post('https://flexyplanner.onrender.com/auth/refresh', {
//     sid: getLocalRefreshToken(),
//   });
// }

// instance.interceptors.response.use(
//   res => {
//     console.log(res);

//     return res;
//   },
//   async err => {
//     const originalConfig = err.config;

//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await refreshToken();
//           const { accessToken } = rs.data;
//           window.localStorage.setItem('accessToken', accessToken);
//           instance.defaults.headers.common['x-access-token'] = accessToken;

//           return instance(originalConfig);
//         } catch (_error) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }

//           return Promise.reject(_error);
//         }
//       }

//       if (err.response.status === 403 && err.response.data) {
//         return Promise.reject(err.response.data);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

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

    const { accessToken, refreshToken } = res.data;
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);

    window.location.href = '/admin_main.html';
  } catch (err) {
    Notify.failure('Неправильний e-mail або пароль');
    form.reset();
  }
}

const form = document.querySelector('#admin-form-js');
form.addEventListener('submit', login);
