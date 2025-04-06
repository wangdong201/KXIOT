<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="form.dateRange"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="left"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分组">
        <el-select v-model="form.group" placeholder="">
          <el-option label="全部" value="allgroup"></el-option>
          <el-option label="分组一" value="sz1"></el-option>
          <el-option label="分组二" value="sz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="form.orderstatus" placeholder="">
          <el-option label="全部支付成功的订单" value="allorder"></el-option>
          <el-option label="正在充值的订单" value="recharge"></el-option>
          <el-option
            label="充值成功的订单"
            value="recharge_success"
          ></el-option>
          <el-option label="充值失败的订单" value="recharge_fail"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary">导出到EXCEL</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <div>
      <el-table :data="tableData" border>
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        >
          <template v-if="col.prop === 'orderdetail'" slot-scope="scope">
            <el-button type="text" @click="handleDetailClick(scope.row)"
              >查看详情</el-button
            >
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
        dateRange: [],
        group: "allgroup",
        orderstatus: "allorder",
      },
      tableData: [],
      columns: [
        { prop: "grouping", label: "分组" },
        { prop: "orderid", label: "交易订单号" },
        { prop: "collector", label: "采集器" },
        { prop: "amount", label: "通讯地址" },
        { prop: "user", label: "用户" },
        { prop: "title", label: "标题" },
        { prop: "tpaccount", label: "总支付金额" },
        { prop: "paymenttime", label: "支付时间" },
        { prop: "orderstatus", label: "订单状态" },
        { prop: "orderdetail", label: "订单详情" },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleDetailClick(row) {
      // 处理点击事件的逻辑
    },
  },
};
</script>
