import { order } from '../utils';
import moment from 'moment';

export const orderCrmData = {
  source_id: 1,
  source_uuid: moment().format('YYMM DDhhmm ssSSS'),
  promocode: '',
  buyer_comment: '',
  discount_percent: 0,
  /*   discount_amount: 0, */
  ordered_at: '',
  buyer: {
    full_name: '',
    phone: '',
  },
  shipping: {
    delivery_service_id: 1,
    shipping_address_city: '', // Kyiv
    shipping_address_region: '', // Kyivska
    shipping_secondary_line: 'string',
    shipping_receive_point: '', // Склад #12
    recipient_full_name: '', // Bart Simpson
    recipient_phone: '', // +380671234567
    warehouse_ref: '', // 1ec09d2e-e1c2-11e3-8c4a-0050568002cf
  },

  products: [],
  payments: [
    {
      payment_method_id: 1,
      payment_method: 'Monobank',
      amount: 0,
      description: 'Оплата замовлення',
      status: 'paid',
    },
  ],
};

export function orderCrmDataForm() {
  orderCrmData.ordered_at = moment().format('YYYY-MM-DD hh:mm:ss');
  orderCrmData.buyer_comment = order.contactInfo.comment;
  orderCrmData.buyer = {
    full_name: order.contactInfo.username,
    phone: order.contactInfo.phone,
  };

  orderCrmData.promocode = order.promocode;
  orderCrmData.discount_percent = order.discountPercentage;

  const products = order.orderedPlanners.filter(el => el.amount > 0);
  orderCrmData.products = products.map(el => {
    return {
      sku: el.color,
      price: el.price,
      quantity: el.amount,
      name: el.color,
    };
  });
  orderCrmData.shipping = { delivery_service_id: 1, ...order.delivery };
  /*   orderCrmData.shipping = order.delivery; */
  orderCrmData.payments.amount = order.total;
}
