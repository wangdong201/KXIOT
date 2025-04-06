<template>
  <div :id="chartId" ref="chart" style="width: 100%; height: 250%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    chartId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      myChart: null,
      option: {
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
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
          },
        },
        legend: {
          data: ["昨日", "今日"],
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            data: [
              "00:00",
              "01:00",
              "01:00",
              "01:00",
              "01:00",
              "01:00",
              "01:00",
            ],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
              fontSize: 9,
              color: "#fff",
            },
          },
          {
            type: "value",
            name: "单位",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
              fontSize: 9,
              color: "#fff",
            },
          },
        ],
        series: [
          {
            name: "昨日",
            type: "bar",
            tooltip: {
              formatter: "{b}: {c} ml",
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "今日",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              formatter: "{b}: {c} °C",
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  watch: {
    // 监听 option 的变化
    option: {
      handler(val) {
        this.setOption(val);
      },
      deep: true, // 深度监听对象内部值的变化
    },
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      this.setOption(this.option);
    },
    setOption(option) {
      if (this.myChart) {
        this.myChart.setOption(option);
      }
    },
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.myChart.resize();
      }, 100); // 延迟执行，避免频繁触发resize事件
    },
  },
  created() {
    this.resizeTimer = null;
  },
};
</script>
