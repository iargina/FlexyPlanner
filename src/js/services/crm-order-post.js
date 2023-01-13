const BASE_URL = 'https://openapi.keycrm.app/v1/order';

export const options = {
  method: 'POST',
  body: '',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer MDM2MDY1YmZiNmQ2ZTVkY2M0MmUzNDIzYTEwNjMwYmQ3ZWFjNmEzYQ',
    accept: 'application/json',
  },
};

export const crmPost = options => {
  fetch(BASE_URL, options)
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error));
};
