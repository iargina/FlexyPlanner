import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

// const swiper = new Swiper('.swiper', {
//    modules: [ Navigation, Pagination ],
//  });

Swiper.use([Navigation, Pagination, Autoplay]);

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 300,
    slidesPerView: 1,
    spaceBetween: 10,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    autoplay: {
        delay: 2000,
      },
  });