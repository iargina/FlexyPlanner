import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const onPreOrderFormSubmit = () => {
  const form = document.querySelector('.modalFeedBack__form');
  const inputs = document.querySelectorAll('.modalFeedBack__input');

  form.addEventListener('submit', sendData);

  function sendData(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const nameData = formData.get('username');
    const emailData = formData.get('email');
    const commentData = formData.get('comment');
    const leadData = {
      source_id: 1,
      title: commentData,
      pipeline_id: 1,
      contact: {
        full_name: nameData,
        email: emailData,
      },
    };

    axios({
      method: 'post',
      url: 'https://flexyplanner.onrender.com/crm/leads',
      data: leadData,
    });
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
