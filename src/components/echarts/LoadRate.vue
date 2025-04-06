<template>
  <div id="main" style="width: 100%; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      chartData: [
        ["2000-06-05", 10],
        ["2000-06-06", 19],
        ["2000-06-07", 13],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 13],
        ["2000-06-15", 24],
        ["2000-06-16", 13],
        ["2000-06-17", 11],
        ["2000-06-18", 11],
        ["2000-06-19", 30],
        ["2000-06-20", 20],
        ["2000-06-21", 13],
        ["2000-06-22", 12],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 10],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 12],
        ["2000-07-03", 10],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 10],
        ["2000-07-08", 10],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        [
          "2000-07-12",
          113,
          ["2000-07-13", 10],
          ["2000-07-14", 13],
          ["2000-07-15", 11],
          ["2000-07-16", 64],
          ["2000-07-17", 69],
          ["2000-07-18", 88],
          ["2000-07-19", 77],
          ["2000-07-20", 83],
          ["2000-07-21", 11],
          ["2000-07-22", 57],
          ["2000-07-23", 55],
          ["2000-07-24", 60],
        ],
      ],
      mycolor: "",
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
    count: function (newValue, oldValue) {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.renderChart();
    },
  },
  methods: {
    renderChart() {
      const chartDom = document.getElementById("main");
      const myChart = echarts.init(chartDom);
      const { chartData } = this;

      const dateList = chartData.map((item) => item[0]);
      const valueList = chartData.map((item) => Math.min(item[1], 100)); // 将值限制为最大为100

      const option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "負載率曲綫",
          textStyle: {
            color: this.textcolor,
          },
        },
        xAxis: {
          type: "category",
          data: dateList,
          axisLabel: {
            color: this.textcolor,
          },
        },
        yAxis: {
          type: "value",
          max: 100, // 设置y轴最大值为100
          axisLabel: {
            color: this.textcolor,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(211, 211, 215, 0.5)",
            },
          },
        },
        series: [
          {
            type: "line",
            data: valueList,
            lineStyle: {
              color: this.mycolor,
            },
          },
        ],
      };

      myChart.setOption(option);
    },
    setChartColor() {
      // 设置 mycolor 根据 count 的值
      this.mycolor = this.count === "theme-dark" ? "#4E6AB2" : "pink";
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
  },
};
</script>
