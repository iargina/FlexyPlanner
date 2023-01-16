import { Notify } from 'notiflix';

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

export const crmLead = option => {
  try {
    fetch(BASE_URL, option).then(response => response.json());
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
  }
};
