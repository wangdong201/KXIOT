<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "DynamicChart",
  props: {
    chartData: {
      type: Array,
      required: true,
      // 示例格式：
      // [
      //   { name: "系列1", data: [10, 20, 30], colors: ["rgba(129, 236, 236, 0.3)", "rgba(129, 236, 236, 0)"] },
      //   { name: "系列2", data: [15, 25, 35], colors: ["rgba(255, 87, 34, 0.3)", "rgba(255, 87, 34, 0)"] },
      // ]
    },
    categories: {
      type: Array,
      required: true, // x轴分类，例如 ["1月", "2月", "3月"]
    },
    chartType: {
      type: String,
      default: "line", // 支持 "line" 或 "bar"
      validator: (value) => ["line", "bar"].includes(value),
    },
    chartHeight: {
      type: String,
      default: "100%", // 默认高度
    },
    chartWidth: {
      type: String,
      default: "100%", // 默认宽度
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  watch: {
    chartData: "updateChart",
    chartType: "updateChart",
    count: function () {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.initChart();
    },
  },
  mounted() {
    this.setChartColor();
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
      this.updateChart();
    },
    updateChart() {
      if (!this.chartInstance) return;

      const series = this.chartData.map((item) => ({
        name: item.name,
        type: this.chartType,
        data: item.data,
        smooth: this.chartType === "line", // 平滑曲线仅对折线图生效
        barWidth: this.chartType === "bar" ? "20%" : undefined, // 控制柱状图宽度
        lineStyle: {
          color: item.colors[0], // 折线图线条颜色
        },
        areaStyle:
          this.chartType === "line"
            ? {
                // 折线图背景渐变
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: item.colors[0] }, // 顶部渐变颜色
                  { offset: 1, color: item.colors[1] }, // 底部渐变颜色
                ]),
              }
            : undefined,
        itemStyle: {
          color: item.colors[0], // 点的颜色或柱子颜色
        },
      }));

      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.chartData.map((item) => item.name),
          textStyle: {
            color: this.textcolor,
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "10%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.categories,
          axisLabel: { color: this.textcolor },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: this.textcolor },
        },
        series,
      };

      this.chartInstance.setOption(option);
    },
    setChartColor() {
      // 设置 颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
