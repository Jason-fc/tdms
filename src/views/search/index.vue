<!--  -->
<template>
  <el-row class="component-container flex-row-start">
    <div class="toolbar-btn" :class="collapse?'collapse-tollbar-btn':''">
      <i class="el-icon-d-arrow-right" @click="collapse =!collapse"></i>
    </div>
    <div class="main-left" :class="collapse?'collapse-main-left':''">
      <div class="toolbar flex-row-spaceBetween">
        <p>功能菜单(Manual)</p>
        <i class="el-icon-d-arrow-left" @click="collapse =!collapse"></i>
      </div>
      <div class="menuForm">
        <el-form ref="form" :model="form" label-width="137px" size="mini" label-position="left">
          <el-form-item label="适用性：">
            <el-radio v-model="form.aa" label="1">备选</el-radio>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              机型：
              <br />(aircraft)
            </span>
            <el-select v-model="form.bb"></el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              发动机：
              <br />(engine)
            </span>
            <el-select v-model="form.cc"></el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              起落架：
              <br />(lg)
            </span>
            <el-input v-model="form.dd"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              APU：
              <br />(APU)
            </span>
            <el-input v-model="form.ee"></el-input>
          </el-form-item>
          <el-form-item label="	ATA章节号：">
            <span slot="label">
              附件：
              <br />(component)
            </span>
            <el-input v-model="form.ff"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询（Search）</el-button>
            <el-button type="primary" icon="el-icon-reset">重置（Reset）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-s-promotion">导出报表（Export Report）</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="main-right" :class="collapse?'collapse-main-right':''">
      <div class="right-wrapper">
        <el-table :data="tableData" style="width: 100%;" :height="tableHeight" border>
          <el-table-column type="index" align="center" width="50"></el-table-column>
          <el-table-column prop="aa">
            <template slot="header">
              <span>
                客户
                <br />(Customer)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="bb">
              <template slot="header">
              <span>
                文件号
                <br />(Doc.No)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="cc">
              <template slot="header">
              <span>
                手册标题
                <br />(Doc.Title)
              </span>
            </template>
            <template slot-scope="scope">
                <el-link type="primary" @click="detail">{{scope.row.cc}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="dd">
              <template slot="header">
              <span>
                文件类型
                <br />(Doc.Type)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ee">
              <template slot="header">
              <span>
                版次
                <br />(Revision Level)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ff">
              <template slot="header">
              <span>
                生效日期
                <br />(issue date)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="gg">
              <template slot="header">
              <span>
                适用性
                <br />(Applicable)
              </span>
            </template>
          </el-table-column>
            <el-table-column prop="ff">
              <template slot="header">
              <span>
                生效日期
                <br />(issue date)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="gg">
              <template slot="header">
              <span>
                适用性
                <br />(Applicable)
              </span>
            </template>
          </el-table-column>
            <el-table-column prop="ff">
              <template slot="header">
              <span>
                生效日期
                <br />(issue date)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="gg">
              <template slot="header">
              <span>
                适用性
                <br />(Applicable)
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          background
        ></el-pagination>
      </div>
    </div>
    <list ref="list"></list>
  </el-row>
</template>

<script>
import list from './components/list'
export default {
  name: "search",
  components:{
      list
  },
  data() {
    return {
      collapse: false,
      form: {
        aa: "",
        bb: "",
        ee: "",
        dd: "",
        ee: "",
        ff: "",
      },

      tableData: [
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
         {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
         {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
         {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
         {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
         {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB或MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
      ],
      currentPage4: 4,
      tableHeight: "auto",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    detail(){
        let _this = this.$refs.list;
        _this.dialog = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight =
        document.querySelector(".main-right").offsetHeight - 30;
    });
  },
};
</script>

<style scoped lang="scss">
</style>