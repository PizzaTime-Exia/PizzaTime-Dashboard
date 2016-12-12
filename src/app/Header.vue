<template>
  <header>
    <div class="mui-appbar header">
      <div class="header-title">
        <a href="#" v-on:click="home()">Pizza Time</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    home() {
      this.$router.push('/dashboard');
    }
  }
};
</script>