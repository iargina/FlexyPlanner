import SwiperDetailed, { Autoplay, Pagination } from 'swiper';

SwiperDetailed.use([Autoplay, Pagination])

const swiperDetailed = new SwiperDetailed('.swiper-detailed__swiper', {
    direction: 'horizontal',
    spaceBetween: 280,
    autoHeight: true,
    setWrapperSize: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      followFinger: false,
    },
    speed: 1000,
    grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      },
  });
