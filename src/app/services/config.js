import api from './api';

class ConfigService {
  static updateEndDate(date) {
    return api.post(`/config/end_date`, {datetime: date.toISOString()});
  }
}

export default ConfigService;
