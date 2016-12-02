import axios from './axios';

class PizzaService {
  static fetchAll() {
    return axios
      .get(`/pizzas`);
  }

  static fetch(pizzaId) {
    return axios
      .get(`/pizzas/${pizzaId}`);
  }

  static create(pizza) {
    return axios
      .post(`/pizzas`, pizza);
  }

  static update(pizzaId, pizza) {
    return axios
      .put(`/pizzas/${pizzaId}`, pizza);
  }

  static delete(pizzaId) {
    return axios
      .delete(`/pizzas/${pizzaId}`);
  }
}

export default PizzaService;
