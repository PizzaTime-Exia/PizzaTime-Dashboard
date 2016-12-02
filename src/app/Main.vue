<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <menu-component></menu-component>
      <router-view></router-view>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import api from './services/api';
import Header from './Header.vue';
import Menu from './Menu.vue';
import Footer from './Footer.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'menu-component': Menu,
    'footer-component': Footer,
  },
  created() {
    api.get('/').catch(() => alert('API indisponible pour le moment'));
  }
};
</script>
