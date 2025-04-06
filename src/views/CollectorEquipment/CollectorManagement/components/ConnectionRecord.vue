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
      <el-form-item label="采集器">
        <el-select v-model="form.collector" placeholder="">
          <el-option label="全部" value="allcollector"></el-option>
          <el-option label="采集器一" value="cjq1"></el-option>
          <el-option label="采集器二" value="cjq2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="primary" @click="onReset">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <div>
      <el-table :data="tableData"  style="width: 100%" border ref="table">
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        >
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible = true"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.$index)"
              >删除</el-button
            >
            <el-button type="text" @click="dialogVisible2 = true"
              >详情</el-button
            >
          </template>
        </el-table-column> -->
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
        collector: "allcollector",
      },
      tableData: Array.from({ length: 10 }).map((_, index) => ({
        grouping: `${index + 1}楼`,
        collectorId: "2120129050151",
        behavior: "3分钟前上线",
        time: "2021-08-10 10:00:00",
        ip: "192.168.1.1",
      })),
      columns: [
        { prop: "grouping", label: "分组" },
        { prop: "collectorId", label: "采集器ID" },
        { prop: "behavior", label: "行为" },
        { prop: "time", label: "时间" },
        { prop: "ip", label: "IP地址" },
      ],
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.form);
    },
    onReset() {
      this.form = {
        grouping: "allgrouping",
        collector: "allcollector",
      };
      this.$emit("reset");
    },
  },
};
</script>
