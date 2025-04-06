<template>
  <div>
    <!-- 表单 -->
    <div style="margin: 20px 0">
      <el-form
        :inline="true"
        :rules="rules"
        class="demo-ruleForm"
        ref="form"
        :model="form"
      >
        <el-form-item label="日期范围：" prop="time">
          <el-date-picker
            v-model="form.time"
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
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button 
          >
          <el-button type="default">导出到Excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button>正向有功总电能</el-button>
      <el-button>剩余金额</el-button>
      <el-button>总瞬时有功功率</el-button>
      <el-button>电流</el-button>
      <el-button>电压</el-button>
    </div>
    <div class="alert-text">
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
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      chart2: null,
      form: {
        time: "",
        type: [],
      },

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
  computed: {},
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
  watch: {},
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

.alert-text{
  margin: 20px 0;
}
</style>
