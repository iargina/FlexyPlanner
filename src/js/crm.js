const BASE_URL = 'https://openapi.keycrm.app/v1/order';
const data = {
  source_id: 1,
  buyer_comment: 'I want this sentence to be my `buyer` comment on KeyCRM',
  discount_percent: 11.5,
  discount_amount: 9.99,
  shipping_price: 2.5,
  wrap_price: 3.5,
  taxes: 2.5,
  ordered_at: '2021-12-21 14:44:00',
  buyer: {
    full_name: 'Ирина Яргина',
    phone: '+380934760650',
  },
  shipping: {
    shipping_address_city: 'Kyiv',
    shipping_address_country: 'Ukraine',
    shipping_address_region: 'Kyivska',
    shipping_address_zip: '50000',
    shipping_secondary_line: 'string',
    shipping_receive_point: 'Склад #12',
    recipient_full_name: 'Ann Doe',
    recipient_phone: '+1 555-234-7777',
    warehouse_ref: '1ec09d2e-e1c2-11e3-8c4a-0050568002cf',
  },

  products: [
    {
      sku: '001-242',
      price: 995,
      discount_percent: 11.5,
      discount_amount: 9.99,
      quantity: 1,
      name: 'Блокнот',
      comment: 'Наклеїти плівку',
      properties: [
        {
          name: 'Color',
          value: 'Gold',
        },
      ],
    },
  ],
  payments: [
    {
      payment_method_id: 2,
      payment_method: 'Apple Pay',
      amount: 123.5,
      description: 'Авансовий платіж',
      payment_date: '2021-02-21 14:44:00',
      status: 'not_paid',
    },
  ],
  custom_fields: [
    {
      uuid: 'OR_1037',
      value: 'Лорд',
    },
  ],
};
const options = {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer MDM2MDY1YmZiNmQ2ZTVkY2M0MmUzNDIzYTEwNjMwYmQ3ZWFjNmEzYQ',
    accept: 'application/json',
  },
};

const crmPost = () => {
  fetch(BASE_URL, { options })
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error));
};
crmPost();
