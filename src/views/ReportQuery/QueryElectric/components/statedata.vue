<template>
  <div>
    <el-form :model="form" ref="form" :inline="true">
      <el-form-item label="分组" prop="grouping">
        <el-select v-model="form.grouping" placeholder="">
          <el-option label="全部" value="allgrouping"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器" prop="collector">
        <el-select v-model="form.collector" placeholder="">
          <el-option label="全部" value="allcollector"></el-option>
          <el-option label="采集器一" value="cjq1"></el-option>
          <el-option label="采集器二" value="cjq2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="success">导出到EXCEL</el-button>
      </el-form-item>
    </el-form>

    <div class="title">电表当前状态数据</div>

    <!-- 表格 -->

    <el-table
      :data="tableData"
      style="width: 100%"
      border
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column prop="serialnum" label="序号"></el-table-column>
      <el-table-column prop="grouping" label="分组"></el-table-column>
      <el-table-column prop="collector" label="采集器编号"> </el-table-column>
      <el-table-column prop="mailaddress" label="通讯地址"></el-table-column>
      <el-table-column prop="user" label="用户"></el-table-column>
      <el-table-column
        prop="openaccounttime"
        label="开户时间"
      ></el-table-column>
      <el-table-column prop="notes" label="备注"></el-table-column>
      <el-table-column
        prop="electricityprice"
        label="电价(元/kWh)"
      ></el-table-column>
      <el-table-column
        prop="displayamount"
        label="显示报警金额(元)"
      ></el-table-column>
      <el-table-column
        prop="ddamount"
        label="断电报警金额(元)"
      ></el-table-column>
      <el-table-column
        prop="transformer"
        label="互感器变比(倍)"
      ></el-table-column>
      <el-table-column
        prop="powerlimit"
        label="负荷限制功率(kW)"
      ></el-table-column>
      <el-table-column
        prop="overloaddelay"
        label="超负荷延迟(分钟)"
      ></el-table-column>
      <el-table-column
        prop="overloadamount"
        label="最大透支金额(元)"
      ></el-table-column>
      <el-table-column
        prop="totalelectricity"
        label="总用电量"
      ></el-table-column>
      <el-table-column
        prop="currentelectricity"
        label="用电量同步时间"
      ></el-table-column>
      <el-table-column
        prop="remainingamount"
        label="剩余金额(元)"
      ></el-table-column>
      <el-table-column
        prop="synchronize"
        label="剩余金额同步时间"
      ></el-table-column>
      <el-table-column
        prop="totalrechargeamount"
        label="总充值金额(元)"
      ></el-table-column>
    </el-table>
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
      tableData: Array.from({ length: 5 }, (_, index) => ({
        serialnum: index + 1,
        grouping: "分组一",
        collector: "采集器一",
        mailaddress: "123456789",
        user: "用户一",
        openaccounttime: "2021-01-01 00:00:00",
        notes: "备注一",
        electricityprice: "1.00",
        displayamount: "100.00",
        ddamount: "200.00",
        transformer: "1",
        powerlimit: "8.0000",
        overloaddelay: "10",
        overloadamount: "100.00",
        totalelectricity: "10.00",
        currentelectricity: "2021-01-01 00:00:00",
        remainingamount: "100.00",
        synchronize: "2021-01-01 00:00:00",
        totalrechargeamount: "100.00",
      })),
      totalElectricitySum: 0,
      totalRechargeAmountSum: 0,
    };
  },
  mounted() {},
  methods: {
    handleQuery() {
      console.log("handleQuery");
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (
          column.property === "totalelectricity" ||
          column.property === "totalrechargeamount"
        ) {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " "; // 可以根据需要添加单位
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
}
</style>
