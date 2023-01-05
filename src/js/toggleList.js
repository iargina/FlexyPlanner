export const toggleList = (itemsTrigger, listsToShow, icons) => {
  const items = document.querySelectorAll(itemsTrigger);
  const checkBoxList = document.querySelectorAll(listsToShow);
  const arrowIcons = document.querySelectorAll(icons);

function onShowOrHideElems () {
    if (window.innerWidth >= 1440) {
        checkBoxList[0].classList.remove('visually-hidden');
    
        if (items[0].classList.contains('qa__btn')) {
          items[0].classList.add('active-btn');
        }
    
        if (arrowIcons[0].classList.contains('howitworks__arrow-icon')) {
          arrowIcons[0].classList.add('rotate');
        } else {
          arrowIcons[0].classList.add('half-rotate');
        }
      } else {
        checkBoxList[0].classList.add('visually-hidden');
    
        if (arrowIcons[0].classList.contains('howitworks__arrow-icon')) {
          arrowIcons[0].classList.remove('rotate');
        } else {
          arrowIcons[0].classList.remove('half-rotate');
        }
        if (items[0].classList.contains('qa__btn')) {
          items[0].classList.remove('active-btn');
        }
      }
}

  items.forEach((item, i) => {
    item.addEventListener('click', function () {
      if (this) {
        checkBoxList[i].classList.toggle('visually-hidden');
        this.classList.toggle('active-btn');
        if (arrowIcons[i].classList.contains('howitworks__arrow-icon')) {
          arrowIcons[i].classList.toggle('rotate');
        } else {
          arrowIcons[i].classList.toggle('half-rotate');
        }
      }
    });
  });
  onShowOrHideElems()
  window.addEventListener('resize', onShowOrHideElems)
};


toggleList(
  '.howitworks__item',
  '.howitworks-checkbox__list',
  '.howitworks__arrow-icon'
);
toggleList('.qa__btn', '.qa-item__text', '.qa__icon');
