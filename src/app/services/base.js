import api from './api';

class BaseService {
  static fetchAll() {
    return api.get(`/bases`);
  }

  static fetch(baseId) {
    return api.get(`/bases/${baseId}`);
  }

  static create(base) {
    return api.post(`/bases`, base);
  }

  static update(baseId, base) {
    return api.patch(`/bases/${baseId}`, base);
  }

  static delete(baseId) {
    return api.delete(`/bases/${baseId}`);
  }
}

export default BaseService;
