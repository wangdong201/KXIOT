<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="类型" prop="region">
        <el-select v-model="form.region" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="交易撤销" value="cancel"></el-option>
          <el-option label="转账撤销" value="transfercancel"></el-option>
          <el-option label="提现" value="withdraw"></el-option>
          <el-option label="实时在线交易" value="onlinetrade"></el-option>
          <el-option label="重置账户数据" value="resetdata"></el-option>
          <el-option label="退款扣除" value="refund"></el-option>
          <el-option label="余额修改" value="balancemodify"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="onSubmit2">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="jsje" label="起始金额"></el-table-column>
      <el-table-column prop="jsje" label="结束金额"></el-table-column>
      <el-table-column prop="jebh" label="金额变化"></el-table-column>
      <el-table-column prop="operator" label="操作者"></el-table-column>
      <el-table-column prop="illustrate" label="说明"></el-table-column>
      <el-table-column prop="time" label="记录时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: "all",
      },
      tableData: [
        {
          type: "交易撤销",
          jsje: "10000",
          jebh: "1000",
          operator: "admin",
          illustrate: "撤销订单123456",
          time: "2021-01-01 12:00:00",
        },
      ],
    };
  },
  methods: {
    onSubmit() {},
    onSubmit2() {},
  },
};
</script>
