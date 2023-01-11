import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { options } from './services/crm-lead';
/* import { BASE_URL, crmLear } from './services/crm-lead'; */

const onPreOrderFormSubmit = () => {
  const form = document.querySelector('.modalFeedBack__form');
  const inputs = document.querySelectorAll('.modalFeedBack__input');

  form.addEventListener('submit', sendData);

  function sendData(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const nameData = formData.get('username');
    const emailData = formData.get('email');
    const data = {
      contact: { full_name: nameData, email: emailData },
    };

    options.body = JSON.stringify(data);
    console.log(options.body);
    /*     crmLear(BASE_URL, { options }); */
    clearInputs();
    Notify.success('Дякуємо! Ваші дані відправлені! Очікуйте повідомлення!');
  }

  function clearInputs() {
    inputs.forEach(input => {
      input.value = '';
    });
  }
};

onPreOrderFormSubmit();
