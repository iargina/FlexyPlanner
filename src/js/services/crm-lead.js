export const BASE_URL = 'https://openapi.keycrm.app/v1/leads';

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

export const crmLead = (url, option) => {
  fetch(url, option)
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error));
};
