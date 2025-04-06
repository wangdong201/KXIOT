<template>
  <div class="app-container">
    <div class="title">预付费日统计</div>
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
      <div class="chart-box">
        <div class="chart-title">收款渠道汇总</div>
        <prepaidEhart
          :xAxisData="xAxisData"
          :yAxisData="yAxisData"
          :seriesData="seriesData"
        />
      </div>
      <div class="chart-box">
        <div class="chart-title">收款分类汇总</div>
        <prepaidEhart
          :xAxisData="xAxisData2"
          :yAxisData="yAxisData2"
          :seriesData="seriesData2"
        />
      </div>
    </div>

    <div class="table-title">
      2024-07-22 03:00 ~ 2024-07-25 15:00 预付费日统计
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
      </el-table>
    </div>
  </div>
</template>

<script>
import prepaidEhart from "../components/prepaidEhart.vue";
export default {
  name: "ElectricityHourStatistics",
  components: {
    prepaidEhart,
  },
  data() {
    const sampleData = {
      index: 1,
      region: "2024-07-22 03:00 ~ 2024-07-25 15:00",
    };
    return {
      dialogVisible: false,
      form: {
        region: "",
        dateRange: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
      },
      tableData: Array.from({ length: 2 }, (_, i) => ({
        ...sampleData,
        index: i + 1,
      })),
      xAxisData: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      yAxisData: [
        {
          type: "value",
          name: "交易金额(元)",
        },
        {
          type: "value",
          name: "交易笔数(笔)",
        },
      ],
      seriesData: [
        {
          name: "交易金额",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + "元";
            },
          },
          data: [10, 11, 15, 23, 65, 41, 25, 41, 32, 54, 12, 42],
        },
        {
          name: "交易笔数",
          type: "line",
          tooltip: {
            valueFormatter: function (value) {
              return value + "笔";
            },
          },
          data: [10, 11, 15, 23, 65, 41, 25, 41, 32, 54, 12, 42],
        },
      ],
      xAxisData2: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      yAxisData2: [
        {
          type: "value",
          name: "交易金额(元)",
        },
        {
          type: "value",
          name: "交易笔数(笔)",
        },
      ],
      seriesData2: [
        {
          name: "交易金额",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + "元";
            },
          },
          data: [10, 11, 15, 23, 65, 41, 25, 41, 32, 54, 12, 42],
        },
        {
          name: "交易笔数",
          type: "line",
          tooltip: {
            valueFormatter: function (value) {
              return value + "笔";
            },
          },
          data: [10, 11, 15, 23, 65, 41, 25, 41, 32, 54, 12, 42],
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
  display: flex;
}

.table-title {
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.chart-box {
  width: 50%;
  height: 100%;
  border: 1px solid #ccc;
}

.chart-title {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding-top: 10px;
}
</style>
