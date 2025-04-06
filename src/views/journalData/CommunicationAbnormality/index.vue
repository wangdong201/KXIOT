<template>
  <div class="app-container">
    <div class="header-title">通讯质量异常报告</div>
    <div class="form-container">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="分组">
          <el-select v-model="form.grouping" placeholder="">
            <el-option label="全部" value="allgrouping"></el-option>
            <el-option label="分组一" value="fz1"></el-option>
            <el-option label="分组二" value="fz2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采集器">
          <el-select v-model="form.collector" placeholder="">
            <el-option label="全部" value="allcollector"></el-option>
            <el-option label="采集器一" value="cjq1"></el-option>
            <el-option label="采集器二" value="cjq2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-select v-model="form.timeframe" placeholder="">
            <el-option label="最近1小时" value="1h"></el-option>
            <el-option label="最近12小时" value="12h"></el-option>
            <el-option label="最近24小时" value="24h"></el-option>
            <el-option label="最近3天" value="3d"></el-option>
            <el-option label="最近7天" value="7d"></el-option>
            <el-option label="最近30天" value="30d"></el-option>
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
  name: "CommunicationAbnormality",
  components: {
    DynamicTable,
  },
  data() {
    return {
      form: {
        grouping: "allgrouping",
        collector: "allcollector",
        timeframe: "24h",
      },
      tableData: [],
      columns: [
        { prop: "serialnum", label: "序号" },
        { prop: "grouping", label: "分组" },
        { prop: "collector", label: "采集器编号" },
        { prop: "txaddress", label: "通讯地址" },
        { prop: "user", label: "用户" },
        { prop: "txcount", label: "通讯成功次数" },
        { prop: "txfailedcount", label: "通讯失败次数" },
        { prop: "txsuccessrate", label: "成功率" },
        { prop: "failedrate", label: "操作" },
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
