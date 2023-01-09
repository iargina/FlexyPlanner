const btnToTop = document.querySelector('.button-up__wrapper');
let lastScroll = 0;

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const containIsHidden = () => btnToTop.classList.contains('is-hidden');

window.addEventListener('scroll', () => {
  if (scrollPosition() > lastScroll && !containIsHidden()) {
    btnToTop.classList.add('is-hidden');
  } else if (scrollPosition() < lastScroll && containIsHidden()) {
    btnToTop.classList.remove('is-hidden');
  }

  lastScroll = scrollPosition();
});
