<template>
  <div class="chart-container" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      myChart: null,
      textcolor: "",
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            progress: {
              show: true,
            },
            axisLabel: {
              textStyle: {
                color: this.textcolor,
              },
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
              textStyle: {
                color: this.textcolor,
              },
            },
            data: [
              {
                value: 36,
                name: "",
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor(); // 初始化设置图表颜色
    this.initChart();
  },
  watch: {
    // 监视 count 属性的变化
    count: function (newValue, oldValue) {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.initChart();
    },
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      this.myChart.setOption(this.option);
    },
    setChartColor() {
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
      this.option.series[0].detail.textStyle.color = this.textcolor;
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
  margin-top: 50px;
}
</style>
