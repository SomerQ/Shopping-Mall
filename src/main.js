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
axios.defaults.withCredentials=true;
import {
    domain
} from './js/api_config.js';
//请求在线api，使用以下代码
// axios.defaults.baseURL=domain;
//如果请求本地api,则使用以下代码
axios.defaults.baseURL = 'http://localhost:8899';
Vue.prototype.$http = axios;
import api from './js/api_config.js';
Vue.prototype.$api = api;


import beforeEach from './router/bfeach';

const router = new VueRouter(routerConfig);
router.beforeEach(beforeEach);

new Vue({
    el: '#app',
    router,
    render: c => c(App)
});