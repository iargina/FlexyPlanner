const heroWrapper = document.querySelector('.hero-wrapper');
const heroWrapperHeight = heroWrapper.offsetHeight;
const heroMarkup = `<section class="hero" id="hero__up">
  <div class="container hero-container">
    <h1 class="visually-hidden">
      Flexxy planner - організовуй своє життя у гнучкий, ефективний та
      захоплюючий спосіб.
    </h1>
    <div class="hero__main">
      <div class="hero__title">
        <a href="" class="logo-link" aria-label="link to flexxy planner">
            <img src="./icons/logo.svg" alt="flexxy planner" class="hero__logo">          
        </a>
        <div class="hero__description">
          <p>
            Організовуй своє життя у гнучкий,
            <span class="hero__accent-text">ефективний</span> та захоплюючий
            спосіб.
          </p>
        </div>
      </div>

      <!-- Slider main container -->
      <div class="hero__swiper swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="hero__swiper-slide swiper-slide">
            <picture>
              <source
                srcset="
                  ./images/hero/desk_1x_planner_red.jpg 1x,
                  ./images/hero/desk_2x_planner_red.jpg 2x
                "
                media="(min-width: 1440px)"
                type="image/jpg"
              />
              <source
                srcset="
                  ./images/hero/mob_1x_planner_red.jpg 1x,
                  ./images/hero/mob_2x_planner_red.jpg 2x
                "
                media="(min-width: 320px)"
                type="image/jpg"
              />
              <img
                src="./images/hero/mob_2x_planner_red.jpg"
                alt="flexxy planner red"
              />
            </picture>
          </div>
          <div class="hero__swiper-slide swiper-slide">
            <picture>
              <source
                srcset="
                  ./images/hero/desk_1x_planner_yellow.jpg 1x,
                  ./images/hero/desk_2x_planner_yellow.jpg 2x
                "
                media="(min-width: 1440px)"
                type="image/jpg"
              />
              <source
                srcset="
                  ./images/hero/mob_1x_planner_yellow.jpg 1x,
                  ./images/hero/mob_2x_planner_yellow.jpg 2x
                "
                media="(min-width: 320px)"
                type="image/jpg"
              />
              <img
                src="./images/hero/mob_2x_planner_yellow.jpg"
                alt="flexxy planner yellow"
              />
            </picture>
          </div>
          <div class="hero__swiper-slide swiper-slide">
            <picture>
              <source
                srcset="
                  ./images/hero/desk_1x_planner_black.jpg 1x,
                  ./images/hero/desk_2x_planner_black.jpg 2x
                "
                media="(min-width: 1440px)"
                type="image/jpg"
              />
              <source
                srcset="
                  ./images/hero/mob_1x_planner_black.jpg 1x,
                  ./images/hero/mob_2x_planner_black.jpg 2x
                "
                media="(min-width: 320px)"
                type="image/jpg"
              />
              <img
                src="./images/hero/mob_2x_planner_black.jpg"
                alt="flexxy planner yellow"
              />
            </picture>
          </div>
        </div>
        <!-- If we need pagination -->
        <ul class="hero__pagination swiper-pagination">
          <li class="bullet bullet-yellow">
            <span aria-label="flexxy planer red"></span>
          </li>
          <li class="bullet bullet-red">
            <span aria-label="flexxy planer yellow"></span>
          </li>
          <li class="bullet bullet-black">
            <span aria-label="flexxy planer black"></span>
          </li>
        </ul>
      </div>
    </div>

    <div class="hero__slider-text">
      Багатофункціональний адаптивний щоденник
    </div>
    <a href="#order" class="hero__btn" aria-label="link to order">Замовити</a>
  </div>
</section>
`;
heroWrapper.innerHTML = heroMarkup;
function centeredHero() {
  const hero = document.querySelector('.hero');
  const heroHeight = hero.offsetHeight;

  const padding = heroWrapperHeight - heroHeight;
  console.log(padding);
  if (padding > 0) {
    hero.style.paddingTop = `${padding / 2}px`;
    hero.style.paddingBottom = `${padding / 2}px`;
  }
}
centeredHero();
