import { order } from '../utils';
import { crmLead, options } from './crm-lead-post';

const contact = document.querySelector('.contacts__btn');
contact.addEventListener('click', onContactClick);

function onContactClick() {
  const productsArr = order.orderedPlanners.filter(el => el.amount > 0);

  const leadCrmData = {
    title: order.contactInfo.comment,
    pipeline_id: 2,
    contact: {
      full_name: order.contactInfo.username,
      phone: order.contactInfo.phone,
    },
    products: productsArr.map(el => {
      return {
        sku: el.color,
        price: el.price,
        quantity: el.amount,
        name: el.color,
      };
    }),
  };
  options.body = JSON.stringify(leadCrmData);
  /*   crmLead(options); */
  console.log(options.body);
}
