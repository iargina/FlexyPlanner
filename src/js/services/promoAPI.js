import axios from 'axios';

const instancePromocode = axios.create({
  baseURL: 'https://flexyplanner.onrender.com',
  headers: {           
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2I4NWJjNDdmMDBlYTAwMzRjNGQ1ZGUiLCJzaWQiOiI2M2JmNGMyYzA5Yzc4MzAwMzU0ZTE3YzkiLCJpYXQiOjE2NzM0ODEyNjAsImV4cCI6MTY3MzQ4NDg2MH0.NztePVGsF9gPUWrMpmV7z37HlMatCM80K8NduBfTIK0`    
  }
});

(async () => { const res = await axios.post('https://flexyplanner.onrender.com/auth/login', {
    "email": "user@example.com",
    "password": "qwerty123"
  });

    const { accessToken, refreshToken } = res.data;
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);})()

function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem('accessToken');
    return accessToken;
  }
  
  function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem('refreshToken');
    return refreshToken;
  }
  
//   const instancePromoLogin = axios.create({
//     baseURL: 'https://flexyplanner.onrender.com/auth/login',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
  
// instancePromocode.interceptors.request.use(
//     config => {
//       console.log(config);
//       const token = getLocalAccessToken();
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );
  
  
//   function refreshToken() {
//     return instancePromocode.post('https://flexyplanner.onrender.com/auth/refresh', {
//       sid: getLocalRefreshToken(),
//     });
//   }
  
//   instancePromocode.interceptors.response.use(
//     res => {
//       console.log(res);
  
//       return res;
//     },
//     async err => {
//       const originalConfig = err.config;
  
//       if (err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;
  
//           try {
//             const rs = await refreshToken();
//             const { accessToken } = rs.data;
//             window.localStorage.setItem('accessToken', accessToken);
//             instancePromocode.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
//             return instance(originalConfig);
//           } catch (_error) {
//             if (_error.response && _error.response.data) {
//               return Promise.reject(_error.response.data);
//             }
  
//             return Promise.reject(_error);
//           }
//         }
  
//         if (err.response.status === 403 && err.response.data) {
//           return Promise.reject(err.response.data);
//         }
//       }
  
//       return Promise.reject(err);
//     }
//   );


export const getAllPromocodes = async () => {
  const { data } = await instancePromocode.get('/promo/');
  return data;
};

export const postPromocodesCreate = async (promoData) => {
  const response = await instancePromocode.post('/promo', promoData);
  return response.data;
};
export const patchPromocodeStatus = async (promocode) => {
  const response = await instancePromocode.patch('/promo', promocode);
  return response.data;
};
export const deletePromocode = async (promocode) => {
  const response = await instancePromocode.delete('/promo', promocode);
  return response.data;
};

