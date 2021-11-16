import { SWPerson, SWPlanet } from '@/api/api-types';
import { SWApi } from '@/api/sw-api';
import Vue from 'vue';
import Vuex from 'vuex';
import { OrderByPayload, PersonSortKey, RootState } from './store-types';
import { arrayToMap, normalizePersons, orderPersonsBy, normalizeIds, filterByNames } from './store-utils';
import createPersistedState from 'vuex-persistedstate';
import { PAGE_SIZES } from '@/constants';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  plugins: [createPersistedState()],
  state: {
    persons: [], // array is sorted using sortBy
    planets: [],
    personsMap: {},
    planetsMap: {},
    orderBy: 'id',
    isDescending: false,
    filterBy: 'name', // only name allowed for now
    filter: '',
    pageSize: PAGE_SIZES.all,
    currentPage: 1,
    filteredPersons: [], // array is filtered and sorted using sortBy
  },
  mutations: {
    setPersons(state, persons: SWPerson[]) {
      const resolved = normalizePersons(persons, state.planetsMap);
      // merge existing and new planets
      state.personsMap = {
        ...state.personsMap,
        ...arrayToMap(resolved),
      };
      state.persons = Object.values(state.personsMap);
    },
    setPlanets(state, planets: SWPlanet[]) {
      const resolved = normalizeIds(planets, 'planets');
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
    // toggles from all states: des > asc > deselected
    // deselected = (ascending by id)
    toggleOrderBy(state, orderBy: PersonSortKey) {
      // start sequence in another column
      if (state.orderBy !== orderBy) {
        state.orderBy = orderBy;
        state.isDescending = true;
      }
      // set asc
      else if (state.isDescending === true) state.isDescending = false;
      // deselected
      else if (state.isDescending === false) {
        state.isDescending = false;
        state.orderBy = 'id';
      }

      state.persons = orderPersonsBy(state.persons, state.orderBy, state.isDescending);
      state.filteredPersons = orderPersonsBy(state.filteredPersons, state.orderBy, state.isDescending);
    },
    filterPersons(state, fname: string) {
      fname = fname.toLowerCase();
      if (state.filter === fname) return;
      state.filter = fname;
      if (!state.filter) {
        state.filter = '';
        state.filteredPersons = [];
        state.currentPage = 1;
        return;
      }
      state.filteredPersons = filterByNames(state.persons, state.filter);
      state.currentPage = 1;
    },
    resetFilter(state) {
      state.filter = '';
      state.filteredPersons = [];
      state.currentPage = 1;
    },
    reset(state) {
      state.persons = []; // array is sorted using sortBy
      state.planets = [];
      state.personsMap = {};
      state.planetsMap = {};
      state.orderBy = 'id';
      state.isDescending = false;
      state.filterBy = 'name'; // only name allowed for now
      state.filter = '';
      state.pageSize = PAGE_SIZES.all;
      state.currentPage = 1;
      state.filteredPersons = []; // array is filtered and sorted using sortBy
    },
  },
  actions: {
    async init(context, forceLoadData = false) {
      const state = context.state;
      if (!forceLoadData) {
        const arePersonsLoaded =
          state.persons.length > 0 && state.persons.length === Object.keys(state.personsMap).length;
        const arePlanetsLoaded =
          state.planets.length > 0 && state.planets.length === Object.keys(state.planetsMap).length;
        context.commit('resetFilter');
        if (arePersonsLoaded && arePlanetsLoaded) return;
      }

      try {
        const [planetsResult, personsResult] = await Promise.all([SWApi.planets.getAll(), SWApi.persons.getAll()]);
        // setPlanets must be called before so planetName can be correctly resolved
        context.commit('setPlanets', planetsResult.results);
        context.commit('setPersons', personsResult.results);
        context.commit('orderBy', { orderBy: state.orderBy, isDescending: state.isDescending });
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
    reloadData(context) {
      context.commit('reset');
      context.dispatch('init', true);
    },
    orderBy(context, payload: OrderByPayload) {
      context.commit('orderBy', payload);
    },
    toggleOrderBy(context, orderBy: PersonSortKey) {
      context.commit('toggleOrderBy', orderBy);
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
      const persons = state.filter !== '' ? state.filteredPersons : state.persons;
      if (state.pageSize.size <= 0) return persons;
      const start = (state.currentPage - 1) * state.pageSize.size;
      const end = Math.min(persons.length, start + state.pageSize.size);
      return persons.slice(start, end + 1);
    },
    isNextPageEnabled(state) {
      const persons = state.filter !== '' ? state.filteredPersons : state.persons;
      const maxPages = Math.ceil(persons.length / state.pageSize.size);
      return state.currentPage < maxPages;
    },
    isPreviousPageEnabled(state) {
      return state.currentPage > 1;
    },
  },
});
