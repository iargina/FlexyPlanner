import { btnLoader } from './btnLoader';

const getButton = () => {
  return `

  <a href="#order" class="btn btn--primary footer__button">
			${btnLoader}
  </a>`;
};

const footerSection = document.querySelector('.footer__section');

footerSection.insertAdjacentHTML('beforeend', getButton());
