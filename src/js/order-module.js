// Test object from backend
const orderModule = {
  type: 'pre-order',
  data: {
    price: 1499,
    salePrice: 995,
  },
};

//Хардкод об'єкта з цінами, які будуть приходити з адмінки.
const objectWithPrices = {
  price: 1499,
  salePrice: 995,
};

loadModule(orderModule);

async function loadModule({ type, data }) {
  let template;
  if (type === 'pre-order') {
    const { default: getImportFile } = await import(
      `../templates/pre-order.hbs`
    );
    template = getImportFile(data);
  } else {
    const { default: getImportFile } = await import(
      `../templates/order-now.hbs`
    );
    template = getImportFile(data);
  }
  getOrderSection(template);
}

function getOrderSection(template) {
  const orderSection = document.querySelector('#order');
  orderSection.innerHTML = template;
}
