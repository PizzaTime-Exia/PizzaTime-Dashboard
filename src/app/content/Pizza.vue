<template>
  <div class="content">
    <div class="mui-container-fluid">
      <ul class="mui-tabs__bar mui-tabs__bar--justified">
        <li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-justified-1">Ajouter</a></li>
        <li><a data-mui-toggle="tab" data-mui-controls="pane-justified-2">Modifier</a></li>
        <li><a data-mui-toggle="tab" data-mui-controls="pane-justified-3">Supprimer</a></li>
      </ul>
      <div class="mui-tabs__pane mui--is-active" id="pane-justified-1">
        <form>
          <div class="mui-textfield">
            <input type="text" placeholder="Nom" v-model="create.name">
          </div>
          <div class="mui-select">
            <select>
              <option>Tomate</option>
              <option>Crème</option>
            </select>
            <label>Base</label>
          </div>
          <div class="mui-textfield">
            <input type="text" placeholder="Prix">
          </div>
          <button type="submit" class="mui-btn mui-btn--raised" v-on:click="createPizza">Ajouter</button>
        </form>
      </div>
      <div class="mui-tabs__pane" id="pane-justified-2">
        <form>
          <div class="mui-select">
            <select v-model="update.id" v-on:change="updateSelectionChanged()">
              <option v-for="pizza in pizzas" v-bind:value="pizza.id">{{ pizza.name }}</option>
            </select>
            <label>Pizza</label>
          </div>
          <div class="mui-textfield">
            <input type="text" placeholder="Nom" v-model="update.name">
          </div>
          <div class="mui-select">
            <select v-model="update.base">
              <option v-for="base in bases" v-bind:value="base.id">{{ base.name }}</option>
            </select>
            <label>Base</label>
          </div>
          <div class="mui-textfield">
            <input type="text" placeholder="Prix" v-model="update.price">
          </div>
          <button type="submit" class="mui-btn mui-btn--raised" v-on:click="updatePizza()">Modifier</button>
        </form>
      </div>
      <div class="mui-tabs__pane" id="pane-justified-3">
        <form>
          <div class="mui-select">
            <select v-model="remove.id">
              <option v-for="pizza in pizzas" v-bind:value="pizza.id">{{ pizza.name }}</option>
            </select>
            <label>Pizza</label>
          </div>
          <button type="submit" class="mui-btn mui-btn--raised" v-on:click="removePizza()">Supprimer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lazy.js';
import axios from './services/axios';
import PizzaService from './services/pizza';
import BaseService from './services/base';

export default {
  name: 'Pizza',
  data() {
    return {
      pizzas: [
        {id: 1, name: 'Pizza1', base: {id: 1, name: 'Tomate'}, price: 5.5},
        {id: 2, name: 'Pizza2', base: {id: 2, name: 'Crème'}, price: 5.5},
        {id: 3, name: 'Pizza3', base: {id: 1, name: 'Tomate'}, price: 6.5},
      ],
      bases: [
        {id: 1, name: 'Tomate'},
        {id: 2, name: 'Crème'}
      ],
      create: {
        name: '',
        base: 1,
        price: 5.5
      },
      update: {
        id: -1,
        name: '',
        base: -1,
        price: null
      },
      remove: {
        id: 1
      }
    };
  },
  methods: {
    createPizza() {
      if (this.create.name === '')  return;
      if (this.create.base < 0)     return;
      if (this.create.price < 0)    return;
      PizzaService
        .create(this.create)
        .then(x => {
          alert('Pizza ajoutée !');
          this.create.name = '';
          this.create.base = 1;
          this.create.price = 5.5;
          fetchAll();
        });
    },
    updatePizza() {
      if (this.update.id < 1)       return;
      if (this.update.name === '')  return;
      if (this.update.base < 0)     return;
      if (this.update.price < 0)    return;
      PizzaService
        .update(this.update.id, this.update)
        .then(x => {
          alert('Pizza modifiée !');
          this.update.id = 1;
          this.update.name = '';
          this.update.base = 1;
          this.update.price = 0;
          fetchAll();
        });
    },
    removePizza() {
      if (this.remove.id < 0) return;
      PizzaService
        .delete(this.remove.id)
        .then(x => {
          alert('Pizza supprimée !');
          this.remove.id = 1;
          fetchAll();
        });
    },
    fetchAll() {
      axios
        .all([PizzaService.fetchAll(), BaseService.fetchAll()])
        .then(axios.spread(function (pizzas, bases) {
          this.pizzas = pizzas;
          this.bases = bases;
        }));
    },
    updateSelectionChanged() {
      const pizza = _(this.pizzas).find(x => x.id === this.update.id);
      if (!pizza) return;
      this.update.name = pizza.name;
      this.update.base = pizza.base.id;
      this.update.price = pizza.price;
    }
  }
};
</script>
