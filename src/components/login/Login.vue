<template>
  <div class="login">
    <img src="../../images/LOGO.png" alt="">
    <div class="login-form">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="ruleForm2" :rules="rules">
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="formLabelAlign.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input v-model="formLabelAlign.upwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        uname: "admin",
        upwd: "123456"
      },
      //表单校验规则
      rules: {
        uname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "输入长度在3-20字符之间", trigger: "blur" }
        ],
        upwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "输入长度在6-18字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("提交错误！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$http
        .post(this.$api.login, this.formLabelAlign)
        .then(res => {
          if (res.data.status == 0) {
            var nextPath = this.$route.query.nextPage;
            // console.log(this.$route.query);
            // console.log(nextPath?nextPath:'/admin');
            this.$router.push(nextPath?nextPath:'/admin');
          } else {
            alert(res.data.message);
          }
        })
        .catch(res => console.log(alert("error")));
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  width: 640px;
  height: 320px;
  border: 2px solid #fff;
  border-radius: 8px;
  text-align: center;
  padding: 30px;
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  .login-form {
    width: 320px;
    margin: 50px auto;
    transform: translateX(-40px);
  }
}
</style>