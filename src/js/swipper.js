import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  freeMode: true,
//   freeModeMomentum: false,
  loopedSlides: 3,
  centeredSlides: true,
  autoplayDisableOnInteraction: false,
  speed: 4000,
  slidesPerView: 1,  
  initialSlide: 0,  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320:{
        spaceBetween: -40, 
    },
    350:{
        spaceBetween: -50, 
    },
    360:{
        spaceBetween: -80, 
    },
    1440: {
        slidesPerView: 1,
      direction: 'vertical',
      spaceBetween: 0, 
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
