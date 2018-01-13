import Login from '../components/login/Login.vue';
import Admin from '../components/admin/Admin.vue';
export default {
    routes: [
        {name:"login",path:'/login',component:Login},
        {name:"admin",path:'/admin',component:Admin},
    ]
}