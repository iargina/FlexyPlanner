import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  loopedSlides: 3,
  centeredSlides: true,
  autoplayDisableOnInteraction: false,
  speed: 300,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 10,
autoHeight: true,
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
    1439: {
      direction: 'vertical',
    },
  },
  ally: {
    enable: true,
    prevSlideMessage: 'Попередній слайд',
    nextSlideMessage: 'Наступний слайд',
    firstSlideMessage: 'Це перший слайд з червоним планером',
    lastSlideMessage: 'Це останній слайд з чорним планером',
  },
});
