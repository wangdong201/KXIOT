<template>
  <div class="app-container">
    <div class="title">查看交易记录</div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="日期范围" prop="time" required>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.time"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="单号类型" prop="region">
        <el-select v-model="form.region" placeholder="">
          <el-option label="无" value="null"></el-option>
          <el-option label="系统交易订单号" value="xttransfer"></el-option>
          <el-option label="第三方交易订单号" value="sftransfer"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易单号查询" prop="jynumber" required>
        <el-input placeholder="交易单号" v-model="form.jynumber"></el-input>
      </el-form-item>
      <el-form-item label="交易状态" prop="region2">
        <el-select v-model="form.region2" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="交易成功" value="jysuccess"></el-option>
          <el-option label="交易失败" value="jyfail"></el-option>
          <el-option label="交易退款" value="jytuihuo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit3">查询</el-button>
        <el-button type="primary" @click="onSubmit4">导出到EXCEL</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <div style="margin-top: 15px">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="shdh" label="商户交易单号"> </el-table-column>
        <el-table-column prop="xtdh" label="系统交易单号"> </el-table-column>
        <el-table-column prop="time" label="用户支付时间"> </el-table-column>
        <el-table-column prop="region" label="总金额"> </el-table-column>
        <el-table-column prop="commission" label="手续费"> </el-table-column>
        <el-table-column prop="tkmoney" label="退款金额"> </el-table-column>
        <el-table-column prop="balance" label="结算金额"> </el-table-column>
        <el-table-column prop="jytype" label="交易说明"> </el-table-column>
        <el-table-column prop="jystatus" label="交易状态"> </el-table-column>
        <el-table-column prop="jyremark" label="操作"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionRecords",
  data() {
    return {
      form: {
        time: "",
        region: "null",
        jynumber: "",
        region2: "all",
      },
      tableData: [
        {
          shdh: "123456789",
          xtdh: "123456789",
          time: "2021-07-23 10:00:00",
          region: "0.01元",
          commission: "0.01元",
          tkmoney: "0.01元",
          balance: "0.01元",
          jytype: "充值",
          jystatus: "交易成功",
          jyremark: "",
        },
      ],
    };
  },

  methods: {
    onSubmit3() {
      console.log(this.form);
    },
    onSubmit4() {
      console.log(this.tableData);
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
</style>
