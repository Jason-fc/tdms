<!--  -->
<template>
  <el-form
    ref="form"
    :model="form"
    label-width="137px"
    size="mini"
    label-position="left"
    v-show="isMaintain"
    :rules="rules"
  >
    <el-form-item prop="dataNumber">
      <span slot="label">
        数据编号：
        <br />(Data. Number)
      </span>
      <el-input v-model="form.dataNumber" :disabled="!isAdd"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        用户：
        <br />(Customer)
      </span>
       <el-select v-model="form.cus"></el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        文件类型：
        <br />(Doc. Type)
      </span>
       <el-select v-model="form.type">
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
      <el-input v-model="form.mtnbr"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        标题：
        <br />(Doc. Title)
      </span>
      <el-input v-model="form.subjectZh"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        版次：
        <br />(Revision Level)
      </span>
      <el-input v-model="form.revisionLevel"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        生效日期：
        <br />(Issue Date)
      </span>
      <el-date-picker
        v-model="form.effdate"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="适用性：">
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
      <el-select v-model="form.effectAircraft"></el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        机号：
        <br />(number)
      </span>
      <el-input v-model="form.effectAircraftReg"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        发动机：
        <br />(engine)
      </span>
      <el-select v-model="form.effectEngine"></el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        起落架：
        <br />(lg)
      </span>
      <el-input v-model="form.effectLg"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        APU：
        <br />(APU)
      </span>
      <el-input v-model="form.effectApu"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        附件：
        <br />(Component)
      </span>
      <el-input v-model="form.effectComponent"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        主送：
        <br />(Send to)
      </span>
      <el-input v-model="form.mainSendDept"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        抄送：
        <br />(CC)
      </span>
      <el-input v-model="form.ccSendDept"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        上传手册文件：
        <br />(Upload Manual File)
      </span>
      <el-upload
        :file-list="fileList"
        :action="baseURL+'/tdms/uploadPdf'"
        :auto-upload="true"
        accept=".pdf"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        multiple
        :on-error="error"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">文件格式仅支持pdf</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-document-checked"
        @click="submit"
      >{{isAdd?'保存（Add）':'更新（Update）'}}</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="cancel('reset')">重置（Reset）</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="cancel('cancel')">取消（Cancel）</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { add,modify } from "@/api/search";
export default {
  props: {
    isMaintain: {
      type: Boolean,
      default: false,
    },
    isAdd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
       docType: [
        {
          label: "EB",
        },
        {
          label: "MT",
        },
      ],
      form: {
        tdmsFileList: [],
      },
      fileList: [],
      loading: false,
      rules:{
        dataNumber:[ { required: true, message: '请输入数据编号', trigger: 'blur' },]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doModify();
        }
      });
    },
    doAdd() {
      let data = {
        ...this.form,
      };
      add(data)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.cancel('reset');
            this.$parent.$parent.handleMaintain();
            this.loading = false;
            this.$parent.$parent.onReset();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    doModify() {
      modify(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$parent.$parent.handleMaintain();
            this.cancel('reset');
            this.form.dataNumber = '';
            this.loading = false;
            this.$parent.$parent.onReset();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    handleSuccess(response, file, fileList) {
      this.form.tdmsFileList.push({
        ...response.obj,
        uid: file.uid,
      });
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      let index = this.form.tdmsFileList.findIndex((t) => t.uid == file.uid);
      this.form.tdmsFileList.splice(index, 1);
      this.fileList = fileList;
    },
    error(err, file, fileList) {
      this.$message.error("上传失败");
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "pdf";
      if (!extension) {
        this.$message.warning("上传文件只能是pdf格式!");
        this.fileList = [];
        return false;
      }
    },
    cancel(type) {
      for (let i in this.form) {
        if(type ==='cancel'){
          this.form[i] = "";
        }else{
          if(!this.isAdd){
            if(i !== 'dataNumber'){
              this.form[i] = "";
            }
          }else{
             this.form[i] = "";
          }
        } 
        
      }
      this.form.tdmsFileList = [];
      this.fileList = [];
      if (type === "cancel") {
        this.$emit("update:isMaintain", false);
      }
    },
  },
};
</script>
<style lang="scss">
.el-progress {
  .el-progress-bar__inner {
    background-color: #e6a23c;
  }
  .el-progress__text {
    color: #fff;
  }
  .el-icon-upload-success {
    color: #fff;
  }
}

/* @import url(); 引入css类 */
</style>