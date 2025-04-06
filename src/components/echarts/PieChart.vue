<template>
  <div ref="chart" style="width: 100%; height: 200%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      defaultOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "1%",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
              textStyle: {
                color: "#fff",
              },
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
                textStyle: {
                  color: "#fff",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "1" },
              { value: 735, name: "2" },
              { value: 580, name: "3" },
              { value: 484, name: "4" },
              { value: 300, name: "5" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    renderChart() {
      const chartDom = this.$refs.chart;
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.defaultOption);
    },
    handleResize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
  },
};
</script>

<style scoped>
/* 可以添加样式 */
</style>
