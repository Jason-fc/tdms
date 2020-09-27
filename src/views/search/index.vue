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
        <el-form
          ref="form"
          :model="searchForm"
          label-width="137px"
          size="mini"
          label-position="left"
          v-show="!isMaintain"
        >
          <el-form-item>
            <span slot="label">
              用户
              <br />(Customer)
            </span>
            <el-input v-model="searchForm.cus"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              文件类型：
              <br />(Doc. Type)
            </span>
            <el-select v-model="searchForm.type">
            
              <el-option
                v-for="item in docType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
             
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              文件编号：
              <br />(Doc. No.)
            </span>
            <el-input v-model="searchForm.mtnbr"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              标题：
              <br />(Doc. Title)
            </span>
            <el-input v-model="searchForm.subjectZh"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              适用性：
              <br />(Applicable)
            </span>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              机型：
              <br />(aircraft)
            </span>
            <el-select
              v-model="searchForm.effectAircraft"
              :disabled="getIsDisable('effectAircraft')"
            ></el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              机号：
              <br />(number)
            </span>
            <el-input
              v-model="searchForm.effectAircraftReg"
              :disabled="getIsDisable('effectAircraftReg')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              发动机：
              <br />(engine)
            </span>
            <el-select v-model="searchForm.effectEngine" :disabled="getIsDisable('effectEngine')"></el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              起落架：
              <br />(lg)
            </span>
            <el-input v-model="searchForm.effectLg" :disabled="getIsDisable('effectLg')"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              APU：
              <br />(APU)
            </span>
            <el-input v-model="searchForm.effectApu" :disabled="getIsDisable('effectApu')"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              附件：
              <br />(Component)
            </span>
            <el-input
              v-model="searchForm.effectComponent"
              :disabled="getIsDisable('effectComponent')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">查询（Search）</el-button>
            <el-button type="primary" icon="el-icon-reset" @click="onReset">重置（Reset）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-s-promotion">导出报表（Export Report）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit" @click="handleMaintain">维护（Maintain）</el-button>
          </el-form-item>
        </el-form>
        <eform ref="eform" :isMaintain.sync="isMaintain" :is-add="isAdd"></eform>
      </div>
    </div>
    <div class="main-right" :class="collapse?'collapse-main-right':''">
      <div class="right-wrapper">
        <el-table
          :data="tableData"
          style="width: 100%;"
          :height="tableHeight"
          border
          v-loading="loading"
        >
          <el-table-column type="index" align="center" width="50"></el-table-column>
          <el-table-column prop="cus" min-width="210" align="left">
            <template slot="header">
              <span>
                用户
                <br />(Customer)
              </span>
            </template>
            <template slot-scope="scope">
              <div v-for="item in scope.row.customerArr" :key="item">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="mtnbr" min-width="105">
            <template slot="header">
              <span>
                文件编号
                <br />(Doc. No.)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="subjectZh" min-width="210" sortable>
            <template slot="header">
              <span style="color:#ff4949">
                标题
                <br />(Doc. Title)
              </span>
            </template>
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="detail(scope.row)"
                :underline="false"
              >{{scope.row.subjectZh}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="type" min-width="135" sortable>
            <template slot="header">
              <span>
                文件类型
                <br />(Doc. Type)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="revisionLevel" min-width="135">
            <template slot="header">
              <span>
                版次
                <br />(Revision Level)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="effdate" min-width="135" sortable>
            <template slot="header">
              <span>
                生效日期
                <br />(Issue Date)
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="gg" min-width="115">
            <template slot="header">
              <span>
                适用性
                <br />(Applicable)
              </span>
            </template>
            <template slot-scope="{row}">
              <el-popover placement="bottom" width="250" trigger="hover" :open-delay="300">
                <el-form :model="row" size="mini" class="popoverForm">
                  <el-form-item label="飞机 AIRCRAFT：">
                    <div>机型：{{row.effectAircraft}}</div>
                    <div>机号：{{row.effectAircraftReg}}</div>
                  </el-form-item>
                  <el-form-item label="发动机 ENGINE：">
                    <div>{{row.effectEngine}}</div>
                  </el-form-item>
                  <el-form-item label="APU：">
                    <div>{{row.effectApu}}</div>
                  </el-form-item>
                  <el-form-item label="LG：">
                    <div>{{row.effectLg}}</div>
                  </el-form-item>
                  <el-form-item label="附件 COMPONENT：">
                    <div>{{row.effectComponent}}</div>
                  </el-form-item>
                </el-form>
                <div
                  slot="reference"
                  class="ellipsis"
                >{{`飞机AIRCRAFT：${row.effectAircraft}发动机 ENGINE：${row.effectEngine}`}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="effectDept" min-width="210">
            <template slot="header">
              <span>
                适用部门
                <br />(CC & Send to)
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" v-if="isMaintain" width="150">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" title="修改" @click="edit(scope.row)">修改</el-button>
              <el-button type="danger" size="mini" title="失效" @click="sxFunc(scope.row.id)">失效</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :total="total"
          :current-page="page"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
    </div>
    <list ref="list" :pdfList="pdfList"></list>
  </el-row>
</template>

<script>
import list from "./components/list";
import { getPageList, queryPdf ,cancel} from "@/api/search";
import eform from "./components/form";
import { cleanObject } from "@/utils/index";
export default {
  name: "search",
  components: {
    list,
    eform,
  },
  data() {
    return {
      isAdd:false,
      loading: false,
      isMaintain: false,
      collapse: false,
      docType: [
        {
          label: "EB",
        },
        {
          label: "MT",
        },
      ],
      searchForm: {},

      tableData: [],
      tableHeight: "auto",
      size: 10,
      page: 1,
      total: 0,
      pdfList: [],
    };
  },
  methods: {
    getIsDisable(field) {
      let fieldArr = [
        "effectAircraft",
        "effectAircraftReg",
        "effectEngine",
        "effectComponent",
        "effectApu",
        "effectApu",
      ];
      fieldArr = fieldArr.filter((t) => t !== field);
      let val = fieldArr.some((fie) => {
        if (this.searchForm[fie]) {
          return true;
        }
      });
      return val;
    },
    edit(row){
      this.isAdd = false;
      let _this = this.$refs.eform;
      _this.form = {
        ...row
      }
      queryPdf({ tdmsId: row.id })
        .then((res) => {
          if (res.code === "200") {
            let pdfList = res.obj || [];
            pdfList.forEach(t=>{
              t.name = t.fileName;
              t.uid = t.id;
            })
            _this.form.tdmsFileList = pdfList;
            _this.fileList = pdfList;
          } else {
            this.$message.error(res.msg);
             _this.form.tdmsFileList = [];
            _this.fileList = [];
          }
        })
        .catch(() => {
           _this.form.tdmsFileList = [];
            _this.fileList = [];
        });
    },
    handleMaintain() {
      this.isAdd = true;
      this.isMaintain = true;
    },
    sxFunc(id){
      this.$confirm("是否将此条记录更改为失效?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cancel(id)
          .then((res) => {
            if (res.code === "200") {
              this.$message({
                message: "操作",
                type: "success",
              });
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
          });
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    init() {
      let params = {
        ...this.searchForm,
        pageNum: this.page,
        pageSize: this.size,
      };
      params = cleanObject(params);
      this.loading = true;
      getPageList(params)
        .then((res) => {
          this.loading = false;
          if (res.code === "200") {
            let arr = res.obj || [];
            arr.forEach((t) => {
              if (t.cus) {
                t.customerArr = t.cus.split(";");
              } else {
                t.customerArr = [];
              }
            });
            this.tableData = arr;
            this.total = Number(res.total);
            if (!res.total) {
              this.total = 0;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    pageChange(e) {
      for (let i in this.searchForm) {
        this.searchForm[i] = "";
      }
      this.page = e;
      this.init();
    },
    sizeChange(e) {
      for (let i in this.searchForm) {
        this.searchForm[i] = "";
      }
      this.size = e;
      // 更换size page重置为1
      this.page = 1;
      this.init();
    },
    onSearch() {
      this.init();
    },
    onReset() {
      for (let i in this.searchForm) {
        this.searchForm[i] = "";
      }
      this.init();
    },
    detail(row) {
      let _this = this.$refs.list;
      queryPdf({ tdmsId: row.id })
        .then((res) => {
          if (res.code === "200") {
            this.pdfList = res.obj || [];
            if (this.pdfList.length == 1) {
              let url = `${this.fileURL}${this.pdfList[0].filePath}/${this.pdfList[0].fileName}`;
              window.open(url);
            } else if (this.pdfList.length > 1) {
              let _this = this.$refs.list;
              _this.dialog = true;
            } else {
              this.$message.warning('暂无pdf文件');
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight =
        document.querySelector(".main-right").offsetHeight - 33;
    });
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>

<style lang="scss" scoped>
 .el-select-dropdown__wrap{
  .checkAll ::v-deep{
    .el-checkbox__label{
      color:red;
    }
  }
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  left: 1.25rem;
  z-index: 1;
  color: #fff;
  top: 1px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check {
  background-color: #409eff;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item .check {
  display: inline-block;
  position: relative;
  border: 1px solid #409eff;
  border-radius: 2px;
  box-sizing: border-box;
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: middle;
  margin-right: 10px;
  transition: border-color 0.25s cubic-bezier(0.71, -0.49, 0.26, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.49, 0.26, 1.46);
}
</style>