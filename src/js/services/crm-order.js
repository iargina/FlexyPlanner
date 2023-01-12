import { order } from '../utils';
import moment from 'moment';
import { options } from './crm-lead';
import { BASE_URL, crmLead } from './crm-lead';

const contact = document.querySelector('.contacts__btn');
contact.addEventListener('click', onContactClick);

export const orderCrmData = {
  source_id: 1,
  source_uuid: moment().format('MMMM Doh YYYYmmss'),
  buyer_comment: '',
  /*   discount_percent: 0,
  discount_amount: 0, */
  ordered_at: '',
  buyer: {
    full_name: '',
    phone: '',
  },
  shipping: {},

  products: [],
  payments: [
    {
      payment_method_id: 1,
      payment_method: 'Mono',
      amount: 0,
      status: 'paid',
    },
  ],
};

export function orderCrmDataForm() {
  const products = order.orderedPlanners.filter(el => el.amount > 0);
  orderCrmData.buyer_comment = order.contactInfo.comment;
  orderCrmData.buyer = {
    full_name: order.contactInfo.username,
    phone: order.contactInfo.phone,
  };

  orderCrmData.products = products.map(el => {
    return {
      sku: el.color,
      price: el.price,
      quantity: el.amount,
      name: el.color,
    };
  });
  orderCrmData.ordered_at = moment().format('YYYY-MM-DD hh:mm:ss');
  /*   orderCrmData.shipping = order.delivery; */
  orderCrmData.payments.amount = order.total;
}
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
  /*   console.log(order); */
  options.body = JSON.stringify(leadCrmData);
  /*   crmLead(BASE_URL, { options }); */
  console.log(options.body);
}
