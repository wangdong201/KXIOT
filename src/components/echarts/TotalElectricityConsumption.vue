<template>
  <div ref="chart" style="width: 100%; height: 220%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  mounted() {
    this.renderChart();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    renderChart() {
      const chartDom = this.$refs.chart;
      this.myChart = echarts.init(chartDom);

      const defaultOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            // saveAsImage: { show: true },
          },
        },
        legend: {
          data: [
            {
              name: "本月耗电量",
              textStyle: {
                color: "#fff",
              },
            },
            {
              name: "同比耗电量",
              textStyle: {
                color: "#fff",
              },
            },
          ],
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "本月耗电量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff",
              },
            },
          },
          {
            type: "value",
            name: "同比耗电量",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            name: "本月耗电量",
            type: "bar",
            itemStyle: {
              color: "#2AE7FA", // 设置柱体颜色
            },
            tooltip: {
              formatter: "{c} kwh",
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "同比耗电量",
            type: "bar",
            itemStyle: {
              color: "#067FFF", // 设置柱体颜色
            },
            yAxisIndex: 1,
            tooltip: {
              formatter: "{c} °C",
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      };

      this.myChart.setOption(defaultOption);
    },
    handleResize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
/* 这里可以添加样式 */
</style>
