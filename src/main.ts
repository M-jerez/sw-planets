import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import './polyfills';
import '@picocss/pico/css/pico.min.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

store.dispatch('init');
