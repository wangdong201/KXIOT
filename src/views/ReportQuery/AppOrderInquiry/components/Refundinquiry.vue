<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.group" placeholder="">
          <el-option label="全部" value="allgroup"></el-option>
          <el-option label="分组一" value="sz1"></el-option>
          <el-option label="分组二" value="sz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款状态：">
        <el-select v-model="form.refundstatus" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="退款成功" value="success"></el-option>
          <el-option label="退款失败" value="fail"></el-option>
          <el-option label="退款关闭" value="close"></el-option>
          <el-option label="退款处理中" value="processing"></el-option>
          <el-option label="退款异常" value="exception"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="default">清空</el-button>
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
        group: "allgroup",
        refundstatus: "all",
      },
      tableData: [],
      columns: [
        { prop: "number", label: "编号" },
        { prop: "grouping", label: "分组" },
        { prop: "toamount", label: "总订单金额" },
        { prop: "refundamount", label: "退款金额" },
        { prop: "reasondescription", label: "原因说明" },
        { prop: "refundstatus", label: "退款状态" },
        { prop: "refunderror", label: "退款错误" },
        { prop: "accountrefund", label: "退款入账账户" },
        { prop: "refundtime", label: "退款时间" },
        { prop: "details", label: "详情" },
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
