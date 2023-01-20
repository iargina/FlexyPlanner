const btnRef = document.querySelector('.description__button');
const itemsRef = document.querySelectorAll('.description__item');
const btnTextRef = document.querySelector('.btn-text');
const btnWrapperRef = document.querySelector('.btn-wrapper');

let clicks = 0;

btnRef.addEventListener('click', onBtnClick);

function onBtnClick() {
  itemsRef[clicks].classList.add('active');

  const itemTextEl = itemsRef[clicks].querySelector('.description__text');

  btnTextRef.classList.add('fade');
  itemTextEl.classList.add('active');

  setTimeout(() => {
    btnTextRef.classList.remove('fade');
  }, 200);

  clicks += 1;

  setTimeout(() => {
    switch (clicks) {
      case 1:
        btnTextRef.textContent = 'А ще раз?';
        break;
      case 2:
        btnTextRef.textContent = 'Продовжуй!';
        break;
      case 3:
        btnTextRef.textContent = 'А в тебе виходить!';
        break;
      case 4:
        btnTextRef.textContent = 'Наступна фіча!';
        break;
      case 5:
        btnTextRef.textContent = 'Клікай!';
        break;
      case 6:
        btnTextRef.textContent = 'Ми вже на фініші!';
        break;
      case 7:
        btnTextRef.textContent = 'Залишився останній!';
        break;
      default:
        return;
    }
  }, 200);

  if (clicks === 8) {
    btnWrapperRef.classList.add('hidden');
  }
}
