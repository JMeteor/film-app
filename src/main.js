import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { store } from './store'
import { routes } from './routes'
import App from './App.vue'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
