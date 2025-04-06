<template>
  <div>
    <!-- 时间切换按钮 -->
    <div>
      <el-button @click="activeType = 'hour'">小时</el-button>
      <el-button @click="activeType = 'day'">日</el-button>
      <el-button @click="activeType = 'month'">月</el-button>
      <el-button @click="activeType = 'year'">年</el-button>
    </div>
    <!-- 表单 -->
    <div style="margin: 20px 0">
      <el-form
        :inline="true"
        :rules="rules"
        class="demo-ruleForm"
        ref="form"
        :model="form"
      >
        <el-form-item label="分组">
          <el-select v-model="form.group" placeholder="">
            <el-option label="全部" value="allgroup"></el-option>
            <el-option label="分组一" value="fz1"></el-option>
            <el-option label="区分组二" value="fz2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围：" prop="time">
          <!-- 小时 -->
          <el-date-picker
            v-if="activeType === 'hour'"
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>

          <!-- 日 -->
          <el-date-picker
            v-else-if="activeType === 'day'"
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>

          <!-- 月 -->
          <el-date-picker
            v-else-if="activeType === 'month'"
            v-model="form.time"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>

          <!-- 年 -->
          <div v-else-if="activeType === 'year'">
            <el-date-picker v-model="value3" type="year" placeholder="选择年">
            </el-date-picker>
            <span>-</span>
            <el-date-picker v-model="value4" type="year" placeholder="选择年">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="忽略互感器变比" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button
          >
          <el-button type="default">导出到Excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="">
      <el-alert
        title="如系统未成功获取到设备数据则无法更新对应周期数据，最近2个周期的数据请以T+2后查询的结果为准，再此之前查询的数据持续更新中，仅供参考，不作为核对依据。"
        type="warning"
      >
      </el-alert>
    </div>

    <!-- 图表 -->
    <div class="chart-container">
      <div ref="chart2" style="width: 100%; height: 100%"></div>
    </div>

    <!-- table -->

    <div class="table-title">
      <span>{{ form.time }}</span>
      <span>正向有功总电能 用量统计</span>
    </div>
    <div>
      <span>采集器号:21012905015</span>
      <span>-</span>
      <span>表号:210129050151(101)</span>
    </div>
    <div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          :align="column.align"
        >
          <template v-if="column.children">
            <el-table-column
              v-for="child in column.children"
              :key="child.prop"
              :label="child.label"
              :prop="child.prop"
              :align="child.align"
            ></el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      activeType: "hour", // 默认显示小时
      value3: null,
      value4: null,
      chart2: null,
      form: {
        group: "allgroup",
        time: "",
        year: "",
        type: [],
      },
      tableData: [],
      columns: [
        { label: "序号", prop: "serialnum" },
        { label: "日期", prop: "date" },
        {
          label: "正向有功总电能开始",
          prop: "start",
          align: "center",
          children: [
            { label: "时间", prop: "start_time" },
            { label: "总", prop: "start_total" },
          ],
        },
        {
          label: "正向有功总电能结束",
          prop: "end",
          align: "center",
          children: [
            { label: "时间", prop: "end_time" },
            { label: "总", prop: "end_total" },
          ],
        },
        { label: "统计值", prop: "tjvalue" },
        { label: "单位", prop: "unit" },
        { label: "互感器变比", prop: "isb" },
      ],
      rules: {
        time: [{ required: true, message: "请选择日期范围", trigger: "blur" }],
      },
      option2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["总"],
          left: "center",
        },
        xAxis: [
          {
            type: "category",
            data: [
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
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "正向有功总电能(kWh)",
          },
        ],
        series: [
          {
            name: "总",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + "kWh";
              },
            },
            data: [
              10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
              160, 170, 180, 190, 200, 210, 220, 230, 240,
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    this.disposeCharts();
  },
  computed: {
    concatenatedYears: {
      get() {
        if (this.value3 && this.value4) {
          return `${this.value3.getFullYear()} - ${this.value4.getFullYear()}`;
        }
        return "";
      },
      set(value) {
        this.form.year = value;
      },
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    initChart() {
      this.chart2 = echarts.init(this.$refs.chart2);
      this.chart2.setOption(this.option2);
    },
    resizeChart() {
      this.chart2 && this.chart2.resize();
    },
    disposeCharts() {
      this.chart2 && this.chart2.dispose();
    },
  },
  watch: {
    concatenatedYears(newVal) {
      this.form.year = newVal;
    },
  },
};
</script>

<style scoped lang="scss">
.chart-container {
  margin: 20px 0;
  height: 400px;
  width: 100%;
}

.table-title {
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
