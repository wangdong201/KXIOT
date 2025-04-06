<template>
  <div class="dashboard-editor-container">
    <div class="Isolation"></div>
    <div class="Form_Box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline"
        ><el-form-item label="变配电站名称">
          <el-input
            v-model="formInline.user"
            placeholder="E楼宇信息"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item label="变压器名称">
          <el-select v-model="formInline.region" placeholder="区域一">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="dialogVisible = true"
            class="el-button--primary"
            >历史数据</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 進度條 -->
    <div class="schedule">
      <div class="schedule-left">
        <InstrumentPanelEcharts />
        <div class="poab">负载率(%)</div>
      </div>
      <div class="schedule-right">
        <div class="schedule-left-top">
          <div class="schedule-one">
            <div class="schedule-one-top">
              <span>频率</span>
              <span>频率</span>
              <span>频率</span>
              <span>频率</span>
            </div>
            <div class="schedule-one-bottom">
              <el-progress
                type="circle"
                :percentage="50.3"
                color="#5470C6"
                class="custom-progress"
              ></el-progress>
              <el-progress
                type="circle"
                :percentage="50.3"
                color="#5470C6"
                class="custom-progress"
              ></el-progress>
              <el-progress
                type="circle"
                :percentage="50.3"
                color="#5470C6"
                class="custom-progress"
              ></el-progress>
              <el-progress
                type="circle"
                :percentage="50.3"
                color="#5470C6"
                class="custom-progress"
              ></el-progress>
            </div>
          </div>
        </div>
        <div class="schedule-left-bt">
          <div class="center-bt">
            <span>负载</span>
            <span>电流</span>
            <span>电压</span>
            <span>温度</span>
            <span>总谐波含有率</span>
          </div>
          <div>
            <div class="center-load">
              <p v-for="index in 4" :key="index">
                额定容量
                <span>5001</span>
                kVA
              </p>
              <p>2024-04-07 09:44</p>
            </div>
            <div class="center-load">
              <p class="Acolor">
                A相
                <span class="Acolor">66.40</span>
                A
              </p>
              <p class="Bcolor">
                B相
                <span class="Bcolor">66.40</span>
                B
              </p>
              <p class="Ccolor">
                C相
                <span class="Ccolor">66.40</span>
                C
              </p>
            </div>
            <div class="center-load">
              <p class="Acolor">
                Uab
                <span class="Acolor">410.70</span>
                V
              </p>
            </div>
            <div class="center-load">
              <p class="Acolor">
                A相绕组温度
                <span class="Acolor">42.80</span>
                ℃
              </p>
              <p class="Bcolor">
                B相绕组温度
                <span class="Bcolor">42.80</span>
                ℃
              </p>
              <p class="Ccolor">
                C相绕组温度
                <span class="Ccolor">42.80</span>
                ℃
              </p>
            </div>
            <div class="center-load">
              <p class="Acolor">
                A相电流
                <span class="Acolor">84.29</span>
                %
              </p>
              <p class="Bcolor">
                A相电流
                <span class="Bcolor">84.29</span>
                %
              </p>
              <p class="Ccolor">
                A相电流
                <span class="Ccolor">84.29</span>
                %
              </p>
              <p class="Acolor">
                A相电壓
                <span class="Acolor">1.29</span>
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-power" style="margin-top: 30px">
      <!-- 負載率曲綫 -->
      <div class="Load-rate">
        <!-- <p>負載率曲綫</p> -->
        <div class="transformLine1">
          <LoadRateEcharts />
        </div>
      </div>
      <!-- 有功功率 -->
      <div class="Load-rate">
        <!-- <p>有功功率</p> -->
        <div class="transformLine1">
          <ActivePowerEcharts :seriesData="ActivePowerEchartsData" />
        </div>
      </div>
      <!-- 無功功率 -->
      <div class="Load-rate">
        <!-- <p>無功功率</p> -->
        <div class="transformLine1">
          <ActivePowerEcharts :seriesData="ActivePowerEchartsData" />
        </div>
      </div>
    </div>
    <!-- 彈出層 -->
    <div>
      <el-dialog
        title="歷史數據"
        :visible.sync="dialogVisible"
        width="1000px"
        :before-close="handleClose"
      >
        <div class="historical-data">
          <!-- 日期選擇及按鈕 -->
          <div class="toprow">
            <el-form ref="form" :model="form" class="form-box">
              <div class="block">
                <span style="padding-right: 10px">日期</span>
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div class="toprow-button">
                <el-button
                  type="primary"
                  @click="previousDay"
                  class="el-button--primary"
                  >上一日</el-button
                >
                <el-button
                  type="primary"
                  @click="nextDay"
                  class="el-button--primary"
                  >下一日
                </el-button>
                <el-button
                  type="primary"
                  :class="{
                    epb: showChartComponent,
                    'el-button--primary': !showChartComponent,
                  }"
                  @click="showChart"
                  >圖表
                </el-button>
                <el-button
                  type="primary"
                  :class="{
                    epb: !showChartComponent,
                    'el-button--primary': showChartComponent,
                  }"
                  @click="showTable"
                  >數據</el-button
                >
              </div>
              <div>
                <el-select v-model="formInline.region" placeholder="視在功率">
                  <el-option label="視在功率" value="11"></el-option>
                  <el-option label="有功功率" value="22"></el-option>
                  <el-option label="無功功率" value="33"></el-option>
                </el-select>
              </div>
            </el-form>
          </div>

          <div class="HistoricalData">
            <!-- 圖表 -->
            <HistoricalDataEcharts
              v-if="showChartComponent"
              style="z-index: 999"
            />
            <!-- 表格 -->
            <TabViewData v-else />
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PanelGroup from "./dashboard/PanelGroup";
import LineChart from "./dashboard/LineChart";
import RaddarChart from "./dashboard/RaddarChart";
import PieChart from "./dashboard/PieChart";
import BarChart from "./dashboard/BarChart";
import LoadRateEcharts from "@/components/echarts/LoadRate";
import ActivePowerEcharts from "@/components/echarts/ActivePower";
import HistoricalDataEcharts from "@/components/echarts/HistoricalData";
import TabViewData from "@/components/echarts/TabView";
import InstrumentPanelEcharts from "@/components/echarts/InstrumentPanel";

export default {
  name: "Index",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    LoadRateEcharts,
    ActivePowerEcharts,
    HistoricalDataEcharts,
    TabViewData,
    InstrumentPanelEcharts,
  },
  data() {
    return {
      ActivePowerEchartsData: ["100", "30", "23", "109", "50", "60", "87"],
      formInline: {
        user: "",
        region: "",
      },
      dialogVisible: false,
      form: {
        date1: new Date(),
      },
      value1: "",
      showChartComponent: true,
    };
  },
  mounted() {},

  methods: {
    handleClose(done) {
      done();
    },
    showChart() {
      this.showChartComponent = true;
    },
    showTable() {
      this.showChartComponent = false;
    },

    previousDay() {
      const currentDate = new Date(this.form.date1);
      currentDate.setDate(currentDate.getDate() - 1);
      this.form.date1 = currentDate;
    },
    nextDay() {
      const currentDate = new Date(this.form.date1);
      currentDate.setDate(currentDate.getDate() + 1);
      this.form.date1 = currentDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgba(0, 0, 0, 0); //rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: rgba(0, 0, 0, 0); //#fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    background: rgba(0, 0, 0, 0);
    padding: 8px;
  }
}

// .Isolation {
//   width: 1700px;
//   border: 1px solid #175e77;
// }

.Form_Box {
  margin-top: 10px;
}

.schedule {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  height: 435.5px;

  .schedule-left {
    width: 25%;
    height: 100%;
    // background-color: #304156;
    box-shadow: 0 2px 12px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平居中 */

    .echarts-chart {
      width: 100%;
      height: 300px;
      margin-top: 50px;
    }

    .poab {
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      bottom: 130px;
      // color: #65c5fc;
    }
  }

  .schedule-right {
    width: calc(75% - 20px);
  }

  .schedule-left-top {
    margin-bottom: 5px;
    height: 49%;
    // background-color: #304156;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .schedule-left-bt {
    display: inline-block;
    height: 50%;
    width: 100%;
    font-size: 14px;
    // background-color: #304156;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .center-bt {
      height: 32px;
      width: 100%;
      border-bottom: 1px solid #ccc;

      span {
        line-height: 32px;
        width: 19%;
        display: inline-block;
        // color: #65c5fc;
        padding-left: 20px;
      }
    }

    .center-load {
      width: 19%;
      height: 100%;
      min-width: 155px;
      padding-left: 20px;
      display: inline-block;
      vertical-align: top;

      span {
        color: #00ffb9;
        width: 40px;
        display: inline-block;
        margin: 0 10px;
      }

      .Acolor {
        color: #ffd600;
      }
      .Bcolor {
        color: #8fc31f;
      }
      .Ccolor {
        color: #e60012;
      }
    }
  }
  .schedule-one {
    display: flex;
    flex-direction: column;
    align-items: center;
    .schedule-one-top {
      display: flex;
      justify-content: space-around;
      height: 32px;
      width: 100%;
      border-bottom: 1px solid #ccc;

      span {
        line-height: 32px;
      }
    }
    .schedule-one-bottom {
      padding-top: 20px;
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }
}

.center-power {
  margin-top: 5px;
  height: calc(50% - 60px);
  width: 100%;
  display: flex;
  justify-content: space-between;

  .Load-rate {
    width: calc(33% - 20px);
    height: 100%;
    vertical-align: top;

    .transformLine1 {
      height: 100%;
      width: 100%;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      position: relative;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .transformLine1:hover {
      transform: scale(1.02); /* 移入时变大 */
      transition: transform 0.5s ease;
    }
  }

  p {
    font-size: 16px;
    // color: #65c5fc;
    font-weight: 700;
    padding-left: 8px;
    border-left: 2px solid;
    line-height: 36px;
    margin: 0;
  }
}

.historical-data {
  overflow: hidden;
  padding-bottom: 10px !important;
  // padding: 30px 20px;
  // color: #606266;
  font-size: 14px;
  word-break: break-all;

  .toprow {
    padding: 5px 15px 0 15px;
    margin-bottom: 5px;
    height: auto;
    width: 100%;

    .form-box {
      display: flex;
      justify-content: space-between;
    }
  }

  .toprow-button {
    display: flex;
  }

  .HistoricalData {
    margin-top: 15px;
  }
}

.epb {
  background-color: #175e77;
  border: #175e77;
}
</style>
