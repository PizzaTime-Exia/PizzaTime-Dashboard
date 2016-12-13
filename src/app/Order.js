import _ from 'lazy.js';

let ID = 0;

class Order {
  constructor(user) {
    this.user = user;
    this.id = -1;
    this.items = [];
    this.delivred = false;
    this.paid = false;
  }

  get isEmpty() {
    return this.count === 0;
  }

  get count() {
    return this.items.length;
  }

  get price() {
    return _(this.items)
      .map(x => x.pizza.price)
      .sum()
      .toFixed(2);
  }

  add(pizza, base) {
    this.items.push({id: ++ID, pizza, base});
  }

  remove(id) {
    this.items = _(this.items).filter(x => x.id !== id).toArray();
  }

  clear() {
    this.items = [];
  }
}

export default Order;
