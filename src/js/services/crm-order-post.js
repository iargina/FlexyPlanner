import { Notify } from 'notiflix';
import { hideNotification } from '../helpers/hideNotification';
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
  try {
    fetch(BASE_URL, options).then(response => response.json());
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
};
