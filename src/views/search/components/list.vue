<!--  -->
<template>
   <!--  -->
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    title="手册文件"
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
                <el-link type="primary">{{scope.row.aa}}</el-link>
            </template>
          </el-table-column>
          
        </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
        dialog:false,
        tableData:[
            {
                aa:"测试文件1"
            },
            {
                aa:"测试文件2"
            },{
                aa:"测试文件3"
            }
        ]
    };
  },
  methods:{
      cancel(){

      }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>