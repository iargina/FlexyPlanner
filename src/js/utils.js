export class Order {

  constructor(orderedPlanners) {
    this.orderedPlanners = orderedPlanners;
  }

  get orderedPlanners() {
    return this._orderedPlanners;
  }

  set orderedPlanners(objArr) {
    this._orderedPlanners = objArr;
  }

}