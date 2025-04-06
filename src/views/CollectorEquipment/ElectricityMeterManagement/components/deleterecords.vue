<template>
  <!-- 删表记录 -->
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="电表地址：">
        <el-input
          v-model="form.address"
          placeholder="请输入电表地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="电表备注：">
        <el-input v-model="form.remark" placeholder="请输入电表备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" plain>清空</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData"  style="width: 100%" border ref="table">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template>
            <div>
              <el-button type="text" size="mini">操作记录</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "",
        remark: "",
      },
      tableData: [],
      columns: [
        { prop: "id", label: "序号" },
        { prop: "collector", label: "采集器" },
        { prop: "address", label: "通讯地址" },
        { prop: "user", label: "用户" },
        { prop: "remark", label: "备注" },
        { prop: "powerconsumption", label: "用电量" },
        { prop: "remainingamount", label: "剩余金额" },
        { prop: "operator", label: "操作员" },
        { prop: "deletetime", label: "删除时间" },
      ],
    };
  },
};
</script>
