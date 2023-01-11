import { order } from '../utils';
import moment from 'moment';

const contact = document.querySelector('.contacts__btn');
const promo = document.querySelector('.promo__submit');
contact.addEventListener('click', onContactClick);
promo.addEventListener('click', onFinalSumBtnClick);

const crmData = {
  source_id: 1,
  buyer_comment: '',
  /*   discount_percent: 0,
  discount_amount: 0, */
  ordered_at: '',
  buyer: {
    full_name: '',
    phone: '',
  },
  shipping: { delivery_service_id: 1 },

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

function onContactClick() {
  crmData.buyer_comment = order.contactInfo.comment;
  crmData.buyer = {
    full_name: order.contactInfo.username,
    phone: order.contactInfo.phone,
  };
  const products = order.orderedPlanners.filter(el => el.amount > 0);
  crmData.products = products.map(el => {
    return {
      sku: el.color,
      price: el.price,
      quantity: el.amount,
      name: el.color,
    };
  });
  console.log(order);
}

function onFinalSumBtnClick() {
  crmData.ordered_at = moment().format('YYYY-MM-DD hh:mm:ss');
  crmData.shipping.city = order.delivery.city;
  crmData.shipping.warehouse = order.delivery.warehouse;
  crmData.payments.amount = order.total;
  console.log(JSON.stringify(crmData));
  return;
}

export const data = JSON.stringify({ ...crmData });
