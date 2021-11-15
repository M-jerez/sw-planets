<template>
  <div id="app">
    <div class="cotainer">
      <h1>Star Wars Planets</h1>
      <div class="grid">
        <div>
          <People />
        </div>
      </div>
    </div>
    <notifications group="app" width="400px" position="top right" duration="6000" />
  </div>
</template>

<script>
import People from './components/People.vue';

export default {
  components: { People },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-notification-template {
  text-align: center;
}
</style>
