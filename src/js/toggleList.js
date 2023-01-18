import HandyCollapse from 'handy-collapse';
import Aos from 'aos';

const observerRef = document.querySelector('#observer');

const observer = new IntersectionObserver(onScrollToList, {
  root: null,
  rootMargin: '-100px',
  threshold: 1.0,
});

observer.observe(observerRef);

function onScrollToList([entry]) {
  if (entry.isIntersecting) {
    featureAccordion.open('feature-toggle-one');
    Aos.refresh();
  }
}

const featureAccordion = new HandyCollapse({
  nameSpace: 'lc',
  closeOthers: false,
  animationSpeed: 400,
  onSlideStart: (isOpen, contentID) => {
    observer.unobserve(observerRef);

    const iconEl = document.querySelector(
      `[data-lc-control='${contentID}'] .howitworks__arrow-icon`
    );

    const listItems = document.querySelectorAll(
      `[data-lc-control='${contentID}'] .howitworks-checkbox__list li`
    );

    const icons = document.querySelectorAll(
      `[data-lc-control='${contentID}'] .howitworks-checkbox__list .howitworks-checkbox__icon`
    );

    const label = document.querySelector(
      `[data-lc-control='${contentID}'] .howitworks-item__wrapper`
    );

    if (!iconEl) return;

    if (isOpen) {
      label.classList.add('active');
      iconEl.classList.add('rotate');
      listItems.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('active');
        }, 200 * idx);
      });
      icons.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('active');
        }, 200 * idx);
      });
    } else {
      label.classList.remove('active');
      iconEl.classList.remove('rotate');
      listItems.forEach(el => el.classList.remove('active'));
      icons.forEach(el => el.classList.remove('active'));
    }
  },
});

const qaAccordion = new HandyCollapse({
  nameSpace: 'hc',
  closeOthers: false,
  onSlideStart: (isOpen, contentID) => {
    const btnEl = document.querySelector(
      `[data-hc-control='${contentID}'] .qa__btn`
    );
    console.log(btnEl);
    if (!btnEl) return;
    if (isOpen) {
      btnEl.classList.add('opened');
    } else {
      btnEl.classList.remove('opened');
    }
  },
});
