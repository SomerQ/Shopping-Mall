import 'normalize.css';
import './css/index.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

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