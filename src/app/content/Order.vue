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
            <th>
              <button v-if="!areOrdersLocked" class="mui-btn mui-btn--small mui-btn--primary" v-on:click="lockOrders()">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>&nbsp;Vérouiller les commandes
              </button>
              <button v-if="areOrdersLocked" class="mui-btn mui-btn--small mui-btn--danger" v-on:click="unlockOrders()">
                <i class="fa fa-lock" aria-hidden="true"></i>&nbsp;Commandes vérouillées
              </button>
              &nbsp;
              <button class="mui-btn mui-btn--small mui-btn--primary" v-on:click="generateCSV()">
                <i class="fa fa-download" aria-hidden="true"></i>&nbsp;CSV
              </button>
            </th>
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
            <td>{{ order.date.toLocaleDateString() }}</td>            
            <td>{{ order.price }}€</td>
            <td>
              <button :class="['order-button', 'mui-btn', 'mui-btn--small', order.paid ? 'mui-btn--true' : 'mui-btn--false']" v-on:click="setPaid(order)">{{ order.paid ? 'Payé' : 'Non payé' }}</button>
              &nbsp;
              <button :class="['order-button', 'mui-btn', 'mui-btn--small', order.delivered ? 'mui-btn--true' : 'mui-btn--false']" v-on:click="setDelivered(order)">{{ order.delivered ? 'Livré' : 'Non livré' }}</button>
              &nbsp;
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
import PizzaService from './../services/pizza';
import BaseService from './../services/base';
import ConfigService from './../services/config';
import Order from './../Order';

export default {
  name: 'Order',
  created() {
    this.fetchAll();
  },
  data() {
    return {
      orders: [],
      areOrdersLocked: false
    }
  },
  methods: {
    setPaid(order) {
      if (!confirm(`${order.user.name} a-t-il payé sa commande?`)) {
        return;
      }
      OrderService
        .setPaid(this.order.id)
        .then(() => this.order.paid = true);
    },
    setDelivered(order) {
      if (!confirm(`La commande de ${order.user.name} a-t-elle été délivrée?`)) {
        return;
      }
      OrderService
        .setDelivered(this.order.id)
        .then(() => this.order.delivered = true);
    },
    fetchAll() {
      axios
        .all([BaseService.fetchAll(), PizzaService.fetchAll(), OrderService.fetchAll()])
        .then(axios.spread((basesResponse, pizzasResponse, ordersResponse) => {
          const bases = basesResponse.data;
          const pizzas = pizzasResponse.data;
          ordersResponse.data.forEach(orderData => {
            const order = new Order(orderData.user);
            this.orders.push(order);
            order.id = orderData.id;
            order.delivered = orderData.delivered;
            order.paid = orderData.paid;
            order.date = Date.parse(orderData.date);
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
  },
  lockOrders() {
    if (confirm('Voulez vous vraiment vérouiller les commandes?')) {
      this.areOrdersLocked = true;
      var date = this.getNextDate(new Date(), 5); // Next friday
      ConfigService.updateEndDate(date);
    }
  },
  unlockOrders() {
    alter('Action impossible.')
  },
  getNextDate(date, day) {
    var next = new Date(date.getTime ());
    next.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
    if (date.getDate() === next.getDate()) {
      next.setDate(date.getDate() + 7);
    }
    return next;
  }
};
</script>
