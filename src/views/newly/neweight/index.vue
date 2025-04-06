<template>
  <div class="main-box">
    <div class="main-header">
      <i class="el-icon-map-location"></i>
      <span style="padding-left: 10px">xxxxx公寓</span>
    </div>
    <div class="main-box-top">
      <div class="information box-hover">
        <div class="information-title">
          <div class="information-colorBox">
            <svg-icon icon-class="yh1" style="width: 4rem; height: 4rem" />
          </div>
          <div class="information-data">用户总数</div>
        </div>
        <div class="mbt-infor">
          <div class="mbt-infor-data">
            <span>总用户数: 41 (户)</span>
            <span>欠费断电: 41 (户)</span>
          </div>
          <div class="mbt-infor-data"></div>
        </div>
      </div>
      <div class="information2 box-hover">
        <div class="information-title">
          <div class="information-colorBox2">
            <svg-icon icon-class="xf" style="width: 4rem; height: 4rem" />
          </div>
          <div class="information-data">当日消费</div>
        </div>
        <div class="mbt-infor">
          <div class="mbt-infor-data">
            <span>今日消费: 153.02 (元)</span>
            <span>今日存款: 200.00 (元)</span>
          </div>
          <div class="mbt-infor-data">账户余额: 1000.00 (元)</div>
        </div>
      </div>
      <div class="information3 box-hover">
        <div class="information-title">
          <div class="information-colorBox3">
            <svg-icon icon-class="sdb" style="width: 4rem; height: 4rem" />
          </div>
          <div class="information-data">水电表总数</div>
        </div>
        <div class="mbt-infor">
          <div class="mbt-infor-data">
            <span>电表数: 41 (只)</span>
            <span>水表: 41 (只)</span>
          </div>
          <div class="mbt-infor-data">
            <span>离线电表: 41 (只)</span>
            <span>离线水表: 41 (只)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-box-bottom">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="custom-tabs"
      >
        <el-tab-pane label="实时用电" name="first">
          <div class="electric-tab">
            <div class="electric-tab-box">
              <div class="etc">
                <div
                  class="etb-content box-hover"
                  v-for="index in 3"
                  :key="index"
                >
                  <div class="etb-tada">
                    <div class="electric-text">10.46</div>
                    <span>当日用电</span>
                  </div>
                  <div class="etb-svgimg">
                    <svg-icon
                      icon-class="dl"
                      style="width: 3rem; height: 3rem"
                    />
                  </div>
                </div>
              </div>
              <div class="etc">
                <div
                  class="etb-content box-hover"
                  v-for="index in 3"
                  :key="index"
                >
                  <div class="etb-tada">
                    <div class="electric-text">10.46</div>
                    <span>当月用电</span>
                  </div>
                  <div class="etb-svgimg">
                    <svg-icon
                      icon-class="dl"
                      style="width: 3rem; height: 3rem"
                    />
                  </div>
                </div>
              </div>
              <div class="etc">
                <div
                  class="etb-content box-hover"
                  v-for="index in 3"
                  :key="index"
                >
                  <div class="etb-tada">
                    <div class="electric-text">10.46</div>
                    <span>单位面积能耗</span>
                  </div>
                  <div class="etb-svgimg">
                    <svg-icon
                      icon-class="nh"
                      style="width: 3rem; height: 3rem"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="electric-tab-box2">
              <div class="electric-echart-title">
                <span
                  class="label"
                  :class="{ active: selectedChart === 'hourly' }"
                  @click="selectedChart = 'hourly'"
                  >小时用电量</span
                >
                <span
                  class="label"
                  :class="{ active: selectedChart === 'daily1' }"
                  @click="selectedChart = 'daily1'"
                  >日用电量内容</span
                >
                <span
                  class="label"
                  :class="{ active: selectedChart === 'daily2' }"
                  @click="selectedChart = 'daily2'"
                  >月用电量内容</span
                >
              </div>
              <div
                style="margin-top: 10px; width: 100%"
                v-if="selectedChart === 'hourly'"
              >
                <echartsNew
                  ref="chartComponent"
                  :data="chartSeries"
                  :chartHeight="chartHeight"
                  :Xdata="Xdata"
                  :unit="unit"
                  :legendRight="legendRight"
                />
              </div>
              <div
                style="margin-top: 10px; width: 100%"
                v-else-if="selectedChart === 'daily1'"
              >
                <echartsNew
                  ref="chartComponent"
                  :data="chartSeries2"
                  :chartHeight="chartHeight"
                  :Xdata="Xdata2"
                  :unit="unit2"
                  :legendRight="legendRight"
                />
              </div>
              <div
                style="margin-top: 10px; width: 100%"
                v-else-if="selectedChart === 'daily2'"
              >
                <echartsNew
                  ref="chartComponent"
                  :data="chartSeries3"
                  :chartHeight="chartHeight"
                  :Xdata="Xdata3"
                  :unit="unit3"
                  :legendRight="legendRight"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实时用水" name="second">
          <div class="electric-tab">
            <div class="electric-tab-box">
              <div class="etc">
                <div
                  class="etb-content box-hover"
                  v-for="index in 3"
                  :key="index"
                >
                  <div class="etb-tada">
                    <div class="electric-text">10.46</div>
                    <span>当日用水</span>
                  </div>
                  <div class="etb-svgimg">
                    <svg-icon
                      icon-class="sl"
                      style="width: 3rem; height: 3rem"
                    />
                  </div>
                </div>
              </div>
              <div class="etc">
                <div
                  class="etb-content box-hover"
                  v-for="index in 3"
                  :key="index"
                >
                  <div class="etb-tada">
                    <div class="electric-text">10.46</div>
                    <span>当月用水</span>
                  </div>
                  <div class="etb-svgimg">
                    <svg-icon
                      icon-class="sl"
                      style="width: 3rem; height: 3rem"
                    />
                  </div>
                </div>
              </div>
              <div class="etc">
                <div
                  class="etb-content box-hover"
                  v-for="index in 3"
                  :key="index"
                >
                  <div class="etb-tada">
                    <div class="electric-text">10.46</div>
                    <span>单位面积能耗</span>
                  </div>
                  <div class="etb-svgimg">
                    <svg-icon
                      icon-class="nh"
                      style="width: 3rem; height: 3rem"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="electric-tab-box2">
              <div class="electric-echart-title">
                <span
                  class="label"
                  :class="{ active: selectedChart === 'hourly' }"
                  @click="selectedChart = 'hourly'"
                  >小时用水量</span
                >
                <span
                  class="label"
                  :class="{ active: selectedChart === 'daily1' }"
                  @click="selectedChart = 'daily1'"
                  >日用水量内容</span
                >
                <span
                  class="label"
                  :class="{ active: selectedChart === 'daily2' }"
                  @click="selectedChart = 'daily2'"
                  >月用水量内容</span
                >
              </div>
              <div
                style="margin-top: 10px; width: 100%"
                v-if="selectedChart === 'hourly'"
              >
                <echartsNew
                  :active="activeName"
                  ref="chartComponent"
                  :data="chartSeries"
                  :chartHeight="chartHeight"
                  :Xdata="Xdata"
                  :unit="unit"
                  :legendRight="legendRight"
                />
              </div>
              <div
                style="margin-top: 10px; width: 100%"
                v-else-if="selectedChart === 'daily1'"
              >
                <echartsNew
                  :active="activeName"
                  ref="chartComponent"
                  :data="chartSeries2"
                  :chartHeight="chartHeight"
                  :Xdata="Xdata2"
                  :unit="unit2"
                  :legendRight="legendRight"
                />
              </div>
              <div
                style="margin-top: 10px; width: 100%"
                v-else-if="selectedChart === 'daily2'"
              >
                <echartsNew
                  :active="activeName"
                  ref="chartComponent"
                  :data="chartSeries3"
                  :chartHeight="chartHeight"
                  :Xdata="Xdata3"
                  :unit="unit3"
                  :legendRight="legendRight"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon";
import echartsNew from "./components/newViewEcharts9.vue";

export default {
  components: {
    SvgIcon,
    echartsNew,
  },
  data() {
    return {
      activeName: "first",
      selectedChart: "hourly", // 默认选中小时用电量
      chartHeight: "23rem",
      unit: "小时用电量",
      unit2: "日用电量",
      unit3: "月用电量",
      legendRight: 30,
      chartSeries: [
        {
          name: "今天",
          data: [20, 32, 11, 13, 30, 20, 21],
          type: "line",
          smooth: true,
        },
        {
          name: "昨天",
          data: [22, 12, 11, 34, 29, 33, 31],
          type: "line",
          smooth: true,
        },
      ],
      chartSeries2: [
        {
          name: "上月",
          data: [20, 32, 11, 13, 30, 20, 21],
          type: "bar",
          smooth: true,
        },
        {
          name: "本月",
          data: [22, 12, 11, 34, 29, 33, 31],
          type: "bar",
          smooth: true,
        },
      ],
      chartSeries3: [
        {
          name: "去年",
          data: [20, 32, 11, 13, 30, 20, 21],
          type: "line",
          smooth: true,
        },
        {
          name: "今年",
          data: [22, 12, 11, 34, 29, 33, 31],
          type: "line",
          smooth: true,
        },
      ],
      Xdata: ["0时", "3时", "6时", "9时", "12时", "13时", "15时"],
      Xdata2: ["1日", "3日", "6日", "9日", "12日", "15日", "18日"],
      Xdata3: ["一月", "三月", "五月", "七月", "九月", "十一月", "十二月"],
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$refs.chartComponent.chartInstance.resize();
    },
  },
};
</script>

<style scoped lang="scss">
.main-box {
  min-height: calc(100vh - 64px);
  padding: 10px 20px;
  width: 100%;

  .custom-tabs {
    width: 100% !important;
  }

  .custom-tabs .box-hover:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }

  .main-header {
    font-size: 25px;
    font-weight: bolder;
  }

  .main-box-top {
    width: 100%;
    height: 11.5rem;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .information,
    .information2,
    .information3 {
      width: calc(33% - 10px);
      border-radius: 10px;
      position: relative;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
      padding: 0px 10px;

      .information-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .information-colorBox,
      .information-colorBox2,
      .information-colorBox3 {
        width: 6rem;
        height: 6rem;
        border-radius: 10px;
        background-color: rgba(43, 132, 236, 1);
        margin-top: -20px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .information-colorBox2 {
        background-color: rgba(229, 50, 112, 1);
      }
      .information-colorBox3 {
        background-color: rgba(93, 180, 97, 1);
      }

      .information-data {
        width: 60%;
        text-align: right;
        padding-right: 30px;
        font-size: 30px;
        font-weight: bolder;
      }

      .mbt-infor {
        width: 100%;
        height: 50%;
        border-top: 1px solid #e6e6e6;
        margin-top: 15px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .mbt-infor-data {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .main-box-bottom {
    margin-top: 30px;

    .electric-tab {
      width: 100%;
      height: 100%;
      padding: 10px 30px;
      display: flex;
      justify-content: space-between;

      .electric-tab-box {
        width: calc(50% - 10px);

        .etb-content {
          box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          width: calc(33% - 10px);
          height: 8rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          text-align: center;

          .electric-text {
            font-size: 40px;
            font-weight: bolder;
          }
        }

        .etc {
          display: flex;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      }

      .electric-tab-box2 {
        width: calc(50% - 10px);
        .electric-echart-title {
          display: flex;
          justify-content: space-around;
          margin-top: 10px;

          .label {
            cursor: pointer;
            border: 1px solid #ccc;
            padding: 10px 15px;
            border-radius: 8px;
          }

          .label.active {
            font-weight: bold;
            border: 1px solid #2b84ec;
            background-color: #2b84ec;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
