<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "prepaidEchart",
  props: {
    xAxisData: {
      type: Array,
      required: true,
    },
    yAxisData: {
      type: Array,
      required: true,
    },
    seriesData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      textcolor: "",
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#ccc",
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
          data: this.getLegendData(),
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
            data: { ...this.xAxisData },
            axisLabel: {
              color: this.textcolor,
            },
          },
        ],

        series: this.seriesData,
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
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);
    },
    resizeChart() {
      this.chart && this.chart.resize();
    },
    disposeCharts() {
      this.chart && this.chart.dispose();
    },
    getLegendData() {
      // 根据 seriesData 生成 legend 数据
      return this.seriesData.map((series) => series.name);
    },
    setChartColor() {
      // 获取当前主题的字体颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";

      // 在图表选项中应用颜色变化
      this.option.xAxis[0].axisLabel.color = this.textcolor;
      this.option.yAxis[0].axisLabel.color = this.textcolor;
    },
    updateChartOptions() {
      // 使用 setOption 更新图表，不重新初始化
      this.chart.setOption(this.option);
    },
  },
};
</script>
