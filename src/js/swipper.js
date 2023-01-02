import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  centeredSlides: true,
  autoplayDisableOnInteraction: false,
  speed: 300,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 0,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1440: {
      direction: 'vertical',
    },
  },
});
