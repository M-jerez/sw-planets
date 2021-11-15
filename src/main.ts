import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import Notifications from 'vue-notification';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'; // load on demand
import './polyfills';
import '@picocss/pico/css/pico.min.css';

Vue.config.productionTip = false;
Vue.use(Notifications);
dayjs.extend(localizedFormat);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

store.dispatch('init');
