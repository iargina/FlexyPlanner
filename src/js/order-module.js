import axios from 'axios';
import { getCurrentPriceFromCrm } from './services/order-moduleApi';
import toggleModal from './toggleModal';
// import { moduleOrder } from './utils';

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

const loadModuleBtn = document.querySelector('.load-module-btn');
const btnLoader = document.querySelector('#btnLoader');

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

      btnLoader.classList.add('loader-is-hidden');
      loadModuleBtn.innerHTML = 'Попереднє замовлення';
      //       if (loadModuleBtn) {
      //         heroContainer.insertAdjacentHTML(
      //           'beforeend',
      //           `<a href="#order" class="hero__btn load-module-btn" aria-label="link to order">
      // Попереднє замовлення
      // 				</a>`
      //         );
      //       }

      //  loadModuleBtn.innerHTML = 'Попереднє замовлення';
      // loadModuleBtn.style.cssText = 'height:64px;padding:10px 0;font-size:20px';
    } else {
      data.price = await getPriceForRenderModuleFromCrm('FP');

      const { default: getImportFile } = await import(
        `../templates/to-order.hbs`
      );
      template = getImportFile(data);

      loadModuleBtn.innerHTML = 'Замовити';
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
