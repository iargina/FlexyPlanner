import HandyCollapse from 'handy-collapse';
import Aos from 'aos';

const featureAccordion = new HandyCollapse({
  nameSpace: 'lc',
  closeOthers: false,
  animationSpeed: 400,
  onSlideStart: (isOpen, contentID) => {
    const iconEl = document.querySelector(
      `[data-lc-control='${contentID}'] .howitworks__arrow-icon`
    );

    const labelEl = document.querySelector(
      `[data-lc-control='${contentID}'] .howitworks-item__wrapper`
    );

    const listItems = document.querySelectorAll(
      `[data-lc-control='${contentID}'] .howitworks-checkbox__list li`
    );

    const icons = document.querySelectorAll(
      `[data-lc-control='${contentID}'] .howitworks-checkbox__list .howitworks-checkbox__icon`
    );

    if (!iconEl) return;

    if (isOpen) {
      labelEl.classList.add('active');
      iconEl.classList.add('rotate');
      listItems.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('active');
          icons[idx].classList.add('active');
        }, 200 * idx);
      });
    } else {
      labelEl.classList.remove('active');
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

    if (!btnEl) return;

    if (isOpen) {
      btnEl.classList.add('opened');
    } else {
      btnEl.classList.remove('opened');
    }
  },
});

for (let i = 1; i <= 5; i += 1) {
  if (window.innerWidth < 1440 && i > 1) {
    return;
  }

  const observerRef = document.querySelector(
    `[data-observer="observer-toggle-${i}"]`
  );

  function onScrollToList([entry]) {
    if (entry.isIntersecting && !entry.target.dataset.opened) {
      entry.target.dataset.opened = 'true';
      featureAccordion.open(`feature-toggle-${i}`);
      Aos.refresh();
    }
  }

  const observer = new IntersectionObserver(onScrollToList, {
    root: null,
    rootMargin: '-100px',
    threshold: 0.3,
  });

  observer.observe(observerRef);
}
