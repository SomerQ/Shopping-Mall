<template>
    <div>
        <div class="breadUrl">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>商城首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/admin/goods/goodsContentList' }">内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="btnGroup">
            <el-button-group>
                <el-button plain icon="el-icon-plus" size="mini">新增</el-button>
                <el-button plain icon="el-icon-check" size="mini" @click="selectAll">全选</el-button>
                <el-button plain icon="el-icon-delete" size="mini" @click="deleteGoods">删除</el-button>
            </el-button-group>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="dataObj.searchvalue" class="searchInput" @blur="getProductData">
            </el-input>
        </div>
        <div class="dataTable">
            <el-table ref="multipleTable" :data="productData" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="标题" width="">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" placement="right">
                            <div slot="content">
                                <img :src="scope.row.imgurl" alt="商品详图" style="width:200px">
                            </div>
                            <router-link :to="{name:'goodsContentEdit',params:{contentId:scope.row.id}}">{{ scope.row.title }}</router-link>
                        </el-tooltip>

                    </template>
                </el-table-column>

                <el-table-column prop="categoryname" label="所属类别" width="160">
                </el-table-column>
                <el-table-column prop="stock_quantity" label="货存" width="120">
                </el-table-column>
                <el-table-column prop="market_price" label="市场价" width="120">
                </el-table-column>
                <el-table-column prop="sell_price" label="销售价" width="120">
                </el-table-column>
                <el-table-column label="属性" width="160">
                    <template slot-scope="scope">
                        <i :class="[scope.row.is_slide == 1?'el-icon-picture':'el-icon-picture-outline']"></i>
                        <i :class="[scope.row.is_top == 1?'el-icon-upload2':'el-icon-download']"></i>
                        <i :class="[scope.row.is_hot == 1?'el-icon-star-on':'el-icon-star-off']"></i>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <router-link :to="{name:'goodsContentEdit',params:{contentId:scope.row.id}}">修改</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div>
        </div>
        <div class="pagination">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="dataObj.pageIndex" :page-sizes="pageSizes" :page-size="dataObj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPages">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      productData: [],
      multipleSelection: [],
      dataObj: {
        pageIndex: 1,
        pageSize: 10,
        searchvalue: ""
      },
      pageSizes: [10, 20, 40, 50],
      totalPages:0
    };
  },

  methods: {
      selectAll(){
          document.querySelector('.el-checkbox__inner').click();
      },
    getProductData() {
      this.$http
        .get(this.$api.gsList, { params: this.dataObj })
        .then(res => {
          this.productData = res.data.message;
          this.totalPages = res.data.totalcount;
        })
        .catch(res => alert(res.data.message));
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    selectionChange(val) {
      this.multipleSelection = val;
    },
    deleteGoods() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMethod();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteMethod() {
      var idArr = this.multipleSelection.map(v => v.id);
      var dataStr = idArr.join(",");
      console.log(dataStr);
      this.$http
        .get(this.$api.gsDel + dataStr)
        .then(res => {
          if (res.data.status == 0) {
            this.getProductData();
            this.multipleSelection=[];
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.alert(res.data.message);
          }
        })
        .catch(res => console.log(error));
    },
    sizeChange(val) {
      this.dataObj.pageSize = val;
      this.getProductData();
    },
    currentChange(val) {
      this.dataObj.pageIndex = val;
      this.getProductData();
    }
  },
  created() {
    this.getProductData();
  }
};
</script>

<style lang="less" scoped>
.breadUrl {
  border-bottom: 1px solid #ccc;
  padding: 15px 10px;
  .el-breadcrumb {
    font-size: 20px;
  }
}
.btnGroup {
  margin: 10px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  line-height: 50px;
  .searchInput {
    width: 180px;
    float: right;
  }
}
.pagination {
  height: 50px;
  padding-top: 20px;
  padding-left: 20px;
}
</style>