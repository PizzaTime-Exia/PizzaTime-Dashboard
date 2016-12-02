import api from './api';

class PizzaService {
  static fetchAll() {
    return api
      .get(`/pizzas`);
  }

  static fetch(pizzaId) {
    return api.get(`/pizzas/${pizzaId}`);
  }

  static create(pizza) {
    return api.post(`/pizzas`, pizza);
  }

  static update(pizzaId, pizza) {
    return api.patch(`/pizzas/${pizzaId}`, pizza);
  }

  static delete(pizzaId) {
    return api.delete(`/pizzas/${pizzaId}`);
  }
}

export default PizzaService;
