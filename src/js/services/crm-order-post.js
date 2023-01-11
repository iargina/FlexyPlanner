const BASE_URL = 'https://openapi.keycrm.app/v1/order';
import { data } from './crm-order';

export const options = {
  method: 'POST',
  body: data,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer MDM2MDY1YmZiNmQ2ZTVkY2M0MmUzNDIzYTEwNjMwYmQ3ZWFjNmEzYQ',
    accept: 'application/json',
  },
};

const crmPost = () => {
  fetch(BASE_URL, { options })
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error));
};
