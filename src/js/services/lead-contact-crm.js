import { order } from '../utils';
import axios from 'axios';
import { Notify } from 'notiflix';
import { hideNotification } from '../helpers/hideNotification';

const contact = document.querySelector('.contacts__btn');
contact.addEventListener('click', onContactClick);

const crmPost = leadData => {
  try {
    axios({
      method: 'post',
      url: 'https://api.flexyplanner.com/crm/leads',
      data: leadData,
    });
  } catch (error) {
    Notify.failure(
      `Вибачте, щось пішло не так... Статуc помилки: ${error.message}`
    );
    setTimeout(hideNotification, 3000);
  }
};
function onContactClick() {

  const productsArr = order.orderedPlanners.filter(el => el.amount > 0);

  const leadCrmData = {
    source_id: 1,
    title: order.contactInfo.comment,
    pipeline_id: 2,
    contact: {
      full_name: order.contactInfo.username,
      phone: order.contactInfo.phone,
    },
    products: productsArr.map(el => {
      return {
        sku: el.code,
        price: el.price,
        quantity: el.amount,
        name: el.color,
      };
    }),
  };
  // console.log('leadCrmData :>> ', leadCrmData);
crmPost(leadCrmData);
}
