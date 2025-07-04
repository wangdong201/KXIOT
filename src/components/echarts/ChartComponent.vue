<template>
  <div ref="chart" class="chart-container" :style="{ height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  props: {
    // 图表标题
    title: {
      type: String,
      default: "",
    },
    // 图表数据
    chartData: {
      type: Object,
      required: true,
    },
    // 图表高度
    height: {
      type: String,
      default: "",
    },
    // 是否显示图例
    showLegend: {
      type: Boolean,
      default: true,
    },
    // 是否显示网格线
    showGrid: {
      type: Boolean,
      default: true,
    },
    // 是否显示时间段背景色
    showTimeBackground: {
      type: Boolean,
      default: false,
    },
    // 图表类型：line(折线图), bar(柱状图), smooth(曲线图)
    chartType: {
      type: String,
      default: "smooth",
      validator: function (value) {
        return ["line", "bar", "smooth"].includes(value);
      },
    },
  },
  data() {
    return {
      chart: null,
      textcolor: "", // 添加文字颜色属性
      resizeObserver: null, // 添加ResizeObserver
    };
  },
  computed: {
    // 使用 mapState 辅助函数来将 Vuex 的状态映射到组件的计算属性中
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor(); // 初始化设置图表颜色
    this.initChart();
    this.initResizeObserver(); // 初始化ResizeObserver
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.renderChart();
      window.addEventListener("resize", this.handleResize);
    },
    // 初始化ResizeObserver用于监听容器大小变化
    initResizeObserver() {
      if (window.ResizeObserver && this.$refs.chart) {
        this.resizeObserver = new ResizeObserver((entries) => {
          this.handleContainerResize();
        });
        this.resizeObserver.observe(this.$refs.chart);
      }
    },
    // 处理容器大小变化
    handleContainerResize() {
      this.$nextTick(() => {
        this.resize();
      });
    },
    renderChart() {
      const { xAxisData = [], series = [] } = this.chartData;

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(50, 50, 50, 0.8)",
          borderColor: "#333",
          textStyle: {
            color: "#fff",
          },
        },
        title: {
          left: "center",
          text: this.title,
          textStyle: {
            color: this.textcolor, // 使用动态颜色
            fontSize: 16,
          },
        },
        legend: {
          show: this.showLegend,
          top: "30px",
          textStyle: {
            color: this.textcolor, // 使用动态颜色
          },
        },
        grid: {
          show: this.showGrid,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          borderColor: "#e6e6e6",
        },
        toolbox: {
          show: true,
          orient: "horizontal",
          left: "right",
          top: "top",
          feature: {
            // 数据视图
            dataView: {
              show: true,
              title: "数据视图",
              readOnly: false,
              lang: ["数据视图", "关闭", "刷新"],
            },
            // 图表类型切换
            magicType: {
              show: true,
              title: {
                line: "切换为折线图",
                bar: "切换为柱状图",
              },
              type: ["line", "bar"],
            },
            // 还原
            restore: {
              show: true,
              title: "还原",
            },
            // 保存为图片
            saveAsImage: {
              show: true,
              title: "保存为图片",
              type: "png",
              pixelRatio: 2,
            },
          },
        },
        xAxis: {
          type: "category",
          // boundaryGap: this.chartType === "bar",
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: "#e6e6e6",
            },
          },
          axisLabel: {
            color: this.textcolor, // 使用动态颜色
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#e6e6e6",
            },
          },
          axisLabel: {
            color: this.textcolor, // 使用动态颜色
          },
          splitLine: {
            lineStyle: {
              color: "#f0f0f0",
            },
          },
        },
        series: series.map((item, index) => {
          const seriesConfig = {
            name: item.name,
            type: this.chartType === "bar" ? "bar" : "line", // 根据 chartType 设置类型
            symbol: "circle",
            symbolSize: 4,
            smooth: this.chartType === "smooth",
            itemStyle: {
              color: item.color || "#37a2da",
            },
            lineStyle: {
              width: 2,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: item.color ? `${item.color}40` : "#37a2da40",
                  },
                  {
                    offset: 1,
                    color: item.color ? `${item.color}10` : "#37a2da10",
                  },
                ],
              },
            },
            data: item.data,
          };

          // 如果是柱状图，移除 areaStyle
          if (this.chartType === "bar") {
            delete seriesConfig.areaStyle;
            delete seriesConfig.lineStyle;
            delete seriesConfig.symbol;
            delete seriesConfig.symbolSize;
            delete seriesConfig.smooth;
          }

          // markArea 逻辑保持不变
          if (
            index === 0 &&
            this.showTimeBackground &&
            xAxisData.length === 72
          ) {
            seriesConfig.markArea = {
              silent: true,
              data: [
                [
                  {
                    xAxis: 0,
                    itemStyle: {
                      color: "rgba(255, 193, 7, 0.1)",
                      borderWidth: 0,
                    },
                  },
                  {
                    xAxis: 23,
                  },
                ],
                [
                  {
                    xAxis: 24,
                    itemStyle: {
                      color: "rgba(40, 167, 69, 0.1)",
                      borderWidth: 0,
                    },
                  },
                  {
                    xAxis: 47,
                  },
                ],
                [
                  {
                    xAxis: 48,
                    itemStyle: {
                      color: "rgba(0, 123, 255, 0.1)",
                      borderWidth: 0,
                    },
                  },
                  {
                    xAxis: 71,
                  },
                ],
              ],
            };
          }

          return seriesConfig;
        }),
      };

      this.chart.setOption(option, true);
    },
    // 重新渲染图表
    resize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    handleResize() {
      // 防抖处理，避免频繁触发
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.handleContainerResize();
      }, 100);
    },
    // 根据主题色设置图表颜色
    setChartColor() {
      this.textcolor = this.count === "theme-dark" ? "white" : "black";
    },
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
    // 监视 count 属性的变化
    count() {
      this.setChartColor(); // 在 count 变化时设置图表颜色
      this.renderChart();
    },
    // 监听 chartType 变化
    chartType() {
      this.renderChart();
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
