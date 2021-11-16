<template>
  <table>
    <thead>
      <tr>
        <th colspan="5">
          <input type="text" id="filter" name="filter" placeholder="Find A Character" @input="filterPersons" />
        </th>
        <th>
          <span class="reset" data-tooltip="Reload Data" @click="reloadData()">⟳</span>
        </th>
      </tr>
      <tr>
        <PeopleHeader v-for="column in columns" v-bind:key="column.orderBy" v-bind:column="column" />
        <!-- <th scope="col">url</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in persons" :key="person.url">
        <th scope="row">{{ person.name }}</th>
        <td>{{ person.height }}</td>
        <td>{{ person.mass }}</td>
        <td>{{ person.created | formatDate }}</td>
        <td>{{ person.edited | formatDate }}</td>
        <td>{{ person.planetName }}</td>
        <!-- <td>{{ person.url }}</td> -->
      </tr>
      <tr v-if="!persons || persons.length == 0">
        <td scope="row" colspan="6" class="no-results">
          <h3 v-if="$store.state.filter">
            <span class="missing-name">{{ $store.state.filter }}</span> is missing
          </h3>
          <img src="@/assets/logo.svg" alt="start wras" width="300" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TABLE_COLUMNS } from '@/constants';
import dayjs from 'dayjs';
import PeopleHeader from '@/components/PeopleHeader.vue';

export default Vue.extend({
  components: { PeopleHeader },
  data: () => ({
    columns: JSON.parse(JSON.stringify(TABLE_COLUMNS)),
  }),
  computed: {
    ...mapGetters({
      persons: 'getDisplayedPersons',
    }),
  },
  filters: {
    formatDate(date: Date | string) {
      const d = dayjs(date);
      const f = d.format('lll');
      return f;
    },
  },
  methods: {
    filterPersons(e: any) {
      this.$store.dispatch('filterPersons', e.currentTarget.value || '');
    },
    reloadData() {
      this.$store.dispatch('reloadData');
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/vars.scss';

#filter {
  margin: 0;
  padding: 5px;
  max-width: 300px;
  text-align: center;
  &:active,
  &:focus {
    border-color: $wars-yellow;
    box-shadow: none;
    outline: none;
  }
}

.no-results {
  text-align: center;
  opacity: 0.6;
  padding: 4em 0;
  h3 {
    color: $wars-yellow;
    margin-bottom: 10px;
  }
  .missing-name {
    color: white;
  }
}

.reset {
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  top: 0.2em;
  &:hover {
    color: $wars-yellow;
  }
}
</style>
