const button = document.querySelector('.chatButton');
const social = document.querySelectorAll('.social-button');

function onClick() {
  button.classList.toggle('open');
  social.forEach(function (el) {
    el.classList.toggle('active');
  });
}
button.addEventListener('click', onClick);
