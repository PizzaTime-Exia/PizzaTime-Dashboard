import api from './api';

class OrderService {
  static fetchAll() {
    return api.get(`/orders`);
  }

  static setPaid(orderId) {
    return api.patch(`/orders/${orderId}`, {paid: true});
  }

  static setDelivered(orderId) {
    return api.patch(`/orders/${orderId}`, {delivered: true});
  }

  static setCancelled(orderId, value) {
    return api.patch(`/orders/${orderId}`, {cancelled: Boolean(value)});
  }
}

export default OrderService;
