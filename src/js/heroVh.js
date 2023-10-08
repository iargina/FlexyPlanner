import logo from '../icons/logo.svg';
import mobBlack1 from '../images/hero/mob/FP_black.jpg';
import mobRed1 from '../images/hero/mob/FP_red.jpg';
import mobYellow1 from '../images/hero/mob/FP_yellow.jpg';
import mobBlue1 from '../images/hero/mob/FP_blue.jpg';
import mobBrown1 from '../images/hero/mob/FP_brown.jpg';


import deskBlack1 from '../images/hero/desk_1x_planner_black.jpg';
import deskRed1 from '../images/hero/desk_1x_planner_red.jpg';
import deskYellow1 from '../images/hero/desk_1x_planner_yellow.jpg';
import deskBlue1 from '../images/hero/desk_1x_planner_blue.jpg';
import deskBrown1 from '../images/hero/desk_1x_planner_brown.jpg';

import deskBlack2 from '../images/hero/desk_2x_planner_black.jpg';
import deskRed2 from '../images/hero/desk_2x_planner_red.jpg';
import deskYellow2 from '../images/hero/desk_2x_planner_yellow.jpg';
import deskBlue2 from '../images/hero/desk_2x_planner_blue.jpg';
import deskBrown2 from '../images/hero/desk_2x_planner_brown.jpg';


import { btnLoader } from './btnLoader';

const getButton = () => {
  return `<a href="./order.html" class="hero__btn load-module-btn" disabled aria-label="link to order">
  ${btnLoader}
</a>`;
};

const heroWrapper = document.querySelector('.hero-wrapper');
const heroWrapperHeight = heroWrapper.offsetHeight;
const heroMarkup = `<section class="hero" id="hero__up">
  <div class="container hero-container">
    <h1 class="visually-hidden">
      Flexy planner - організовуй своє життя у гнучкий, ефективний та
      захоплюючий спосіб.
    </h1>
    <div class="hero__main">
      <div class="hero__title">
        <a href="" class="logo-link" aria-label="link to flexy planner">
            <img src=${logo} alt="flexxy planner" class="hero__logo">          
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
                srcset="${deskRed1} 1x, ${deskRed2} 2x"
                media="(min-width: 751px)"
                type="image/jpg"
              />
              <source
                srcset="${mobRed1}"
                media="(min-width: 320px)"
                type="image/jpg"
              />
              <img
                src="${mobRed1}"
                alt="flexxy planner red"
              />
            </picture>
          </div>
          <div class="hero__swiper-slide swiper-slide">
            <picture>
              <source
                srcset="${deskYellow1} 1x, ${deskYellow2} 2x"
                media="(min-width: 751px)"
                type="image/jpg"
              />
              <source
                srcset="${mobYellow1}"
                media="(min-width: 320px)"
                type="image/jpg"
              />
              <img
                src="${mobYellow1}"
                alt="flexxy planner yellow"
              />
            </picture>
          </div>
          <div class="hero__swiper-slide swiper-slide">
            <picture>
              <source
                srcset="${deskBlack1} 1x, ${deskBlack2} 2x"
                media="(min-width: 751px)"
                type="image/jpg"
              />
              <source
                srcset="${mobBlack1}"
                media="(min-width: 320px)"
                type="image/jpg"
              />
              <img
                src="${mobBlack1}"
                alt="flexxy planner yellow"
              />
            </picture>
          </div>
          <div class="hero__swiper-slide swiper-slide">
          <picture>
            <source
              srcset="${deskBlue1} 1x, ${deskBlue2} 2x"
              media="(min-width: 751px)"
              type="image/jpg"
            />
            <source
              srcset="${mobBlue1}"
              media="(min-width: 320px)"
              type="image/jpg"
            />
            <img
              src="${mobBlue1}"
              alt="flexxy planner red"
            />
          </picture>
        </div>
        <div class="hero__swiper-slide swiper-slide">
        <picture>
          <source
            srcset="${deskBrown1} 1x, ${deskBrown2} 2x"
            media="(min-width: 751px)"
            type="image/jpg"
          />
          <source
            srcset="${mobBrown1}"
            media="(min-width: 320px)"
            type="image/jpg"
          />
          <img
            src="${mobBrown1}"
            alt="flexxy planner red"
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
          <li class="bullet bullet-blue">
          <span aria-label="flexxy planer blue"></span>
        </li>
        <li class="bullet bullet-brown">
        <span aria-label="flexxy planer brown"></span>
      </li>
        </ul>
      </div>
    </div>
    <div class="hero__slider-text">
      Багатофункціональний адаптивний щоденник
    </div>
    ${getButton()}

  </div>
</section>
`;
heroWrapper.innerHTML = heroMarkup;

function calcP() {
  const containerH = document.querySelector('.hero-container').clientHeight;
  const screenH = window.screen.height;
  const viewPortH = window.innerHeight;
  const pannelH = screenH - viewPortH;
  const p = (screenH - containerH) / 2;
  return {
    pT: p - pannelH / 2,
    pB: p + pannelH / 2,
  };
}

function centeredHero() {
  const hero = document.querySelector('.hero');
  const heroHeight = hero.offsetHeight;

  const padding = heroWrapperHeight - heroHeight;

  if (padding > 0) {
    const { pB, pT } = calcP();
    hero.style.paddingTop = `${pT}px`;
    hero.style.paddingBottom = `${pB}px`;
  }
}
centeredHero();
