<template>
  <div ref="chart2" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    xAxisData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      textcolor: "",
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
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              color: this.textcolor,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "正向有功总电能(kWh)",
            axisLabel: {
              color: this.textcolor,
            },
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
            data: this.chartData,
          },
        ],
      },
    };
  },
  computed: {
    // 从 Vuex 状态中获取 count 值
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor(); // 首次加载时调用，确保初始化时颜色正确
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  watch: {
    count: function (val) {
      this.setChartColor(); // 更新颜色
      this.updateChartOptions(); // 重新应用颜色到图表
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    this.disposeCharts();
  },
  methods: {
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
    setChartColor() {
      // 获取当前主题的字体颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";

      // 在图表选项中应用颜色变化
      this.option2.xAxis[0].axisLabel.color = this.textcolor;
      this.option2.yAxis[0].axisLabel.color = this.textcolor;
    },
    updateChartOptions() {
      // 使用 setOption 更新图表，不重新初始化
      this.chart2.setOption(this.option2);
    },
  },
};
</script>
