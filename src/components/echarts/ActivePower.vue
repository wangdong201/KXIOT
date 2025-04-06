<template>
  <div
    class="large-area-chart"
    ref="chart"
    style="width: 100%; height: 400px"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  props: {
    seriesData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor(); // 初始化设置图表颜色
    this.renderChart();
    // 监听窗口大小变化，实现自适应
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    // 组件销毁时，移除resize事件监听器，防止内存泄漏
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    // 监视 count 属性的变化
    count: function () {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.renderChart();
    },
  },
  methods: {
    renderChart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return;
            [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "负载率曲线",
          textStyle: {
            color:  this.textcolor,
          },
        },
        xAxis: {
          splitLine: { lineStyle: { color: "red" } },
          type: "category",
          boundaryGap: false,
          axisLabel: { color: this.textcolor },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          min: 0,
          max: 120,
          axisLabel: { color: this.textcolor },
          splitLine: {
            lineStyle: {
              color: "rgba(211, 211, 215, 0.5)",
            },
          },
        },
        series: [
          {
            name: "Fake Data",
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            data: this.seriesData,
          },
        ],
      };
      myChart.setOption(option);
      // 在渲染图表后调用resize方法，确保图表大小正确
      myChart.resize();
    },
    setChartColor() {
      // 设置 颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
    handleResize() {
      // 窗口大小变化时重新渲染图表
      this.renderChart();
    },
  },
};
</script>
