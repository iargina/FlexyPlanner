import { btnLoader } from './btnLoader';

const getButton = () => {
  return `
<div class="footer-btn-wrapper">
  <a href="./order.html" class="btn btn--primary footer__button" disabled>
			${btnLoader}
  </a></div>`;
};

const footerSection = document.querySelector('.footer__section');

footerSection.insertAdjacentHTML('beforeend', getButton());
