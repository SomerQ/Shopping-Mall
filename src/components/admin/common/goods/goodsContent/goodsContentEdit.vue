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
          <el-option :label="values.title" :value="values.category_id" v-for="(values,index) in ctList" :key="index">
            <span>
              <span v-if="values.class_layer != 1">&nbsp;|-</span>
              <span>{{values.title}}</span>
            </span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否发布" prop="status">
        <el-radio-group v-model="ruleForm.status" size="mini">
          <el-radio-button label="true"></el-radio-button>
          <el-radio-button label="false"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐类型" prop="recommend">
        <el-switch v-model="ruleForm.is_slide" active-icon-class="el-icon-picture"></el-switch>&nbsp;&nbsp;
        <el-switch v-model="ruleForm.is_top" active-icon-class="el-icon-upload2"></el-switch>&nbsp;&nbsp;
        <el-switch v-model="ruleForm.is_hot" active-icon-class="el-icon-star-on"></el-switch>
      </el-form-item>

      <el-form-item label="上传封面" prop="imgList">
        <el-upload class="uploadPics" action="http://localhost:8899/admin/article/uploadimg" :on-success="picUploaded" :on-remove="picRemoved" :file-list="ruleForm.imgList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传文件" prop="fileList">
        <el-upload class="uploadFiles" action="http://localhost:8899/admin/article/uploadfile" :on-success="fileUploaded" :on-remove="fileRemoved" :file-list="ruleForm.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
        <quill-editor v-model="ruleForm.content" ref="myQuillEditor" :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    quillEditor
  },
  data() {
    //图片上传验证
    var validateImg = (rule, value, callback) => {
      if (value === "" || value.length == 0) {
        callback(new Error("请上传一张封面图"));
      } else {
        callback();
      }
    };
    //文件上传验证
    // var validateFile = (rule, value, callback) => {
    //   if (value === "" || value.length == 0) {
    //     callback(new Error("请上传一张封面图"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      gsID: 0,
      ctList: [],
      editorOption: {},
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
        imgList: [],
        fileList: []
      },
      //表单验证规则
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        sub_title: [
          { required: true, message: "请输入副标题", trigger: "blur" },
          { min: 3, max: 140, message: "长度在 3 到 140 个字符", trigger: "blur" }
        ],
        category_id: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
        status: false,
        is_slide: false,
        is_top: false,
        is_hot: false,
        goods_no: [{ required: true, message: "请输入货号", trigger: "blur" }],
        stock_quantity: [
          { required: true, message: "请输入库存量", trigger: "blur" }
        ],
        market_price: [{ required: true, message: "请输入市场价", trigger: "blur" }],
        sell_price: [{ required: true, message: "请输入销售价", trigger: "blur" }],
        zhaiyao: [
          { required: true, message: "请输入内容摘要", trigger: "blur" },
          { min: 3, max: 300, message: "长度在 3 到 300 个字符", trigger: "blur" }
        ],
        content: [{ required: true, message: "请输入内容详情", trigger: "blur" }],
        imgList: [{ validator: validateImg, trigger: "submit" }]
        // fileList: [{ validate: validateFile, trigger: "blur" }]
      }
    };
  },
  methods: {
    //上传图片
    picUploaded(response, file, fileList) {
      // console.log(response, file, fileList);
      this.ruleForm.imgList = [];
      response.shorturl="/"+response.shorturl;
      
      this.ruleForm.imgList.push(response);
      console.log(response);
      
    },
    //上传文件
    fileUploaded(response, file, fileList) {
      console.log(response, file, fileList);
      this.ruleForm.fileList.push(response);
    },
    picRemoved(file, fileList) {
      this.ruleForm.imgList = [];
    },
    fileRemoved(file, fileList) {
      let removeUrl = file.url;
      this.ruleForm.fileList = this.ruleForm.fileList.filter(
        v => v.url != removeUrl
      );
    },
    //提交编辑内容
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("上传API：" + this.$api.gsEdit + this.gsID, this.ruleForm);
          this.$http
            .post(this.$api.gsEdit + this.gsID, this.ruleForm)
            .then(res => {
              if (res.data.status == 0) {
                this.$alert(res.data.message);
                this.$router.push({ name: "goodsContentList" });
              } else {
                this.$alert("error a error");
              }
            })
            .catch(res => {
              console.log("error!");
            });
        } else {
          this.$alert("提交错误，请检查内容！");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取商品ID
    getGoodsId() {
      this.gsID = parseInt(this.$route.params.contentId);
    },
    // 获取商品详情
    getDetails() {
      this.$http.get(this.$api.gsDetail + this.gsID).then(res => {
        this.ruleForm = res.data.message;
        this.ruleForm.category_id = parseInt(this.ruleForm.category_id);
      });
    },
    // 获取分类目录
    getCateList() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        this.ctList = res.data.message;
      });
    }
  },
  created() {
    this.getGoodsId(); //执行获取商品ID方法
    this.getDetails(); //执行获取商品详情方法
    this.getCateList(); //执行获取分类目录方法
  }
};
</script>

<style scoped>

</style>