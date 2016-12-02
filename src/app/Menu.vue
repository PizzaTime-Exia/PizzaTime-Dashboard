<template>
  <div class="menu">
    <ul class="menu-items">
      <li class="menu-item" v-for="item in items" v-bind:class="{ 'selected': ($route.fullPath === item.route) }">
        <router-link :to="{ path: item.route }">{{ item.title }}</router-link>
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
        {title: 'Dashboard', route: '/dashboard', isSelected: true},
        {title: 'Commandes', route: '/orders', isSelected: false},
        {title: 'Pizzas', route: '/pizzas', isSelected: false},
        {title: 'Bases', route: '/bases', isSelected: false}
      ]
    };
  }
};
</script>
