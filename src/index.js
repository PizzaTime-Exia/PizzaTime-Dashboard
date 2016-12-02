import Vue from 'vue';
import Main from './app/Main.vue';
import Dashboard from './app/content/Dashboard.vue';
import Order from './app/content/Order.vue';
import Pizza from './app/content/Pizza.vue';
import Base from './app/content/Base.vue';

import './index.css';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'orders',
          component: Order
        },
        {
          path: 'pizzas',
          component: Pizza
        },
        {
          path: 'bases',
          component: Base
        }
      ]
    }
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
