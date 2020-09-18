<!-- 多个pdf展示 -->
<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    title="手册文件 Manual File"
    width="860px"
  >
    <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column type="index" align="center" width="50"></el-table-column>
      <el-table-column prop="aa" align="center" sortable>
        <template slot="header">
          <span>
            文件名
            <br />(File Name)
          </span>
        </template>
        <template slot-scope="scope">
          <el-link type="primary" @click="detail(scope.row.url)">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    pdfList: {
      type: Array,
    },
  },
  computed: {
    tableData() {
      return this.pdfList.map((t) => {
        return {
          name: t.fileName,
          url: `${t.filePath}/${t.fileName}`,
        };
      });
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    detail(url) {
      window.open(this.fileURL + url);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>