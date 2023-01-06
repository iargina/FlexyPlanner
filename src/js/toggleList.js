import HandyCollapse from 'handy-collapse';

const featureAccordion = new HandyCollapse({
  nameSpace: 'lc',
  closeOthers: false,
  animationSpeed: 300,
  onSlideStart: (isOpen, contentID) => {
    const iconEl = document.querySelector(
      `[data-lc-control='${contentID}'] .howitworks__arrow-icon`
    );

    const listItems = document.querySelectorAll(
      `[data-lc-control='${contentID}'] .howitworks-checkbox__list li`
    );

    if (!iconEl) return;

    if (isOpen) {
      iconEl.classList.add('rotate');
      listItems.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('active');
        }, 200 * idx);
      });
    } else {
      iconEl.classList.remove('rotate');
      listItems.forEach(el => el.classList.remove('active'));
    }
  },
});

const qaAccordion = new HandyCollapse({
  nameSpace: 'hc',
  closeOthers: false,
  onSlideStart: (isOpen, contentID) => {
    const btnEl = document.querySelector(`[data-hc-control='${contentID}']`);
    if (!btnEl) return;
    if (isOpen) {
      btnEl.classList.add('half-rotate');
    } else {
      btnEl.classList.remove('half-rotate');
    }
  },
});
