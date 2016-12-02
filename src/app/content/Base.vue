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
          <button type="button" class="mui-btn mui-btn--raised" v-on:click="createBase()">Ajouter</button>
        </form>
      </div>
      <div class="mui-tabs__pane" id="pane-justified-2">
        <form>
          <div class="mui-select">
            <select v-model="update.id" v-on:change="updateSelectionChanged()">
              <option v-for="base in bases" v-bind:value="base.id">{{ base.name }}</option>
            </select>
            <label>Base</label>
          </div>
          <div class="mui-textfield">
            <input type="text" placeholder="Nom" v-model="update.name">
          </div>
          <button type="button" class="mui-btn mui-btn--raised" v-on:click="updateBase()">Modifier</button>
        </form>
      </div>
      <div class="mui-tabs__pane" id="pane-justified-3">
        <form>
          <div class="mui-select">
            <select v-model="remove.id">
              <option v-for="base in bases" v-bind:value="base.id">{{ base.name }}</option>
            </select>
            <label>Base</label>
          </div>
          <button type="button" class="mui-btn mui-btn--raised" v-on:click="removeBase()">Supprimer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lazy.js';
import BaseService from './../services/base';

export default {
  name: 'Base',
  created() {
    this.fetchAll();
  },
  data() {
    return {
      bases: [],
      create: {
        name: ''
      },
      update: {
        id: -1,
        name: ''
      },
      remove: {
        id: -1
      }
    };
  },
  methods: {
    createBase() {
      if (this.create.name === '') return;
      BaseService
        .create(this.create)
        .then(x => {
          alert('Base ajoutée !');
          fetchAll();
        });
    },
    updateBase() {
      if (this.update.id < 0) return;
      if (this.update.name === '') return;
      BaseService
        .update(this.update.id, this.update)
        .then(x => {
          alert('Base modifiée !');
          fetchAll();
        });
    },
    removeBase() {
      if (this.remove.id < 0) return;
      BaseService
        .delete(this.remove.id)
        .then(x => {
          alert('Base supprimée !');
          fetchAll();
        });
    },
    fetchAll() {
      BaseService
        .fetchAll()
        .then(bases => {
          this.bases = bases.data;
          this.create.name = '';
          if (this.bases.length > 0) {
            this.update.id = this.bases[0].id;
            this.update.name = this.bases[0].name
            this.remove.id = this.bases[0].id;
          }
        });
    },
    updateSelectionChanged() {
      const base = _(this.bases).find(x => x.id === this.update.id);
      if (!base) return;
      this.update.name = base.name;
    }
  }
};
</script>
