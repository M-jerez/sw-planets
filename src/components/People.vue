<template>
  <table>
    <thead>
      <tr>
        <th scope="col">Character</th>
        <th scope="col">heigh</th>
        <th scope="col">weight</th>
        <th scope="col">created</th>
        <th scope="col">edited</th>
        <th scope="col">planet</th>
        <th scope="col">url</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in people" :key="person.url">
        <th scope="row">{{ person.name }}</th>
        <td>{{ person.height }}</td>
        <td>{{ person.mass }}</td>
        <td>{{ person.created.toLocaleDateString() }}</td>
        <td>{{ person.edited.toLocaleDateString() }}</td>
        <td>{{ person.planetName }}</td>
        <td>{{ person.url }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapState } from 'vuex';

export default Vue.extend({
  computed: {
    // ...mapState({
    //   checkoutStatus: (state) => state.cart.checkoutStatus,
    // }),
    ...mapGetters({
      people: 'getDisplayedPersons',
    }),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
