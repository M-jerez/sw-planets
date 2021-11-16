<template>
  <th scope="col" class="peopleHeader" v-bind:class="{ isActive }" @click="toggleOrderBy()">
    <span class="title">{{ column.text }} </span>
    <span class="direction" v-bind:class="{ isAscending }">▲</span>
    <span class="direction" v-bind:class="{ isDescending }">▼</span>
    <span class="direction empty" v-if="!isActive">⇕</span>
  </th>
</template>

<script lang="ts">
import { RootState } from '@/store/store-types';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  props: ['column'],
  computed: {
    ...mapState<RootState>({
      isActive(state: RootState) {
        return state.orderBy === (this as any).column.orderBy;
      },
      // state.isDescending === null means no order
      isAscending(state: RootState) {
        return (this as any).isActive && state.isDescending !== null && !state.isDescending;
      },
      isDescending(state: RootState) {
        return (this as any).isActive && state.isDescending !== null && state.isDescending;
      },
    }),
  },
  methods: {
    toggleOrderBy() {
      this.$store.dispatch('toggleOrderBy', this.column.orderBy);
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/vars.scss';

.peopleHeader {
  position: relative;
  min-width: 130px;
  cursor: pointer;
  white-space: nowrap;
}
.title:hover {
  color: $wars-yellow;
}
.isActive {
  .title {
    color: $wars-yellow;
  }
}
.direction {
  color: $wars-yellow;
  display: none;
  &.isAscending,
  &.isDescending {
    display: inline;
  }
  &.empty {
    display: inline;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
