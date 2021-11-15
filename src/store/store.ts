import { SWPerson, SWPlanet } from '@/api/api-types';
import { SWApi } from '@/api/sw-api';
import Vue from 'vue';
import Vuex from 'vuex';
import { OrderByPayload, PAGE_SIZES, PersonSortKey, RootState } from './store-types';
import { arrayToMap, resolvePlanets, orderPersonsBy, resolveIds } from './store-utils';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  plugins: [createPersistedState()],
  state: {
    persons: [], // array is sorted using sortBy
    planets: [],
    personsMap: {},
    planetsMap: {},
    orderBy: 'id',
    isDescending: true,
    filterBy: 'name', // only name allowed for now
    filter: '',
    pageSize: PAGE_SIZES.twenty,
    currentPage: 1,
    filteredPersons: [], // array is filtered and sorted using sortBy
  },
  mutations: {
    setPersons(state, persons: SWPerson[]) {
      const resolved = resolvePlanets(persons, state.planetsMap);
      // merge existing and new planets
      state.personsMap = {
        ...state.personsMap,
        ...arrayToMap(resolved),
      };
      state.persons = Object.values(state.personsMap);
    },
    setPlanets(state, planets: SWPlanet[]) {
      const resolved = resolveIds(planets, 'planets');
      // merge existing and new planets
      state.planetsMap = {
        ...state.planetsMap,
        ...arrayToMap(resolved),
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
      state.filteredPersons = state.persons.filter(
        (person) => person.name.includes(fname) || fname.includes(person.name)
      );
      state.currentPage = 1;
    },
  },
  actions: {
    async init(context) {
      const state = context.state;
      const arePersonsLoaded =
        state.persons.length > 0 && state.persons.length === Object.keys(state.personsMap).length;
      const arePlanetsLoaded =
        state.planets.length > 0 && state.planets.length === Object.keys(state.planetsMap).length;
      if (arePersonsLoaded && arePlanetsLoaded) return;
      try {
        const [planetsResult, personsResult] = await Promise.all([SWApi.planets.getAll(), SWApi.persons.getAll()]);
        // setPlanets must be called before so planetName can be correctly resolved
        context.commit('setPlanets', planetsResult.results);
        context.commit('setPersons', personsResult.results);
        context.commit('ordeBy', { orderBy: state.orderBy, isDescending: state.isDescending });
      } catch (error: any) {
        // no need use the state to display a notification error, better use a service
        Vue.notify({
          group: 'app',
          type: 'error',
          title: 'Error Fetching Data',
          text: error.message,
        });
      }
    },
    orderBy(context, payload: OrderByPayload) {
      context.commit('orderBy', payload);
    },
    resetOrder(context) {
      context.commit('orderBy', { orderBy: 'id', isDescending: true });
    },
    filterPersons(context, payload: string) {
      context.commit('filterPersons', payload);
    },
  },
  getters: {
    getDisplayedPersons(state) {
      state.pageSize.size;
      const persons = state.filteredPersons.length ? state.filteredPersons : state.persons;
      if (state.pageSize.size <= 0) return persons;
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
