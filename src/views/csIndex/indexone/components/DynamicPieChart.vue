<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "DynamicPieChart",
  props: {
    chartData: {
      type: Array,
      required: true,
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
    chartData: {
      handler: "updateChart",
      deep: true,
    },
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

      const total = this.chartData.reduce((sum, item) => sum + item.value, 0);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return `${params.name}<br />${
              params.value
            }万m³<br />${params.percent.toFixed(2)}%`;
          },
        },
        legend: {
          top: "top",
          left: "center",
          orient: "horizontal",
          data: this.chartData.map((item) => item.name),
          textStyle: {
            color: this.textcolor,
          },
        },
        series: [
          {
            name: "用水情况",
            type: "pie",
            radius: ["50%", "80%"], // 环形图内外半径
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: true,
              position: "outside",
              formatter: (params) => {
                return `${params.name}\n${
                  params.value
                }万m³\n${params.percent.toFixed(2)}%`;
              },
            },
            labelLine: {
              length: 20,
              length2: 20,
            },
            data: this.chartData.map((item) => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: item.color,
              },
            })),
          },
        ],
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
