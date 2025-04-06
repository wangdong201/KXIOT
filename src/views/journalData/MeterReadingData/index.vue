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
        <el-form-item label="采集器">
          <el-select v-model="form.collector" placeholder="">
            <el-option label="全部" value="allcollector"></el-option>
            <el-option label="采集器一" value="cjq1"></el-option>
            <el-option label="采集器二" value="cjq2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input
            v-model="form.txaddress"
            placeholder="请输入电能表地址"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        :data="pagedTableData"
        height="590"
        border
        style="width: 100%"
      >
        <el-table-column prop="serialnum" label="序号"></el-table-column>
        <el-table-column prop="grouping" label="分组"></el-table-column>
        <el-table-column prop="collector" label="采集器"></el-table-column>
        <el-table-column prop="txaddress" label="通讯地址"></el-table-column>
        <el-table-column prop="user" label="用户"></el-table-column>
        <el-table-column prop="func" label="功能"></el-table-column>
        <el-table-column prop="result" label="结果">
          <template slot-scope="scope">
            <div style="font-size: 10px">
              <div>购电次数:{{ scope.row.result.text }}</div>
              <div>剩余金额:{{ scope.row.result.text2 }}</div>
              <div>总用电量:{{ scope.row.result.text3 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="completetime" label="完成时间"></el-table-column>
        <el-table-column prop="time" label="用时"></el-table-column>
        <el-table-column prop="command" label="命令发送次数"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="tableData.length"
        :page.sync="currentPage"
        :limit.sync="pageSize"
        @pagination="handlePagination"
      />
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
        txaddress: "",
      },
      tableData: Array.from({ length: 88 }, (_, index) => ({
        serialnum: `${index + 1}`,
        grouping: "分组一",
        collector: "132321",
        txaddress: "132321",
        user: "101",
        func: "剩余金额",
        result: {
          text: "0",
          text2: "0.00元",
          text3: "20.00 kWh",
        },
        completetime: "12分钟前",
        time: "1.05秒",
        command: "1",
        status: "0",
      })),
      currentPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    pagedTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    onSubmit() {
      console.log("onSubmit");
    },
    handlePagination(paginationInfo) {
      this.currentPage = paginationInfo.page;
      this.pageSize = paginationInfo.limit;
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
