<template>
  <div ref="chartContainer" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "PieChart",
  props: {
    chartData: {
      type: Array,
      required: true, // 数据必须传入
    },
    chartTitle: {
      type: String,
      default: "", // 默认标题
    },
  },
  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  data() {
    return {
      chartInstance: null, // ECharts 实例
    };
  },
  watch: {
    // 监视 count 属性的变化
    count: function () {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.initChart();
    },
  },
  mounted() {
    this.setChartColor();
    this.initChart();
    this.setChartOptions();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chartInstance) {
      this.chartInstance.dispose(); // 清理图表实例
    }
  },
  methods: {
    // 初始化图表实例
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartContainer);
    },
    // 设置图表配置项
    setChartOptions() {
      const total = this.chartData.reduce((sum, item) => sum + item.value, 0);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            const { name, value, percent } = params;
            return `${name}: ${value} (${percent}%)`;
          },
        },
        series: [
          {
            name: this.chartTitle,
            type: "pie",
            radius: ["40%", "56%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: "bold",
                color: "#fff",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.chartData, // 动态传入数据
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
    setChartColor() {
      // 设置 颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
    // 窗口大小调整时重绘
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
  },
  watch: {
    // 数据变化时更新图表
    chartData: {
      handler() {
        this.setChartOptions();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* 确保图表容器有宽高 */
:host {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
