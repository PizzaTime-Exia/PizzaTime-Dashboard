<template>
  <div class="menu">
    <div>
      <ul class="menu-items">
        <li class="menu-item" v-for="item in items" v-bind:class="{ 'selected': item.isSelected }">
          <a v-bind:href="item.route">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      items: [
        {title: 'Dashboard', icon: '', route: '/', isSelected: true},
        {title: 'Orders', icon: '', route: '/orders', isSelected: false},
        {title: 'Pizzas', icon: '', route: '/pizzas', isSelected: false},
        {title: 'Bases', icon: '', route: '/bases', isSelected: false}
      ]
    };
  },
  methods: {
    go(item) {

    },
    select(item) {
      
    }
  }
};
</script>
