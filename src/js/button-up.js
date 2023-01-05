const btnToUp = document.querySelector('.button-up__wrapper');

let scroll;
window.onscroll = function () {
  scrolled = window.pageYOffset;
  btnToUp.classList.add('is-hidden');
  if (scrolled > 900) {
    btnToUp.classList.remove('is-hidden');
  }
};
