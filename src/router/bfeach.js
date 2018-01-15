import axios from 'axios';
import api from '../js/api_config';

export default function (to, from, next) {
    var toPath=to.name;
console.log(toPath);

    axios.get(api.isLogin)
    .then(res=>{
        var isLogin=false;
        if(res.data.code == 'logined'){
            isLogin=true;
        }
    if(toPath == 'login' && isLogin){
        console.log(111);
        
        next('/admin');
    }else if(toPath != 'login' && !isLogin){
        console.log(222);
        
        next({name:'login',query:{nextPage:to.fullPath}});
    }else{
        console.log(333);
        
        next();
    }
        
    })
}