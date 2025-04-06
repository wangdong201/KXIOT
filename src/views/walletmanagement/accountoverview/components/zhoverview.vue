<template>
  <div class="zhoverview_container">
    <div class="data-overview">
      <div class="AccountSettlement">
        <div ref="chart" style="width: 110%; height: 110%"></div>
      </div>
      <div class="SettlementStatistics">
        <div class="title">结算数据统计</div>
        <ul style="font-size: 12px">
          <li class="balance"><span>账户余额</span> <span>0.01元</span></li>
          <li class="balance">
            <span class="jy-span" @click="dialogVisible = true"
              >总线上交易次数</span
            >
            <span>1笔</span>
          </li>
          <li class="balance">
            <span class="jy-span" @click="dialogVisible = true"
              >总线上交易金额</span
            >
            <span>0.01元</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="TransactionStatistics">
      <div ref="chart2" style="width: 100%; height: 100%"></div>
    </div>
    <!-- 结算数据统计弹出层 -->
    <el-dialog
      title="查看交易记录"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <div style="height: 750px; overflow: auto">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item label="日期范围" prop="time" required>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.time"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="单号类型" prop="region">
            <el-select v-model="form.region" placeholder="">
              <el-option label="无" value="null"></el-option>
              <el-option label="系统交易订单号" value="xttransfer"></el-option>
              <el-option
                label="第三方交易订单号"
                value="sftransfer"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易单号查询" prop="jynumber" required>
            <el-input placeholder="交易单号" v-model="form.jynumber"></el-input>
          </el-form-item>
          <el-form-item label="交易状态" prop="region2">
            <el-select v-model="form.region2" placeholder="">
              <el-option label="全部" value="all"></el-option>
              <el-option label="交易成功" value="jysuccess"></el-option>
              <el-option label="交易失败" value="jyfail"></el-option>
              <el-option label="交易退款" value="jytuihuo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit3">查询</el-button>
            <el-button type="primary" @click="onSubmit4">导出到EXCEL</el-button>
          </el-form-item>
        </el-form>
        <!-- table -->
        <div style="margin-top: 15px">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="shdh" label="商户交易单号">
            </el-table-column>
            <el-table-column prop="xtdh" label="系统交易单号">
            </el-table-column>
            <el-table-column prop="time" label="用户支付时间">
            </el-table-column>
            <el-table-column prop="region" label="总金额"> </el-table-column>
            <el-table-column prop="commission" label="手续费">
            </el-table-column>
            <el-table-column prop="tkmoney" label="退款金额"> </el-table-column>
            <el-table-column prop="balance" label="结算金额"> </el-table-column>
            <el-table-column prop="jytype" label="交易说明"> </el-table-column>
            <el-table-column prop="jystatus" label="交易状态">
            </el-table-column>
            <el-table-column prop="jyremark" label="操作"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      chart: null,
      chart2: null,
      dialogVisible: false,
      mycolor: "",
      textcolor: "",
      option: {
        title: {
          text: "大飞 账户结算情况总览",
          subtext: "2024-07-23",
          left: "center",
          textStyle: {
            color: this.textcolor,
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#ccc",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [{ value: 1048, name: "Search Engine" }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option2: {
        title: {
          text: "大飞 账户结算情况总览",
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
          data: ["Evaporation", "Temperature"],
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
          {
            type: "value",
            name: "交易笔数",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} 笔",
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
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " 笔";
              },
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
      form: {
        time: "",
        region: "null",
        jynumber: "",
        region2: "all",
      },
      tableData: [
        {
          shdh: "123456789",
          xtdh: "123456789",
          time: "2021-07-23 10:00:00",
          region: "0.01元",
          commission: "0.01元",
          tkmoney: "0.01元",
          balance: "0.01元",
          jytype: "充值",
          jystatus: "交易成功",
          jyremark: "",
        },
      ],
    };
  },
  computed: {
    // 从 Vuex 状态中获取 count 值
    ...mapState({
      count: (state) => state.settings.sideTheme,
    }),
  },
  mounted() {
    this.setChartColor(); // 首次加载时调用，确保初始化时颜色正确
    this.initChart(); // 初始化图表
    window.addEventListener("resize", this.resizeChart);
  },
  watch: {
    count: function (val) {
      this.setChartColor(); // 更新颜色
      this.updateChartOptions(); // 重新应用颜色到图表
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
      this.chart2 = echarts.init(this.$refs.chart2);
      this.chart.setOption(this.option); // 设置第一个图表
      this.chart2.setOption(this.option2); // 设置第二个图表
    },
    resizeChart() {
      this.chart && this.chart.resize();
      this.chart2 && this.chart2.resize();
    },
    disposeCharts() {
      this.chart && this.chart.dispose();
      this.chart2 && this.chart2.dispose();
    },
    setChartColor() {
      // 获取当前主题的字体颜色
      this.textcolor = this.count === "theme-dark" ? "white" : "black";

      // 在图表选项中应用颜色变化
      this.option.title.textStyle.color = this.textcolor;
      this.option2.title.textStyle.color = this.textcolor;
      this.option2.xAxis[0].axisLabel.color = this.textcolor;
      this.option2.yAxis[0].axisLabel.color = this.textcolor;
      this.option2.yAxis[1].axisLabel.color = this.textcolor;
    },
    updateChartOptions() {
      // 使用 setOption 更新图表，不重新初始化
      this.chart.setOption(this.option);
      this.chart2.setOption(this.option2);
    },

    onSubmit3() {},
    onSubmit4() {},
  },
};
</script>

<style scoped lang="scss">
.zhoverview_container {
  height: 81vh;

  .data-overview,
  .TransactionStatistics {
    height: 50%;
  }

  .data-overview {
    display: flex;
    justify-content: space-between;
  }

  .SettlementStatistics {
    height: 100%;
    width: 35%;
  }

  .AccountSettlement {
    height: 100%;
    width: 60%;
    overflow: hidden;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-top: 10px;
  }

  .balance {
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .jy-span {
    cursor: pointer;
    color: #2fa4e7;

    &:hover {
      color: #157ab5;
    }
  }
}
</style>
