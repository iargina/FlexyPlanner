import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  loopedSlides: 3,
  centeredSlides: true,
  autoplayDisableOnInteraction: false,
  speed: 1000,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    followFinger: false,
  },
  breakpoints: {
    1440: {
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
