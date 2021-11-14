import { SWPerson, SWPlanet } from '@/api/api-types';
import { SWApi } from '@/api/sw-api';
import Vue from 'vue';
import Vuex from 'vuex';
import { OrderByPayload, PAGE_SIZES, PersonSortKey, RootState } from './store-types';
import { arrayToMap, fillPlanetNames, orderPersonsBy } from './store-utils';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  plugins: [createPersistedState()],
  state: {
    persons: [], // array is sorted using sortBy
    planets: [],
    personsMap: {},
    planetsMap: {},
    orderBy: 'url',
    isDescending: true,
    filterBy: 'name', // only name allowed for now
    filter: '',
    pageSize: PAGE_SIZES.twenty,
    currentPage: 1,
    filteredPersons: [], // array is filtered and sorted using sortBy
  },
  mutations: {
    setPersons(state, persons: SWPerson[]) {
      const personsWithPlanets = fillPlanetNames(persons, state.planetsMap);
      // merge existing and new planets
      state.personsMap = {
        ...state.personsMap,
        ...arrayToMap(personsWithPlanets),
      };
      // ordering in selected order from ui
      const unorderedPersons = Object.values(state.personsMap);
      state.persons = orderPersonsBy(unorderedPersons, state.orderBy, state.isDescending);
    },
    setPlanets(state, planets: SWPlanet[]) {
      // merge existing and new planets
      state.planetsMap = {
        ...state.planetsMap,
        ...arrayToMap(planets),
      };
      state.planets = Object.values(state.planetsMap);
    },
    orderBy(state, { orderBy, isDescending }: OrderByPayload) {
      state.orderBy = orderBy;
      state.isDescending = isDescending;
      state.persons = orderPersonsBy(state.persons, orderBy, isDescending);
      state.filteredPersons = orderPersonsBy(state.filteredPersons, orderBy, isDescending);
    },
    filterPersons(state, fname: string) {
      if (state.filter === fname) return;
      if (!fname) {
        state.filteredPersons = [];
        state.currentPage = 1;
        return;
      }
      // Array.filter preserves order so we don't have to order again
      state.filteredPersons = state.persons.filter(
        (person) => person.name.includes(fname) || fname.includes(person.name)
      );
      state.currentPage = 1;
    },
  },
  actions: {
    async init(context) {
      try {
        const [planetsResult, personsResult] = await Promise.all([SWApi.planets.getAll(), SWApi.persons.getAll()]);
        // setPlanets must be called before so planetName can be correctly resolved
        context.commit('setPlanets', planetsResult.results);
        context.commit('setPersons', personsResult.results);
      } catch (error) {
        context.commit('setError', error);
      }
    },
    orderBy(context, payload: OrderByPayload) {
      context.commit('orderBy', payload);
    },
    resetOrder(context) {
      context.commit('orderBy', { orderBy: 'url', isDescending: true });
    },
    filterPersons(context, payload: string) {
      context.commit('filterPersons', payload);
    },
  },
  getters: {
    getDisplayedPersons(state) {
      const persons = state.filteredPersons.length ? state.filteredPersons : state.persons;
      const start = (state.currentPage - 1) * state.pageSize.size;
      const end = Math.min(persons.length, start + state.pageSize.size);
      return persons.slice(start, end + 1);
    },
    isNextPageEnabled(state) {
      const persons = state.filteredPersons.length ? state.filteredPersons : state.persons;
      const maxPages = Math.ceil(persons.length / state.pageSize.size);
      return state.currentPage < maxPages;
    },
    isPreviousPageEnabled(state) {
      return state.currentPage > 1;
    },
  },
});
