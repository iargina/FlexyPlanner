const refs = {
  promoForm: document.querySelector('.promo__form'),
  btnToggle: document.querySelector('.promo__toggle'),
  inputContainer: document.querySelector('.promo__hide'),
  inputEl: document.querySelector('.promo__input'),
  submitBtn: document.querySelector('.promo__submit'),
  successContainer: document.querySelector('.promo__success'),
  discount: document.querySelector('.promo__discount'),
  errorIcon: document.querySelector('.promocode__icon')
};

refs.btnToggle.addEventListener('click', onBtnToggle);
refs.promoForm.addEventListener('submit', onFormSubmit);

function onBtnToggle(e) {
  if (refs.inputContainer.classList.contains('visually-hidden')) {
    refs.promoForm.classList.add('complite-form');
    refs.btnToggle.innerText = 'Закрити';
    refs.inputContainer.classList.remove('visually-hidden');
  } else {
    refs.promoForm.classList.remove('complite-form');
    refs.btnToggle.innerText = 'Відкрити';
    refs.inputContainer.classList.add('visually-hidden');
  }
}
function onFormSubmit(e) {
  e.preventDefault();
  const promoFromInput = e.target.elements.promo.value;
  const randomRequest = random();
  console.log(randomRequest);
  if(randomRequest){
    refs.successContainer.classList.remove('visually-hidden');
    const discount = randomDiscount();
    sessionStorage.setItem('discount', String(discount));
    refs.discount.innerText = `${discount} грн`;
    refs.promoForm.reset();
  } else {
    refs.errorIcon.classList.remove('visually-hidden');
  }
}
function random(){  
  return Math.random() < 0.5;
}
function randomDiscount() {
  return Math.floor(Math.random() * (500 - 100) + 100);
}