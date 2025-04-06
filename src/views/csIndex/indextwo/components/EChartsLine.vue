<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "EChartsLine",
  props: {
    xAxisData: {
      type: Array,
      required: true,
    },
    seriesData: {
      type: Array,
      required: true, // 支持纯数字或百分比数据
    },
    seriesNames: {
      type: Array,
      required: true,
    },
    smooth: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Array,
      default: () => ["#5470c6", "#91cc75", "#fac858"],
    },
  },
  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  watch: {
    xAxisData: "updateChart",
    seriesData: "updateChart",
    count: function () {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.updateChart(); // 更新图表
    },
  },
  mounted() {
    this.setChartColor();
    this.chart = echarts.init(this.$refs.chart);
    this.setOptions();

    // 监听窗口变化
    window.addEventListener("resize", this.resizeChart);
  },
  methods: {
    // 转换数据：百分比转数值，纯数字保持不变
    convertData(data) {
      return data.map((series) =>
        series.map(
          (val) =>
            typeof val === "string" && val.includes("%")
              ? parseFloat(val) / 100 // 百分比转数值
              : val // 数值直接返回
        )
      );
    },
    setOptions() {
      const { xAxisData, seriesData, smooth, colors, seriesNames } = this;

      // 检查数据是否包含百分比
      const containsPercentage = seriesData.some((series) =>
        series.some((val) => typeof val === "string" && val.includes("%"))
      );

      // 转换数据
      const convertedData = this.convertData(seriesData);

      const series = convertedData.map((data, index) => ({
        name: seriesNames[index] || `系列${index + 1}`,
        type: "line",
        smooth,
        data,
        lineStyle: {
          color: colors[index % colors.length],
        },
        itemStyle: {
          color: colors[index % colors.length],
        },
      }));

      const options = {
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            return params
              .map(
                (item) =>
                  containsPercentage
                    ? `${item.seriesName}: ${(item.value * 100).toFixed(1)}%` // 显示百分比
                    : `${item.seriesName}: ${item.value}` // 显示数字
              )
              .join("<br>");
          },
        },
        legend: {
          data: series.map((s) => s.name),
          textStyle: {
            color: this.textcolor,
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: { color: this.textcolor },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: containsPercentage ? 1 : undefined, // 如果包含百分比，固定最大值为1
          axisLabel: {
            formatter: (value) =>
              containsPercentage ? `${(value * 100).toFixed(0)}%` : value, // Y轴根据数据类型格式化
          },
          axisLabel: { color: this.textcolor },
        },
        series,
      };

      this.chart.setOption(options);
    },
    updateChart() {
      if (this.chart) {
        this.setOptions();
      }
    },
    setChartColor() {
      // 设置 颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.resizeChart);
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
