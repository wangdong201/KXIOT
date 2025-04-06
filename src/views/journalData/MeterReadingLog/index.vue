<template>
  <div class="app-container">
    <div class="header-title">查看抄表数据</div>
    <div class="form-container">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="分组">
          <el-select v-model="form.grouping" placeholder="">
            <el-option label="全部" value="allgrouping"></el-option>
            <el-option label="分组一" value="fz1"></el-option>
            <el-option label="分组二" value="fz2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <DynamicTable :tableData="tableData" :columns="columns" />
    </div>
  </div>
</template>

<script>
import DynamicTable from "../components/DynamicTable.vue";
export default {
  name: "MeterReadingLog",
  components: {
    DynamicTable,
  },
  data() {
    return {
      form: {
        grouping: "allgrouping",
      },
      tableData: Array.from({ length: 88 }, (_, index) => ({
        serialnum: `${index + 1}`,
        grouping: "分组一",
        name: "张大炮1",
        collector: "132321",
        txaddress: "132321",
        user: "101",
        triggertime: "2021-08-01 10:00:00",
        executiondelay: "0.5秒",
        executiontime: "3秒",
        time: "2021-08-01 10:00:00",
        quantitynum: "100",
        result: "正常",
      })),
      columns: [
        { prop: "serialnum", label: "序号" },
        { prop: "grouping", label: "分组" },
        { prop: "name", label: "名称" },
        { prop: "collector", label: "采集器编号" },
        { prop: "txaddress", label: "通讯地址" },
        { prop: "user", label: "用户" },
        { prop: "triggertime", label: "触发时间" },
        { prop: "executiondelay", label: "执行延迟" },
        { prop: "executiontime", label: "执行用时" },
        { prop: "time", label: "完成时间" },
        { prop: "quantitynum", label: "抄表数量" },
        { prop: "result", label: "结果" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("onSubmit");
    },
  },
};
</script>

<style scoped lang="scss">
.header-title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.form-container {
  margin-bottom: 20px;
}
</style>
