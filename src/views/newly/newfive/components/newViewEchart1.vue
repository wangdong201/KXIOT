<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
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
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          orient: "vertical",
          right: "right",
          textStyle: {
            color: "#fff", // 设置字体颜色为白色
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: "bold",
                color: "#fff",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
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
