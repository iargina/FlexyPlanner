import Swiper, { Autoplay, Scrollbar} from 'swiper';

Swiper.use([Autoplay, Scrollbar])

const swiper = new Swiper('.swiper-detailed__swiper', {
    direction: 'horizontal',
    spaceBetween: 10,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      followFinger: false,
      /* pauseOnMouseEnter: true, */
    },
    speed: 1000,
    grabCursor: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        breakpoints: {
          1440: {
            dragSize: 80,
          },
        },
      },
  });