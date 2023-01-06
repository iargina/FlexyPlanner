export class Order {

  static #orderedPlanners = [];
  static #price = 995;
  static #contactInfo = {};
  // static #cityName = '';
  // static #warehouse = '';
  static #delivery = {}

  // Array of ordered objects
  get orderedPlanners() {
    return Order.#orderedPlanners;
  }

  set orderedPlanners(objArr) {
    Order.#orderedPlanners = objArr;
  }

  // Price
  get price() {
    return Order.#price;
  }

  set price(priceVal) {
    Order.#price = priceVal;
  }

  // Contact Data
  get contactInfo() {
    return Order.#contactInfo;
  }

  set contactInfo(data) {
    Order.#contactInfo = data;
  }

  // Delivery
  get delivery() {
    return Order.#delivery;
  }

  set delivery(data) {
    const prevData = Order.#delivery;
    Order.#delivery = { ...prevData, ...data };
  }

  // get cityName() {
  //   return Order.#cityName;
  // }

  // set cityName(newName) {
  //   Order.#cityName = newName;
  // }

  // get warehouse() {
  //   return Order.#warehouse;
  // }

  // set warehouse(newWarehouse) {
  //   Order.#warehouse = newWarehouse;
  // }


  getWholeOrderData() {
    return {
      orderedPlanners: Order.#orderedPlanners,
      price: Order.#price,
      contactInfo: Order.#contactInfo,
      // delivery: {
      //   city: Order.#cityName,
      //   warehouse: Order.#warehouse
      // }
      delivery: Order.#delivery,
    }
  }
}