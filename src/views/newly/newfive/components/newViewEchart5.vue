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
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1],
          ],
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#fff", // 设置字体颜色为白色
            },
          },
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#fff", // 设置字体颜色为白色
            },
          },
        },

        series: [
          {
            type: "bar",
            label: {
              textStyle: {
                color: "#fff", // 设置字体颜色为白色
              },
            },
          },
          {
            type: "bar",
            label: {
              textStyle: {
                color: "#fff", // 设置字体颜色为白色
              },
            },
          },
          {
            type: "bar",
            label: {
              textStyle: {
                color: "#fff", // 设置字体颜色为白色
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
