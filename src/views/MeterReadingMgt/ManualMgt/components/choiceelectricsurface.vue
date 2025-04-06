<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.region" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器">
        <el-select v-model="form.collector" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="采集器一" value="cjq1"></el-option>
          <el-option label="采集器二" value="cjq2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电表地址：">
        <el-input
          v-model="form.address"
          placeholder="搜索电能表地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户姓名：">
        <el-input v-model="form.name" placeholder="搜索用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="电表备注：">
        <el-input
          v-model="form.remark"
          placeholder="搜索电能表备注信息"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-group">
      <el-button type="primary">确定</el-button>
      <el-button type="primary" @click="selectAll">全选</el-button>
      <el-button type="primary" @click="deselectAll">全不选</el-button>
      <el-button type="danger">清空</el-button>
    </div>

    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      ref="tableRef"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="region" label="分组"> </el-table-column>
      <el-table-column prop="collector" label="采集器"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="address" label="通讯质量"> </el-table-column>
      <el-table-column prop="address_dz" label="通讯地址"> </el-table-column>
      <el-table-column prop="user" label="用户"> </el-table-column>
      <el-table-column prop="notes" label="备注"> </el-table-column>
      <el-table-column prop="status2" label="状态"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: "all",
        collector: "all",
        address: "",
        name: "",
        remark: "",
      },
      tableData: Array.from({ length: 10 }, () => ({
        region: "分组一",
        collector: "采集器一",
        status: "已连接",
        address: "123456789",
        address_dz: "",
        user: "101",
        notes: "无",
        status2: "正常",
      })),
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.form);
    },
    selectAll() {
      this.selectedRows = this.tableData.slice(); // 复制所有行数据
      this.$refs.tableRef.clearSelection(); // 清除当前选择
      this.selectedRows.forEach((row) => {
        this.$refs.tableRef.toggleRowSelection(row, true); // 全选
      });
    },
    deselectAll() {
      this.selectedRows = []; // 清空选中的行
      this.$refs.tableRef.clearSelection(); // 清除当前选择
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection; // 更新选中的行
    },
  },
};
</script>

<style scoped lang="scss">
.btn-group {
  margin: 15px 0;
}
</style>
