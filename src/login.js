import axios from 'axios';

const instance = axios.create({
  baseURL: 'строка подключения к базе данных', // дописати адресу
  params: {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
    body: new FormData(form),
  },
});

const login = async e => {
  e.preventDefault();

  try {
    const { data } = await instance.post('', {
      params: { q: searchQuery, page },
    });
    const token = data.token;
    localStorage.setItem('accessToken', token);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    // window.location.href = './main.html';
  } catch (error) {
    console.log(error);
    // return error.message;
  }

  instance.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Get token from LS');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  //  form.removeEventListener('submit', handleSubmit);
};

const form = document.querySelector('#admin-form-js');
form.addEventListener('submit', login);

// // This code sets authorization headers for all requests:
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
//   'access_token'
// )}`;

// export const getToken = () =>
//   localStorage.getItem('accessToken')
//     ? JSON.parse(localStorage.getItem('accessToken'))
//     : null;

// export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

// export const fetchSomething = async () => {
//   try {
//     const response = await axiosInstance.get("/foo", {
//       headers: { Authorization: getAuthorizationHeader() }
//     });

//     return response;

//   } catch (error) {
//     // error handling
//   }
// };
