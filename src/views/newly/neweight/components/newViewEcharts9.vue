<template>
  <div ref="chart" :style="{ width: '100%', height: chartHeight }"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  props: {
    active: {
      type: String,
      // required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    unit: {
      type: String,
      default: "",
    },
    chartHeight: {
      type: String,
      default: "100%",
    },
    yAxisMin: {
      type: Number,
      default: 0,
    },
    yAxisMax: {
      type: Number,
      default: 100,
    },
    yAxisInterval: {
      type: Number,
      default: 20,
    },
    chartType: {
      type: String,
      default: "line", // 默认为折线图，也可以设置为 'bar' 表示柱状图
    },
    legendData: {
      //图列是否显示
      type: Array,
      required: false,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    showGrid: {
      type: Boolean,
      default: true,
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
    Xdata: {
      type: Array,
      required: true,
    },
    titleLeft: {
      type: String,
      default: "center",
    },
    legendRight: {
      type: Number,
      default: 0,
    },
    legendLeft: {
      type: Number,
      default: null,
      chartInstance: null,
    },
  },
  data() {
    return {
      textcolor: "",
      chartInstance: null, // 存储 echarts 图表实例的属性
    };
  },

  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },

  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
    this.setChartColor(); // 初始化设置图表颜色
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chartInstance) {
      this.chartInstance.dispose(); // 销毁图表实例
    }
  },

  watch: {
    active() {
      this.handleResize();
    },
    data() {
      this.renderChart();
    },
    // 监视 count 属性的变化
    count() {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.renderChart();
    },
  },

  methods: {
    renderChart() {
      if (!this.chartInstance) return;

      const option = {
        title: {
          text: this.unit,
          left: this.titleLeft,
          textStyle: {
            color: this.textcolor,
          },
        },
        tooltip: {
          trigger: this.showTooltip ? "axis" : null,
        },
        legend: {
          show: this.showLegend,
          data: this.legendData,
          right: this.legendRight,
          left: this.legendLeft,
          textStyle: {
            color: this.textcolor,
          },
        },
        xAxis: {
          type: "category",
          data: this.Xdata,
          axisLabel: {
            color: this.textcolor,
          },
          show: this.showGrid,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: this.textcolor,
          },
          min: this.yAxisMin,
          max: this.yAxisMax,
          interval: this.yAxisInterval,
          show: this.showGrid,
        },
        grid: {
          show: this.showGrid,
        },
        series: this.data.map((item) => ({
          name: item.name,
          type: item.type || this.chartType,
          data: item.data,
          smooth: true,
        })),
      };
      this.chartInstance.setOption(option);
    },

    initChart() {
      const chartDom = this.$refs.chart;
      if (chartDom) {
        this.chartInstance = echarts.init(chartDom);
        this.renderChart();
      }
    },

    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      } else {
      }
    },

    // 根据主题色设置图表颜色
    setChartColor() {
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
  },
};
</script>
