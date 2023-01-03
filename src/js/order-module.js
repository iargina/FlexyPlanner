// import templatePreOrder from '../templates/pre-order.hbs';
import templatePreOrder from '../templates/order-now.hbs';

//Харкод об'єкта з цінами, які будуть приходити з адмінки.
const objectWithPrices = {
  price: 1499,
  salePrice: 995,
};

//Харкод створення актуального рядка розмітки з об'єктом цін
const template = templatePreOrder(objectWithPrices);

getOrderSection(template);

function getOrderSection(template) {
  const orderSection = document.querySelector('#order');
  orderSection.innerHTML = template;
}
