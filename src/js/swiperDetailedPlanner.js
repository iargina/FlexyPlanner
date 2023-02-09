import SwiperDetailed, { Autoplay, Pagination } from 'swiper';

  const swiperDetailed = new SwiperDetailed('.swiper-detailed__swiper', {
    direction: 'horizontal',
    spaceBetween: 280,
    autoHeight: true,
    setWrapperSize: true,
    autoplay: {
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

  swiperDetailed.autoplay.stop()

const swiperOptions = {
	rootMargin: '-100px',
};
 
const swiperTarget = document.querySelector( '.swiper-detailed__swiper' );

const trueCallback = function(entries) {
	entries.forEach((entry) => {
    const { isIntersecting } = entry;
    if (isIntersecting) {
      swiperDetailed.autoplay.start()
    } else {
      swiperDetailed.autoplay.stop()
    }
	});
}
const swiperObserver = new IntersectionObserver( trueCallback, swiperOptions );
swiperObserver.observe( swiperTarget );
