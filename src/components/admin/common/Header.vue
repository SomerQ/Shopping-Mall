<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-button icon="el-icon-tickets" class="menuBtn" @click="showMenu"></el-button>
        <el-submenu index="1" class="loginoutBtn">
            <template slot="title">你好，admin</template>
            <el-menu-item class="subBtn" index="1-1">个人资料</el-menu-item>
            <el-menu-item class="subBtn" index="1-2">帐号管理</el-menu-item>
            <el-menu-item class="subBtn" index="1-3" @click.native="loginOut">注销登录</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse:true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    showMenu(){
        this.isCollapse=!this.isCollapse;
        this.$emit('emitVal',this.isCollapse);
    },
    loginOut(){
      this.$http.get(this.$api.logout)
      .then(res=>{
        if(res.data.status == 0){
          alert(res.data.message);
          this.$router.push('/login');
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-demo {
  line-height: 60px;
  padding: 0 5px;
  .loginoutBtn{
      float: right;
      .subBtn{
          margin:0 30px;
      }
  }
}
</style>