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
          :model="form"
          label-width="137px"
          size="mini"
          label-position="left"
          v-show="!isMaintain"
        >
          <el-form-item>
            <span slot="label">
              文件类型：
              <br />(Doc. Type)
            </span>
            <el-select v-model="form.aa">
              <el-option v-for="item in docType" 
              :key="item.label"
              :label="item.label" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <span slot="label">
              文件号：
              <br />(Doc. No.)
            </span>
             <el-input v-model="form.bb"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              手册标题：
              <br />(Doc. Title)
            </span>
             <el-input v-model="form.cc"></el-input>
          </el-form-item>
          <el-form-item>
             <span slot="label">
              版次：
              <br />(Revision Level)
            </span>
            <el-input v-model="form.dd"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              生效日期：
              <br />(Issue Date)
            </span>
            <el-date-picker
              v-model="form.ee"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
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
            <el-select v-model="form.ff"  :disabled="getIsDisable('ff')"></el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              发动机：
              <br />(engine)
            </span>
            <el-select v-model="form.gg" :disabled="getIsDisable('gg')"></el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              起落架：
              <br />(lg)
            </span>
            <el-input v-model="form.hh" :disabled="getIsDisable('hh')"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              APU：
              <br />(APU)
            </span>
            <el-input v-model="form.ii" :disabled="getIsDisable('ii')"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              附件：
              <br />(Component)
            </span>
            <el-input v-model="form.jj" :disabled="getIsDisable('jj')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询（Search）</el-button>
            <el-button type="primary" icon="el-icon-reset">重置（Reset）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-s-promotion">导出报表（Export Report）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit" @click="handleMaintain">维护（Maintain）</el-button>
          </el-form-item>
        </el-form>
        <el-form
          ref="addForm"
          :model="addForm"
          label-width="137px"
          size="mini"
          label-position="left"
          v-show="isMaintain"
        >
         
          <el-form-item>
            <span slot="label">
              文件号：
              <br />(Doc. No.)
            </span>
             <el-input v-model="addForm.aa"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              手册标题：
              <br />(Doc. Title)
            </span>
             <el-input v-model="addForm.bb"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              说明：
              <br />(Instruction)
            </span>
             <el-input v-model="addForm.cc"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              文件类型：
              <br />(Doc. Type)
            </span>
            <el-select v-model="addForm.dd">
              <el-option v-for="item in docType" 
              :key="item.label"
              :label="item.label" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              版次：
              <br />(Revision Level)
            </span>
            <el-input v-model="addForm.ee"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              颁发日期：
              <br />(Issue Date)
            </span>
            <el-date-picker
              v-model="addForm.ff"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="适用性：">
            <span slot="label">
              适用性：
              <br />(Applicable)
            </span>
            <el-input v-model="addForm.gg"></el-input>
          </el-form-item>
           <el-form-item>
            <span slot="label">
              文件颁发者：
              <br />(Issued BY)
            </span>
            <el-input v-model="addForm.hh"></el-input>
          </el-form-item>
           <el-form-item>
            <span slot="label">
              文件持有者：
              <br />(Hold by)
            </span>
            <el-input v-model="addForm.ii"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              上传手册文件：
              <br />(Upload Manual File)
            </span>
            <el-upload
              :on-change="handleChange"
              :file-list="form.component"
              :limit="1"
              action="/"
              :auto-upload="false"
              accept=".pdf"
              :on-remove="handleRemove"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件格式仅支持pdf</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus">增加（Add）</el-button>

            <el-button type="primary" icon="el-icon-reset">重置（Reset）</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="isMaintain = false">取消（Cancel）</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="main-right" :class="collapse?'collapse-main-right':''">
      <div class="right-wrapper">
        <el-table :data="tableData" style="width: 100%;" :height="tableHeight" border>
          <el-table-column type="index" align="center" width="50"></el-table-column>
          <el-table-column prop="xx" min-width="100">
            <template slot="header">
              <span>
                下载
                <br />(Down)
              </span>
            </template>
             </el-table-column>
             <el-table-column prop="aa" min-width="105">
            <template slot="header">
              <span>
                文件号
                <br />(Doc. No.)
              </span>
            </template>
             </el-table-column>
       
       
          <el-table-column prop="cc" min-width="135" sortable>
            <template slot="header">
              <span style="color:#ff4949">
                手册标题
                <br />(Doc. Title)
              </span>
            </template>
            <template slot-scope="scope">
              <el-link type="primary" @click="detail(scope.row)">{{scope.row.cc}}</el-link>
            </template>
          </el-table-column>
           <el-table-column prop="dd" min-width="140" sortable>
            <template slot="header">
              <span>
                说明
                <br />(Instruction)
              </span>
              
            </template>
              <template slot-scope="scope">
              <el-link type="primary">{{scope.row.cc}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="dd" min-width="135" sortable>
            <template slot="header">
              <span>
                文件类型
                <br />(Doc. Type)
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ee" min-width="135">
            <template slot="header">
              <span>
                版次
                <br />(Revision Level)
              </span>
            </template>
          </el-table-column>
           <el-table-column prop="ff" min-width="135" sortable>
            <template slot="header">
              <span>
                颁发日期
                <br />(issue date)
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
          </el-table-column>
           <el-table-column prop="ff" min-width="135" sortable>
            <template slot="header">
              <span>
                文件颁发者
                <br />(Issued by)
              </span>
            </template>
          </el-table-column>
           <el-table-column prop="ff" min-width="135" sortable>
            <template slot="header">
              <span>
                文件持有者
                <br />(Hold by)
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
          :page-sizes="[10,20,30,40,50]"
          :page-size="10"
          :pager-count="5"
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
      isMaintain: false,
      collapse: false,
      docType:[
        {
          label:"EB"
        },
        {
          label:"MT"
        }
      ],
      form: {
        aa: "",
        bb: "",
        ee: "",
        dd: "",
        ee: "",
        ff: "",
        gg:"",
        hh:"",
        ii:"",
        jj:""
      },
      addForm: {
        aa: "",
        bb: "",
        ee: "",
        dd: "",
        ee: "",
        ff: "",
        gg: "",
        hh:"",
        ii:"",
        jj:"",
        component: [],
      },
      tableData: [
        {
          read: false,
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB/MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
        {
          read: true,
          aa: "CCA",
          bb: "测试内容",
          cc: "中英文内容",
          dd: "EB/MT",
          ee: "测试内容",
          ff: "测试内容",
          gg: "",
        },
      ],
      currentPage4: 1,
      tableHeight: "auto",
    };
  },
  methods: {
    getIsDisable(field){
      let fieldArr = ['ff','gg','hh','ii','jj'];
      fieldArr = fieldArr.filter(t=>t!==field)
      let val = fieldArr.some(fie=>{
        if(this.form[fie]){
          return true
        }
      })
      return val
    },
    handleChange(file, fileList) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "pdf";
      if (!extension) {
        this.$message.warning("上传文件只能是pdf格式!");
        this.addForm.file = [];
        return false;
      }
      this.addForm.component = fileList;
    },
    handleRemove(file, fileList) {
      this.addForm.component = fileList;
    },
    handleMaintain() {
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
        window.open("JavaScript设计模式与开发实践.pdf");
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