<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="内容标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="请选择类别">
                    <el-option :label="values.title" :value="values.category_id" v-for="(values,index) in ctList" :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否发布" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型" prop="recommend">
                <el-switch v-model="ruleForm.is_slide"></el-switch>
                <el-switch v-model="ruleForm.is_top"></el-switch>
                <el-switch v-model="ruleForm.is_hot"></el-switch>
            </el-form-item>

            <el-form-item label="上传封面" prop="imgList">
            </el-form-item>
            <el-form-item label="上传文件" prop="fileList">
            </el-form-item>

            <el-form-item label="货号" prop="goods_no">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价" prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价" prop="sell_price">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      gsID: 0,
      ctList:[],
      ruleForm: {
        title: "",
        sub_title: "",
        category_id: 0,
        status: false,
        is_slide: false,
        is_top: false,
        is_hot: false,
        goods_no: "",
        stock_quantity: "",
        market_price: 0,
        sell_price: 0,
        zhaiyao: "",
        content: "",
        imgList: "",
        fileList: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        date1: [
          { type: "date", required: true, message: "请选择日期", trigger: "change" }
        ],
        date2: [
          { type: "date", required: true, message: "请选择时间", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getGoodsId() {
      this.gsID = parseInt(this.$route.params.contentId);
    },
    getDetails() {
      //   var gsID = this.$route.params.contentId;
      // console.log(gsID);
      this.$http.get(this.$api.gsDetail + this.gsID).then(res => {
        // console.log(res);
        this.ruleForm = res.data.message;
        this.ruleForm.category_id=parseInt(this.ruleForm.category_id);
      });
    },
    getCateList() {
        this.$http.get(this.$api.ctList + 'goods')
        .then(res=>{
            this.ctList=res.data.message;
            console.log(this.ctList);
        })
    }
  },
  created() {
    this.getGoodsId();
    this.getDetails();
    this.getCateList();
  }
};
</script>

<style scoped>

</style>