const buttonsRef = document.querySelectorAll('.description__button');
const itemsRef = document.querySelectorAll('.description__item');
const hintRef = document.querySelector('.description__hint');

buttonsRef.forEach((el, idx) => {
  el.addEventListener('click', () => {
    const itemTextEl = itemsRef[idx].querySelector('.description__text');
    itemsRef[idx].classList.add('active');
    itemTextEl.classList.add('active');

    el.classList.add('hidden');

    if (hintRef.classList.contains('hidden')) return;
    hintRef.classList.add('hidden');
  });
});
