class Order {
  #orderedPlanners = [];
  #price = {};
  #contactInfo = {};
  #delivery = {};
  #discountPercentage = null;
  #total = 0;
  #promocode = '';

  // Встановлює загальну вартість замовлення
  setTotal() {
    this.#total = this.#orderedPlanners.reduce(
      (accumulator, el) => accumulator + el.amount * el.price,
      0
    );
  }

  get total() {
    return this.#total;
  }

  // Щось має бути по знижці
  useDiscount() {}

  // Array of ordered objects
  get orderedPlanners() {
    return this.#orderedPlanners;
  }

  set orderedPlanners(objArr) {
    this.#orderedPlanners = objArr;
  }

  // Price
  get price() {
    return this.#price;
  }

  set price(data) {
    this.#price = data;
  }

  // Contact Data
  get contactInfo() {
    return this.#contactInfo;
  }

  set contactInfo(data) {
    this.#contactInfo = data;
  }

  // Delivery
  get delivery() {
    return this.#delivery;
  }

  set delivery(data) {
    const prevData = this.#delivery;
    this.#delivery = { ...prevData, ...data };
  }

  // Discount from Promocode
  get discountPercentage() {
    return this.#discountPercentage;
  }

  set discountPercentage(percentage) {
    this.#discountPercentage = percentage;
  }
  // Promocode
  get promocode() {
    return this.#promocode;
  }

  set promocode(promoName) {
    this.#promocode = promoName;
  }

  getWholeOrderData() {
    return {
      orderedPlanners: this.#orderedPlanners,
      price: this.#price,
      contactInfo: this.#contactInfo,
      delivery: this.#delivery,
    };
  }
}

export const order = new Order();
