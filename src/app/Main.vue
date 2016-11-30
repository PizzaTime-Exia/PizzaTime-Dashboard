<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <div class="mui-container-fluid main-container">
        <div class="mui-row main-row">
          <div class="mui-col-md-1 main-row"><menu-component></menu-component></div>
          <div class="mui-col-md-11 main-row"></div>
        </div>
      </div>
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
