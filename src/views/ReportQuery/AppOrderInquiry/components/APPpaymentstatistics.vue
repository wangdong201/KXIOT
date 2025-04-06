<template>
  <div class="statistics">
    <div class="select-box">
      <div style="margin-right: 20px">
        <el-select v-model="timevalue" placeholder="请选择">
          <el-option
            v-for="item in timeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select v-model="statevalue" placeholder="请选择">
          <el-option
            v-for="item in stateoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="chart-box">
      <div ref="chart" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  props: {
    activeName: {
      type: String,
    },
  },
  data() {
    return {
      chart: null,
      textcolor: "",
      timeoptions: [
        {
          value: "选项1",
          label: "今天",
        },
        {
          value: "选项2",
          label: "昨天",
        },
        {
          value: "选项3",
          label: "本周",
        },
        {
          value: "选项4",
          label: "上周",
        },
        {
          value: "选项5",
          label: "本月",
        },
        {
          value: "选项6",
          label: "上月",
        },
      ],
      stateoptions: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "支付宝",
        },
        {
          value: "选项3",
          label: "微信",
        },
        {
          value: "选项4",
          label: "银行卡",
        },
      ],
      statevalue: "全部",
      timevalue: "今天",
      option: {
        title: {
          text: "每日短信发送统计",
          left: "center",
          textStyle: {
            color: this.textcolor,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: this.textcolor,
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Evaporation"],
          left: "left",
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              color: this.textcolor,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "交易金额",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 元",
              color: this.textcolor,
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 元";
              },
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
        ],
      },
    };
  },
  computed: {
    // 从 Vuex 状态中获取 count 值
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor();
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  watch: {
    count: function (val) {
      this.setChartColor(); // 更新颜色
      this.updateChartOptions(); // 重新应用颜色到图表
    },
    activeName(newVal) {
      if (this.chart) {
        this.chart.resize();
      } else {
        this.initChart();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    this.disposeCharts();
  },
  methods: {
    handleClose(done) {
      done();
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);
    },
    resizeChart() {
      this.chart && this.chart.resize();
    },
    disposeCharts() {
      this.chart && this.chart.dispose();
    },
    setChartColor() {
      // 获取当前主题的字体颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";

      // 在图表选项中应用颜色变化
      this.option.title.textStyle.color = this.textcolor;
      this.option.xAxis[0].axisLabel.color = this.textcolor;
      this.option.yAxis[0].axisLabel.color = this.textcolor;
    },
    updateChartOptions() {
      // 使用 setOption 更新图表，不重新初始化
      this.chart.setOption(this.option);
    },
  },
};
</script>

<style>
.select-box {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.statistics {
  width: 100%;
  height: 72vh;
}

.chart-box {
  width: 100%;
  height: 100%;
}
</style>
