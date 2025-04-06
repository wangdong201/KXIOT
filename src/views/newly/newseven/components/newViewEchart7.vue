<template>
  <div ref="chart" :style="{ width: '100%', height: chartHeight }"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  props: {
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
      type: Array,
      required: true,
    },
  },

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
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    });
    this.setChartColor(); // 初始化设置图表颜色
    this.renderChart();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    data() {
      this.renderChart();
    },
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
        title: {
          text: this.unit,
          textStyle: {
            color: this.textcolor,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.legendData,
          textStyle: {
            color: this.textcolor,
          },
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            color:this.textcolor,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: this.textcolor,
          },
          min: this.yAxisMin,
          max: this.yAxisMax,
          interval: this.yAxisInterval,
        },
        series: this.data.map((item) => ({
          name: item.name,
          type: item.type || this.chartType,
          data: item.data,
          smooth: true,
        })),
      };
      this.myChart.setOption(option);
    },
    handleResize() {
      this.resizeChart();
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    setChartColor() {
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
  },
};
</script>
