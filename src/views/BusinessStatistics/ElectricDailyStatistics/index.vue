<template>
  <div class="app-container">
    <div class="title">电表日电量统计</div>
    <div style="margin-top: 10px">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="分组">
          <el-select v-model="form.region" placeholder="暂无">
            <el-option label="区域一" value="qy1"></el-option>
            <el-option label="区域二" value="qy2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="忽略互感器变比" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>导出到Excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- TODO: 图表 -->
    <div class="">
      <el-alert
        title="如系统未成功获取到设备数据则无法更新对应周期数据，最近2个周期的数据请以T+2后查询的结果为准，再此之前查询的数据持续更新中，仅供参考，不作为核对依据。"
        type="warning"
      >
      </el-alert>
    </div>

    <div class="chart-container">
      <Elehs :chartData="chartData" :xAxisData="xAxisData"></Elehs>
    </div>

    <div class="table-title">
      2024-07-22 03:00 ~ 2024-07-25 15:00 正向有功总电能 用量统计
    </div>

    <div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="index"
          label="序号"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="region"
          label="日期"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ygdn"
          label="正向有功总电能"
          header-align="center"
          align="center"
        >
          <el-table-column
            prop="ygdn.assemble"
            label="总"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ygdn.unit"
            label="单位"
            header-align="center"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="devices"
          label="统计设备数量"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="查看明细"
          header-align="center"
          align="center"
        >
          <template>
            <div class="btn" @click="dialogVisible = true">查看明细</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- TODO: 弹窗 -->
    <el-dialog
      title="用量明细排行"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div class="dialog_title">2024年x月xx日正向有功总电能统计明细</div>
        <div class="dialog_data">
          <span>周期用量:总0.79 kWh，统计设备数量：1</span>
          <span>导出到Excel</span>
        </div>
        <div class="dialog_table">
          <el-table :data="tableData2" style="width: 100%" border>
            <el-table-column
              prop="index2"
              label="序号"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="cjqnumber"
              label="采集器号"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="biaohao"
              label="表号"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="notes"
              label="表备注"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="grouping"
              label="分组"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="user"
              label="用户"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="usernotes"
              label="用户备注"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="zxygdn"
              label="正向有功总电能 开始"
              header-align="center"
              align="center"
            >
              <el-table-column
                prop="time2"
                label="时间"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="assemble2"
                label="总"
                header-align="center"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column
              prop="zxygjs"
              label="正向有功总电能 结束"
              header-align="center"
              align="center"
            >
              <el-table-column
                prop="time3"
                label="时间"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="assemble3"
                label="总"
                header-align="center"
                align="center"
              ></el-table-column>
            </el-table-column>
            <el-table-column
              prop="statistics"
              label="统计值"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="change"
              label="互感器变化"
              header-align="center"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Elehs from "../components/elehs.vue";
export default {
  name: "ElectricityHourStatistics",
  components: {
    Elehs,
  },
  data() {
    const sampleData = {
      index: 1,
      region: "2024-07-22 03:00 ~ 2024-07-25 15:00",
      ygdn: {
        assemble: 10,
        unit: "kWh",
      },
      devices: 1,
    };
    return {
      dialogVisible: false,
      form: {
        region: "",
        dateRange: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
        type: [],
      },
      tableData: Array.from({ length: 10 }, (_, i) => ({
        ...sampleData,
        index: i + 1,
      })),
      tableData2: [],
      chartData: Array.from({ length: 31 }, () =>
        parseFloat((Math.random() * 100).toFixed(2))
      ),
      xAxisData: this.generateLastMonthDates(),
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    generateLastMonthDates() {
      const dates = [];
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      // 计算一个月前的日期
      const lastMonthDate = new Date(currentYear, currentMonth - 1, currentDay);

      // 从一个月前的日期开始，生成到当前日期的所有日期
      for (let i = 0; i <= 30; i++) {
        // 假设一个月最多30天
        const date = new Date(lastMonthDate);
        date.setDate(lastMonthDate.getDate() + i);
        if (date <= currentDate) {
          // 确保生成的日期不超过当前日期
          dates.push(this.formatDate(date));
        }
      }

      return dates;
    },
    formatDate(date) {
      const month = date.getMonth() + 1; // 月份从0开始，所以需要加1
      const day = date.getDate();
      return `${month}/${day}`;
    },
    handleClose(done) {
      done();
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

.chart-container {
  height: 500px;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
}

.table-title {
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.btn {
  &:hover {
    color: #409eff;
    cursor: pointer;
  }
}

.dialog-content {
  height: 80vh;
  overflow: auto;
}

.dialog_title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.dialog_data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>
