<template>
  <div ref="chart" style="width: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      textcolor: "",
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
    this.renderChart();
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
      this.myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            color: this.textcolor,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: this.textcolor,
          },
        },
        dataZoom: [
          {
            type: "slider", // 使用滑动条型的 dataZoom
            xAxisIndex: 0, // 表示该 dataZoom 控制 x 轴
            start: 0, // 起始值
            end: 50, // 结束值
          },
          {
            type: "slider",
            yAxisIndex: 0, // 表示该 dataZoom 控制 y 轴
            start: 0,
            end: 50,
          },
        ],
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      };
      this.myChart.setOption(option);
    },
    setChartColor() {
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
  },
};
</script>
