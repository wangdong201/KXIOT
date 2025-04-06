<template>
  <div
    ref="chart"
    class="echarts-chart"
    style="width: 100%; height: 400px"
  ></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    data: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.renderChart();
    },
    renderChart() {
      const option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2024-04-14",
            "2024-04-15",
            "2024-04-16",
            "2024-04-17",
            "2024-04-18",
            "2024-04-19",
            "2024-04-20",
            "2024-04-21",
            "2024-04-22",
            "2024-04-23",
            "2024-04-24",
          ],
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "當日",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)", // 设置线条颜色
            },
            areaStyle: {
              color: "transparent", // 设置填充颜色为透明
            },
            data: [100, 150, 152, 147, 135, 152, 185, 143, 147, 195, 123],
          },
          {
            name: "上日",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(70, 131, 255)", // 设置线条颜色
            },
            areaStyle: {
              color: "transparent", // 设置填充颜色为透明
            },
            data: [120, 105, 108, 165, 134, 156, 175, 193, 124, 157, 113],
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.renderChart();
      },
      deep: true,
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>

<style scoped>
.echarts-chart {
  width: 100%;
  height: 400px;
}
</style>
