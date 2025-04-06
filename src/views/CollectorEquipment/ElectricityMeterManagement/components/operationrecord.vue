<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.grouping" placeholder="">
          <el-option label="全部" value="allgrouping"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作员">
        <el-select v-model="form.operator" filterable>
          <el-option label="全部" value="alloperator"></el-option>
          <el-option label="APP用户" value="appuser"></el-option>
          <el-option label="公众号用户" value="publicuser"></el-option>
          <el-option label="设备码用户" value="deviceuser"></el-option>
          <el-option label="API接口用户" value="APIuser"></el-option>
          <el-option label="小程序用户" value="miniprogramuser"></el-option>
          <el-option label="大飞" value="dafei"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="warning">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <div>
      <el-table :data="tableData"  style="width: 100%" border ref="table">
        <el-table-column type="selection" width="55"> </el-table-column>
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
              <el-button type="text" size="mini">日志</el-button>
              <el-button type="text" size="mini">订单详情</el-button>
              <el-button type="text" size="mini">打印收据</el-button>
              <el-button type="text" size="mini">重试</el-button>
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
        grouping: "allgrouping",
        operator: "alloperator",
      },
      tableData: Array.from({ length: 10 }).map((_, index) => ({
        grouping: `${index + 1}楼`,
        collectorId: "2120129050151",
        mailaddress: "123456789",
        user: "101",
        operator: "APP用户",
        operationtime: "2021-01-01 12:00:00",
        func: "开户",
        operationremark: "",
        state: "未开户",
        result: "成功",
      })),
      columns: [
        { prop: "grouping", label: "分组" },
        { prop: "collectorId", label: "采集器" },
        { prop: "mailaddress", label: "通讯地址" },
        { prop: "user", label: "用户" },
        { prop: "operator", label: "操作者" },
        { prop: "operationtime", label: "操作时间" },
        { prop: "func", label: "功能" },
        { prop: "operationremark", label: "操作备注" },
        { prop: "state", label: "状态" },
        { prop: "result", label: "结果" },
      ],
    };
  },
};
</script>
