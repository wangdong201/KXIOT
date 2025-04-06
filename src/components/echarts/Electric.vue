<template>
  <div ref="chart" style="width: 200%; height: 200%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      myChart: null, // echarts实例
    };
  },
  mounted() {
    // 初始化echarts实例
    this.initChart();

    // 设置初始配置
    this.setOption();

    // 模拟数据更新
    setInterval(() => {
      this.updateData();
    }, 2000);

    // 监听窗口大小变化，动态调整图表大小
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 销毁echarts实例
    if (this.myChart) {
      this.myChart.dispose();
    }

    // 移除窗口大小变化的监听器
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 初始化echarts实例
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
    },
    // 更新数据
    updateData() {
      this.myChart.setOption({
        series: [
          {
            data: [
              {
                value: +(Math.random() * 100).toFixed(2),
              },
            ],
          },
        ],
      });
    },
    // 设置图表配置
    setOption() {
      const option = {
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: { color: "auto" },
            },
            axisTick: {
              distance: -8,
              length: 3,
              lineStyle: { color: "#fff", width: 1 },
            },
            splitLine: {
              distance: -8,
              length: 10,
              lineStyle: { color: "#fff", width: 1 },
            },
            axisLabel: { color: "inherit", distance: 9, fontSize: 8 },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
              color: "inherit",
              fontSize: 8,
            },
            data: [{ value: 70 }],
          },
        ],
      };
      this.myChart.setOption(option);
    },
    // 窗口大小变化时重新调整图表大小
    handleResize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
  },
};
</script>

<style>
/* 样式可以根据需要自定义 */
</style>
