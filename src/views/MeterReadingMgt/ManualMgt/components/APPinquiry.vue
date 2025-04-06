<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      ref="tableRef"
    >
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="grouping" label="分组"></el-table-column>
      <el-table-column prop="app_name" label="采集器编号"></el-table-column>
      <el-table-column prop="mail_address" label="通讯地址"></el-table-column>
      <el-table-column prop="user" label="用户"></el-table-column>
      <el-table-column prop="cb_time" label="抄表时间"></el-table-column>
      <el-table-column prop="func" label="功能"></el-table-column>
      <el-table-column prop="data" label="数据"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="result" label="结果"></el-table-column>
      <el-table-column prop="operate" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>
