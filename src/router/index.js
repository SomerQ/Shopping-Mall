import Login from '../components/login/Login.vue';
import Register from '../components/register/Register.vue';
export default {
    routes: [
        {name:"login",path:'/login',component:Login},
        {name:"register",path:'/register',component:Register}
    ]
}