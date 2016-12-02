import axios from './axios';

class BaseService {
  static fetchAll() {
    return axios
      .get(`/bases`);
  }

  static fetch(baseId) {
    return axios
      .get(`/bases/${baseId}`);
  }

  static create(base) {
    return axios
      .post(`/bases`, base);
  }

  static update(baseId, base) {
    return axios
      .put(`/bases/${baseId}`, base);
  }

  static delete(baseId) {
    return axios
      .delete(`/bases/${baseId}`);
  }
}

export default BaseService;
