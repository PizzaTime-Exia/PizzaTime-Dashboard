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
          <div class="mui-textfield">
            <input type="text" placeholder="Description" v-model="create.description">
          </div>
          <div class="mui-select">
            <select v-model="create.base">
              <option v-for="base in bases" v-bind:value="base.id">{{ base.name }}</option>
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
          <div class="mui-textfield">
            <input type="text" placeholder="Description" v-model="update.description">
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
import axios from 'axios';
import api from './../services/api';
import PizzaService from './../services/pizza';
import BaseService from './../services/base';

export default {
  name: 'Pizza',
  created() {
    this.fetchAll();
  },
  data() {
    return {
      pizzas: [],
      bases: [],
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
      if (this.create.name === '')        return;
      if (this.create.base === undefined) return;
      if (this.create.price < 0)          return;
      PizzaService
        .create(this.create)
        .then(x => {
          alert('Pizza ajoutée !');
          fetchAll();
        });
    },
    updatePizza() {
      if (this.update.id < 1)             return;
      if (this.update.name === '')        return;
      if (this.update.base === undefined) return;
      if (this.update.price < 0)          return;
      PizzaService
        .update(this.update.id, this.update)
        .then(x => {
          alert('Pizza modifiée !');
          fetchAll();
        });
    },
    removePizza() {
      if (this.remove.id < 0) return;
      PizzaService
        .delete(this.remove.id)
        .then(x => {
          alert('Pizza supprimée !');
          fetchAll();
        });
    },
    fetchAll() {
      axios
        .all([PizzaService.fetchAll(), BaseService.fetchAll()])
        .then(axios.spread((pizzas, bases) => {
          this.pizzas = pizzas.data;
          this.bases = bases.data;
          if (this.pizzas.length > 0) {
            this.update.id = 1;
            this.updateSelectionChanged();
            this.remove.id = 1;
          }
        }));
    },
    updateSelectionChanged() {
      const pizza = _(this.pizzas).find(x => x.id === this.update.id);
      if (!pizza) return;
      this.update.name = pizza.name;
      this.update.base = pizza.base.id;
      this.update.price = pizza.price;
      this.update.description = pizza.description;
    }
  }
};
</script>
