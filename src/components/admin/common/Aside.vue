<template>
 
        <el-menu default-active="1-1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="showMenu" style="z-index:99">
            <el-submenu :index="items.title" v-for="(items,index) in menuTree" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{items.title}}</span>
                </template>
                    <el-menu-item :index="val.title" v-for="(val,num) in items.children" :key="num"><router-link :to="val.path">{{val.title}}</router-link></el-menu-item>  
            </el-submenu>
        </el-menu>

</template>

<script>
export default {
  props: ['showMenu'],
  data() {
    return {
        menuTree:[
            {title:"资源下载",children:[
                {title:"内容管理",path:"/a"},
                {title:"类别管理",path:"/a"},
                {title:"评论管理",path:"/a"},
            ]},
            {title:"购物商城",children:[
                {title:"内容管理",path:"/a"},
                {title:"类别管理",path:"/a"},
                {title:"评论管理",path:"/a"},
            ]},
            {title:"订单管理",children:[
                {title:"内容管理",path:"/a"},
                {title:"类别管理",path:"/a"},
                {title:"评论管理",path:"/a"},
            ]},
            {title:"问题管理",children:[
                {title:"内容管理",path:"/a"},
                {title:"类别管理",path:"/a"},
                {title:"评论管理",path:"/a"},
            ]},
        ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
