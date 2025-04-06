<template>
  <div class="app-container">
    <div class="title">电表小时电量统计</div>
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
            type="datetimerange"
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
          prop="detail"
          label="查看明细"
          header-align="center"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
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
      detail: "",
    };
    return {
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
      chartData: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
      xAxisData: Array.from({ length: 24 }, (_, i) => `${i}:00`),
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
}

.table-title {
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
