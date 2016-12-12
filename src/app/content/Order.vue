<template>
  <div class="content">
    <div class="mui-container-fluid vertical-scroll">
      <table class="mui-table mui-table--bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Contenu</th>
            <th>Date</th>
            <th>Prix</th>
            <th>Payé</th>
            <th>Livré</th>
            <th><button class="mui-btn mui-btn--small mui-btn--primary mui-btn--flat" v-on:click="generateCSV()"><i class="fa fa-download" aria-hidden="true"></i>
CSV</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders">
            <td><strong>{{ order.user.name }}</strong></td>
            <td>
              <table>
                <tbody>
                  <tr v-for="item in order.items">
                    <td>{{ item.pizza.name }} ({{ item.base.name }})</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>{{ order.date }}</td>            
            <td>{{ order.price }}€</td>
            <td>
              <button :class="['order-button', 'mui-btn', 'mui-btn--small', order.paid ? 'mui-btn--true' : 'mui-btn--false']" v-on:click="setPaid(order)">{{ order.paid ? 'Payé' : 'Non payé' }}</button>
              </td>
            <td>
              <button :class="['order-button', 'mui-btn', 'mui-btn--small', order.delivered ? 'mui-btn--true' : 'mui-btn--false']" v-on:click="setDelivered(order)">{{ order.delivered ? 'Livré' : 'Non livré' }}</button>
            </td>
            <td>
              <button class="order-button mui-btn mui-btn--small">Annuler</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lazy.js';
import axios from 'axios';
import FileSaver from 'file-saverjs';
import CSV from './../services/csv';
import api from './../services/api';
import OrderService from './../services/order';
import PizzaService from './services/pizza';
import BaseService from './services/base';
import Order from './Order';

export default {
  name: 'Order',
  created() {
    this.fetchAll();
  },
  data() {
    return {
      orders: []
    }
  },
  methods: {
    setPaid(order) {
      if (!confirm(`${order.user.name} a-t-il payé sa commande?`)) {
        return;
      }
      const promises = [];
      order.items.forEach(x => promises.push(OrderService.setPaid(x.id)));
      axios.all(promises).then(() => order.paid = true);
    },
    setDelivered(order) {
      if (!confirm(`La commande de ${order.user.name} a-t-elle été délivrée?`)) {
        return;
      }
      const promises = [];
      order.items.forEach(x => promises.push(OrderService.setDelivered(x.id)));
      axios.all(promises).then(() => order.delivered = true);
    },
    fetchAll() {
      axios
        .all([BaseService.fetchAll(), PizzaService.fetchAll(), OrderService.fetchAll()])
        .then(axios.spread((bases, pizzas, orders) => {
          bases = bases.data;
          pizzas = pizzas.data;
          orders.data.forEach(orderData => {
            const order = new Order(orderData.user);
            this.orders.push(order);
            order.id = orderData.id;
            order.delivered = orderData.delivered;
            order.paid = orderData.paid;
            orderData.items.forEach(item => {
              const pizza = _(pizzas).find(x => x.id === item.pizzaId);
              const base = _(bases).find(x => x.id === item.baseId);
              order.add(pizza, base);
            });
          });
        }));
    },
    generateCSV() {
      let items = [
        {pizza: 'Pizza', base: 'Base'}
      ];
      this.orders.forEach(x => {
        x.items.forEach(item => {
          items.push({pizza: item.pizza.name, base: item.pizza.base.name});
        });
      });
      const content = CSV.export(items);
      const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      FileSaver(blob, 'commandes.csv');
    }
  }
};
</script>
