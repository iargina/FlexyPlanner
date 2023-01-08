import { Notify } from 'notiflix/build/notiflix-notify-aio';

const onPreOrderFormSubmit = () => {
  JSON.parse(sessionStorage.getItem('user-info')) || {
    username: '',
    email: '',
    comment: '',
  };

  const form = document.querySelector('.modalFeedBack__form');
  const inputs = document.querySelectorAll('.modalFeedBack__input');

  const {
    elements: { username, email, comment },
  } = form;

  form.addEventListener('input', () =>
    sessionStorage.setItem(
      'user-info',
      JSON.stringify({
        username: username.value,
        email: email.value,
        comment: comment.value,
      })
    )
  );
  form.addEventListener('submit', sendData);

  function sendData(e) {
    e.preventDefault();

    const state = {
      username: username.value,
      email: email.value,
      comment: comment.value,
    };

    console.log(state);
    clearInputs();
    Notify.success('Дякуємо! Ваші дані відправлені! Очікуйте повідомлення!');
    sessionStorage.removeItem('user-info');
  }

  function clearInputs() {
    inputs.forEach(input => {
      input.value = '';
    });
  }
};

onPreOrderFormSubmit();
