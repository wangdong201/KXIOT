<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "WaterElectricChart",
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    timeLabels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      textcolor: "",
    };
  },
  computed: {
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor();
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  watch: {
    chartData: "updateChart",
    timeLabels: "updateChart",
    count: function () {
      this.setChartColor();
      this.updateChart();
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.setOption();
    },
    setOption() {
      const legendData = this.chartData.map((item) => item.name);
      const seriesData = this.chartData.map((item, index) => ({
        name: item.name,
        type: "line",
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: this.getGradientColor(index, 1) },
            { offset: 1, color: this.getGradientColor(index, 0.5) },
          ]),
        },
        lineStyle: {
          color: this.getGradientColor(index, 1), // 设置线条颜色
        },
        itemStyle: {
          color: this.getGradientColor(index, 1), // 设置点颜色
        },
        data: item.data,
      }));

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: legendData,
          top: 10,
          textStyle: {
            color: this.textcolor,
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.timeLabels,
            axisLabel: { color: this.textcolor },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "用量",
            axisLabel: {
              formatter: "{value}",
              color: this.textcolor,
            },
          },
        ],
        series: seriesData,
      };

      this.chart.setOption(option);
    },
    updateChart() {
      if (this.chart) {
        this.setOption();
      }
    },
    setChartColor() {
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    getGradientColor(index, opacity) {
      const colors = [
        `rgba(56, 169, 255, ${opacity})`, // 柔和蓝色
        `rgba(255, 183, 77, ${opacity})`, // 柔和橙色
        `rgba(76, 175, 80, ${opacity})`, // 柔和绿色
        `rgba(244, 67, 54, ${opacity})`, // 柔和红色
      ];
      return colors[index % colors.length];
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.resizeChart);
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
