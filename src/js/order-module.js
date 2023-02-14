import axios from 'axios';
import { getCurrentPriceFromCrm } from './services/order-moduleApi';
import toggleModal from './toggleModal';
// import { moduleOrder } from './utils';

const btnLoader = document.querySelector('.btnLoader');

const showBtnText = (textHero, textFooter) => {
  const heroLoadModuleBtn = document.querySelector('.load-module-btn');
  const footerLoadModuleBtn = document.querySelector('.footer__button');
  btnLoader.classList.add('loader-is-hidden');
  footerLoadModuleBtn.classList.remove('disable-link');
  heroLoadModuleBtn.innerHTML = textHero;
  footerLoadModuleBtn.innerHTML = textFooter;
};

const onOrderModule = async () => {
  try {
    const { data } = await axios.get(
      'https://flexyplanner.onrender.com/markup'
    ); // тут приходять дані по активному модулю
    loadModule(data); //Створення відповідної розмітки

    // moduleOrder.setTypeModule(data.type);

    //TODO: викликати метод класу для передачі даних з ціною/активним модулем на сторінку замовлення.
  } catch (error) {
    console.log('something went wrong');
  }
};

const getPriceFromCrm = async () => {
  try {
    const orderPriceArray = await getCurrentPriceFromCrm();
    return orderPriceArray;
  } catch (error) {
    Notify.failure(error.message);
  }
};

const getPriceForRenderModuleFromCrm = async typeOfModule => {
  try {
    const orderPriceArray = await getPriceFromCrm();
    const priceArr = orderPriceArray.filter(item =>
      item.sku.startsWith(typeOfModule)
    );
    return Math.max(...priceArr.map(item => item.price));
  } catch (error) {
    Notify.failure(error.message);
  }
};

const loadModule = async ({ type, data }) => {
  btnLoader.classList.remove('loader-is-hidden');
  try {
    let template;
    if (type === 'pre-order') {
      data.preOrderPrice = await getPriceForRenderModuleFromCrm('PO');

      const { default: getImportFile } = await import(
        `../templates/pre-order.hbs`
      );
      template = getImportFile(data);

      showBtnText('Попереднє замовлення', 'Попереднє замовлення Flexy Planner');
    } else {
      data.price = await getPriceForRenderModuleFromCrm('FP');

      const { default: getImportFile } = await import(
        `../templates/to-order.hbs`
      );
      template = getImportFile(data);

      showBtnText('Замовити', 'Замовити Flexy Planner');
    }
    getOrderSection(template);
  } catch (error) {
    console.log(error);
  } finally {
    toggleModal(
      '.pre-order__btn--feedback',
      '.modalFeedBack__icon',
      '.modalFeedBack'
    );
  }
};

const getOrderSection = template => {
  const orderSection = document.querySelector('#order');
  orderSection.innerHTML = template;
};

onOrderModule();
