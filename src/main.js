import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import App from './components/App.vue';
import routerConfig from './router/index.js';
import axios from 'axios';
import { domain } from './js/api_config.js';
axios.defaults.baseURL=domain;
Vue.prototype.$http=axios;
import api from './js/api_config.js';
Vue.prototype.$api=api;

new Vue({
    el:'#app',
    router:new VueRouter(routerConfig),
    render:c=>c(App)
    
})