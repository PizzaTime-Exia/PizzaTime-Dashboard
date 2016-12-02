import axios from './axios';

class OrderService {
  static fetchAll() {
    return axios.get(`/orders`);
  }

  static fetch(userId) {
    return axios.get(`/users/${userId}/orders`);
  }

  static setPaid(orderId, value) {
    return axios
      .patch(`/orders/${orderId}`, { paid: Boolean(value) });
  }

  static setDelivered(orderId, value) {
    return axios
      .patch(`/orders/${orderId}`, { delivered: Boolean(value) });
  }

  static setCancelled(orderId, value) {

  }
}

export default OrderService;
