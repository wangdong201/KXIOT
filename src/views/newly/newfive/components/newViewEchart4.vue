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
        title: {
          // text: "111",
        },
        legend: {
          // data: ["222", "333"],
          textStyle: {
            color: "#fff",
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "测试1", max: 6500 },
            { name: "测试2", max: 16000 },
            { name: " 测试3", max: 30000 },
            { name: " 测试4", max: 38000 },
            { name: "测试5", max: 52000 },
            { name: "测试6", max: 25000 },
          ],
        },
        series: [
          {
            name: "1111",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                // name: "222",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                // name: "333",
              },
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
