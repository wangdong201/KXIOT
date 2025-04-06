<template>
  <div ref="chart" style="width: 100%; height: 180%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
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
      const option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["本年碳排放", "本年碳中和"],
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            // saveAsImage: { show: true },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: false,
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
            name: "",
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
        ],
        series: [
          {
            name: "本年碳排放",
            type: "bar",
            stack: "Total",
            itemStyle: {
              color: "#2AE7FA",
            },
            areaStyle: {
              color: "#245D62",
            },
            emphasis: {
              focus: "series",
            },
            data: [30, 40, 30, 60, 110, 10, 45],
          },
          {
            name: "本年碳中和",
            type: "bar",
            stack: "Total",
            itemStyle: {
              color: "#FFDB46",
            },
            areaStyle: {
              color: "#156080",
            },
            emphasis: {
              focus: "series",
            },
            data: [30, 160, 60, 35, 89, 46, 57],
          },
        ],
      };
      this.myChart.setOption(option);
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
/* 可以添加一些样式以定制组件的外观 */
</style>
