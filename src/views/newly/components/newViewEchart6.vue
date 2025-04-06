<template>
  <div ref="chart" style="width: 100%; height: 80%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PieChart",
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      // 获取图表容器
      const chartDom = this.$refs.chart;
      // 初始化 ECharts 实例
      const myChart = echarts.init(chartDom);

      // 配置选项
      const option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          // show: true,
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            // saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      // 设置图表选项
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
/* 在这里添加组件的样式 */
</style>
