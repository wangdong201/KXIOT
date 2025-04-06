<template>
  <div ref="chart" style="width: 100%; height: 8rem"></div>
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
          text: "",
          // subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#fff", // 设置字体颜色为白色
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
