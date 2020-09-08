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
             <el-radio-group v-model="form.aa">
              <el-radio :label="3">备选项</el-radio>
              <el-radio :label="6">备选项</el-radio>
              <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
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
            <el-button type="primary" icon="el-icon-plus" v-if="isMaintain">增加（Add）</el-button>
            <el-button type="primary" icon="el-icon-search" v-else>查询（Search）</el-button>
            <el-button type="primary" icon="el-icon-reset">重置（Reset）</el-button>
          </el-form-item>
          <el-form-item v-if="!isMaintain">
            <el-button type="primary" icon="el-icon-s-promotion">导出报表（Export Report）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit" @click="handleMaintain">维护（Maintain）</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="main-right" :class="collapse?'collapse-main-right':''">
      <div class="right-wrapper">
        <el-table :data="tableData" style="width: 100%;" :height="tableHeight" border>
          <el-table-column type="index" align="center" width="50"></el-table-column>
          <el-table-column prop="aa" min-width="105">
            <template slot="header">
              <span>
                客户
                <br />(Customer)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="bb" min-width="105">
            <template slot="header">
              <span>
                文件号
                <br />(Doc.No)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="cc" min-width="105">
            <template slot="header">
              <span>
                手册标题
                <br />(Doc.Title)
              </span>
            </template>
            <template slot-scope="scope" min-width="105">
              <el-link type="primary" @click="detail(scope.row)">{{scope.row.cc}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="dd" min-width="105">
            <template slot="header">
              <span>
                文件类型
                <br />(Doc.Type)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ee" min-width="115">
            <template slot="header">
              <span>
                版次
                <br />(Revision Level)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ff" min-width="105">
            <template slot="header">
              <span>
                生效日期
                <br />(issue date)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="gg" min-width="105">
            <template slot="header">
              <span>
                适用性
                <br />(Applicable)
              </span>
            </template>
          </el-table-column>
           <el-table-column label="操作" align="center" fixed="right" v-if="isMaintain">
            <template>
              <el-button type="danger" size="mini" title="失效">失效</el-button>
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
import list from "./components/list";
export default {
  name: "search",
  components: {
    list,
  },
  data() {
    return {
      isMaintain:false,
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
          read: false,
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          read: true,
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
      ],
      currentPage4: 4,
      tableHeight: "auto",
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    handleMaintain(){
      this.isMaintain = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    detail(row) {
      let _this = this.$refs.list;
      if (row.read) {
        _this.dialog = true;
      } else {
        // let DownloadLink = document.createElement("a");
        // document.body.appendChild(DownloadLink);
        // DownloadLink.style.display = "none";
        // DownloadLink.target = '_blank'
        // DownloadLink.href = "JavaScript设计模式与开发实践.pdf";
        // DownloadLink.click();
        // document.body.removeChild(DownloadLink);
        window.open("JavaScript设计模式与开发实践.pdf")
      }
    },
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