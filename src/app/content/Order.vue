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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders">
            <td><strong>{{ order.name }}</strong></td>
            <td>
              <table>
                <tbody>
                  <tr v-for="item in order.content">
                    <td>{{ item.name }} base  {{ item.base }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>{{ order.date }}</td>            
            <td>{{ order.price }}€</td>
            <td>
              <button :class="['order-button', 'mui-btn', 'mui-btn--small', order.paid ? 'mui-btn--true' : 'mui-btn--false']" v-on:click="pay(order.id)">{{ order.paid ? 'Payé' : 'Non payé' }}</button>
              </td>
            <td>
              <button :class="['order-button', 'mui-btn', 'mui-btn--small', order.delivered ? 'mui-btn--true' : 'mui-btn--false']" v-on:click="deliver(order.id)">{{ order.delivered ? 'Livré' : 'Non livré' }}</button>
            </td>
            <td>
              <button class="order-button mui-btn mui-btn--small mui-btn--accent" v-on:click="cancel(order.id)">Annuler</button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      orders: [
        {name: 'Jean Onche', date: '29/11/2016 12h03', content: [{name: 'Canibale', base: 'Crème'}], price: 5.5, paid: true, delivered: true},
        {name: 'Jean Michel', date: '01/12/2016 10h30', content: [{name: 'Hawaienne', base: 'Crème'}, {name: 'Canibale', base: 'Tomate'}], price: 11, paid: true, delivered: false},
        {},{},{},{},{},{},{},{},{},{},{},{}
      ]
    }
  },
  methods: {
    pay(id) {

    },
    deliver(id) {

    },
    cancel(id) {

    }
  }
};
</script>
