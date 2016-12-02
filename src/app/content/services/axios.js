import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.pizzatime.io/',
  timeout: 2000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
