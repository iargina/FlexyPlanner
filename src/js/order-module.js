import templatePreOrder from '../templates/pre-order.hbs';
// // import templateOrderNow from '../templates/order-now.hbs';

//Харкод об'єкта з цінами, які будуть приходити з адмінки.
const objectWithPrices = {
  oldPrice: 1499,
  price: 995,
};

//Харкод створення актуального рядка розмітки з об'єктом цін
const template = templatePreOrder(objectWithPrices);
console.log(template);

getOrderSection(template);

function getOrderSection(template) {
  const orderSection = document.querySelector('#order');
  orderSection.innerHTML = template;
}
