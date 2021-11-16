<template>
  <div id="app">
    <div class="container">
      <h1>Star Wars Planets</h1>
      <div class="grid">
        <div>
          <PeopleTable />
        </div>
      </div>
    </div>
    <!-- prettier-ignore-attribute -->
    <notifications group="app" width="400px" position="top right" />
  </div>
</template>

<script>
import PeopleTable from './components/PeopleTable.vue';

export default {
  components: { PeopleTable },
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
}
h1 {
  margin-top: 1em;
}
.vue-notification-template {
  text-align: center;
}
.vm--overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
