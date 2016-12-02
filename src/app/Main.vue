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
import Header from './Header.vue';
import Menu from './Menu.vue';
import Footer from './Footer.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'menu-component': Menu,
    'footer-component': Footer
  }
};
</script>
