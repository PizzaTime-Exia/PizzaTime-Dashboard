<template>
  <div class="menu">
    <ul class="menu-items">
      <li class="menu-item" v-for="item in items" v-bind:class="{ 'selected': ($route.fullPath === item.route) }" v-on:click="go(item.route)">
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      items: [
        {title: 'Dashboard', route: '/dashboard'},
        {title: 'Commandes', route: '/orders'},
        {title: 'Pizzas', route: '/pizzas'},
        {title: 'Bases', route: '/bases'}
      ]
    };
  },
  methods: {
    go(route) {
      this.$router.push(route);
    }
  }
};
</script>
