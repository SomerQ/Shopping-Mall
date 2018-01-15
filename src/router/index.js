import Login from '../components/login/Login.vue';
import Admin from '../components/admin/Admin.vue';

// import GoodsCateAdd from '../components/admin/common/goods/goodsCategory/goodsCateEdit.vue';
import GoodsCateEdit from '../components/admin/common/goods/goodsCategory/goodsCateEdit.vue';
import GoodsCateList from '../components/admin/common/goods/goodsCategory/goodsCateList.vue';

// import GoodsContentAdd from '../components/admin/common/goods/goodsContent/goodsContentEdit.vue';
import GoodsContentEdit from '../components/admin/common/goods/goodsContent/goodsContentEdit.vue';
import GoodsContentList from '../components/admin/common/goods/goodsContent/goodsContentList.vue';

let adminChildren=[
    {name:'goodsCateAdd',path:'goods/goodsCateAdd',component:GoodsCateEdit},
    {name:'goodsCateEdit',path:'goods/goodsCateEdit/:cateId',component:GoodsCateEdit},
    {name:'goodsCateList',path:'goods/goodsCateList',component:GoodsCateList},
    {name:'goodsContentAdd',path:'goods/goodsContentAdd',component:GoodsContentEdit},
    {name:'goodsContentEdit',path:'goods/goodsContentEdit/:contentId',component:GoodsContentEdit},
    {name:'goodsContentList',path:'goods/goodsContentList',component:GoodsContentList},
   
]

export default {
    routes: [
        {name:"login",path:'/login',component:Login},
        {path:'/',redirect: "admin"},
        {name:"admin",path:'/admin',component:Admin,children:adminChildren},
    ]
}