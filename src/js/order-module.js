import axios from 'axios';
import toggleModal from './toggleModal';

const onOrderModule = async () => {
  try {
    const { data } = await axios.get(
      'https://flexyplanner.onrender.com/markup'
    ); // тут приходять дані по активному модулю
    loadModule(data); //Створення відповідної розмітки

    //TODO: викликати метод класу для передачі даних з ціною/активним модулем на сторінку замовлення.
  } catch (error) {
    console.log('something went wrong');
  }
};

const loadModule = async ({ type, data }) => {
  try {
    let template;
    if (type === 'pre-order') {
      const { default: getImportFile } = await import(
        `../templates/pre-order.hbs`
      );
      template = getImportFile(data);
    } else {
      const { default: getImportFile } = await import(
        `../templates/to-order.hbs`
      );
      template = getImportFile(data);
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
