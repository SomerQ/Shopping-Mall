<template>
  <div>
    <el-container class="admin">
          <el-aside :width="width"><Aside :showMenu="menuVal"></Aside></el-aside>
      <el-container>
        <el-header>
            <Header @emitVal="getVal"></Header>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import Header from "./common/Header.vue";
import Aside from "./common/Aside.vue";

export default {
  components: {
    Header,
    Aside
  },
  data() {
    return {
      width: "",
      menuVal: ""
    };
  },
  methods: {
    getVal(val) {
      this.menuVal = val;
    }
  }
};
</script>

<style lang='less' scoped>
.el-header {
  padding: 0;
}

.el-aside {
  height: 100%;
  background-color: #fff;
}

.el-main {
  padding: 0;
  height: 100%;
  background-color: #fff;
  padding: 10px;
}
.admin {
  height: 100%;
}
</style>