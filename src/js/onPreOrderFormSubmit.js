import { Notify } from 'notiflix/build/notiflix-notify-aio';

const onPreOrderFormSubmit = () => {
  JSON.parse(sessionStorage.getItem('feedback-form-state')) || {
    username: '',
    email: '',
    comment: '',
  };

  const form = document.querySelector('.modalFeedBack__form');
  const inputs = document.querySelectorAll('.modalFeedBack__input')

  function clearInputs () {
    inputs.forEach(input => {
        input.value = ''
    })
  }

  const {
    elements: { username, email, comment },
  } = form;

  form.addEventListener('input', () =>
    sessionStorage.setItem(
      'feedback-form-state',
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
    setTimeout(() => {
        clearInputs()
    }, 1000)
    Notify.success('Дякуємо! Ваші дані відправлені! Очікуйте повідомлення!');
    sessionStorage.removeItem('feedback-form-state');
  }
};

onPreOrderFormSubmit();
