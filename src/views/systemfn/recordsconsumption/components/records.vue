<template>
  <div>
    <div class="RecordsConsumption">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="消费类型">
          <el-select v-model="form.region" placeholder="请选择消费类型">
            <el-option label="全部" value="all"></el-option>
            <el-option label="短信充值" value="sms"></el-option>
            <el-option label="系统续费" value="renew"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="apply_text">
      仅支持最近90天消费订单申请开票,单次开票金额需满200元
    </div>
    <div class="RecordsConsumption_table">
      <el-table :data="pagedTableData" height="590" border style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="state" label="开票状态"> </el-table-column>
        <el-table-column prop="name" label="订单名称"> </el-table-column>
        <el-table-column prop="type" label="消费类型"> </el-table-column>
        <el-table-column prop="mode" label="支付方式"> </el-table-column>
        <el-table-column prop="time" label="支付时间"> </el-table-column>
        <el-table-column prop="amount" label="总金额"> </el-table-column>
        <el-table-column prop="quantity" label="购买数量"> </el-table-column>
        <el-table-column prop="result" label="结果"> </el-table-column>
        <el-table-column prop="account" label="支付账户"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <span style="color: #1890ff; cursor: pointer">{{
              scope.row.operate
            }}</span>
          </template></el-table-column
        >
      </el-table>
      <div>
        <Pagination
          :total="total"
          :page.sync="currentPage"
          :limit.sync="pageSize"
          @pagination="handlePagination"
        />
      </div>
      <div class="apply_btn" style="margin-top: 20px">
        <el-button>申请电子发票</el-button>
        <div style="margin-left: 10px">总金额: <span>100</span>元</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: "",
      },
      tableData: Array.from({ length: 50 }, (_, index) => ({
        state: "已开票",
        name: `订单名称${index + 1}`,
        type: "短信充值",
        mode: "支付宝",
        time: "2021-08-01 10:00:00",
        amount: "100",
        quantity: "1000",
        result: "成功",
        account: "13588888888",
        operate: "查看详情",
      })),
      total: 50,
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
      console.log("submit!");
    },
    handlePagination(paginationInfo) {
      this.currentPage = paginationInfo.page;
      this.pageSize = paginationInfo.limit;
    },
  },
};
</script>

<style scoped lang="scss">
.apply_text {
  font-size: 12px;
  color: #777;
}

.RecordsConsumption_table {
  margin-top: 20px;
}

.apply_btn {
  display: flex;
  align-items: center;
}
</style>
