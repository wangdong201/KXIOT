<template>
  <div class="dashboard-editor-bgimg">
    <!-- Header -->
    <div class="header-container">
      <div class="header-left">
        <div class="left-box">
          <div class="left-bgimg header-mr">
            <div class="text-style"><span>大屏首页</span></div>
          </div>
          <div class="left-bgimg header-mr">
            <div class="text-style"><span>精细化管理</span></div>
          </div>
          <div class="left-bgimg header-mr">
            <div class="text-style"><span>空调管控</span></div>
          </div>
        </div>
      </div>
      <div class="header-title header-mr"><span>数据大屏2</span></div>
      <div class="header-right">
        <div class="left-box">
          <div class="left-bgimg header-ml">
            <div class="text-style"><span>地下人防</span></div>
          </div>
          <div class="left-bgimg header-ml">
            <div class="text-style"><span>光伏系统</span></div>
          </div>
          <div class="left-bgimg right-bgimg header-ml">
            <div class="text-style">
              <span>{{ getCurrentTime() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main -->
    <div class="main-box">
      <div class="main-left-box">
        <div class="left-top-box">
          <div class="left-top-bgimg">能耗定额指标</div>
          <div class="left-top-echart">
            <ElectricVue />
            <ElectricVue />
          </div>
        </div>
        <div class="left-top-box">
          <div class="left-top-bgimg">总用电同环比</div>
          <div class="">
            <TotalElectricityConsumption />
          </div>
        </div>
        <div class="left-top-box">
          <div class="left-top-bgimg">分项用电占比</div>
          <div class="left-top-echart">
            <PieChart />
          </div>
        </div>
      </div>
      <div class="main-center-box">
        <div class="center-bgimg">
          <img src="../../../assets/images/sj07.png" alt="" />
          <div style="padding-left: 20px">
            <div class="ctbg-text"><span>810246.02</span></div>
            <span class="ctbg-text2">累计用电量/mvh</span>
          </div>
        </div>
        <div class="center-bgimg bgimg-mx">
          <img src="../../../assets/images/sj08.png" alt="" />
          <div style="padding-left: 20px">
            <div class="ctbg-text"><span>810246.02</span></div>
            <span class="ctbg-text2">累计用电量/mvh</span>
          </div>
        </div>
        <div class="center-bgimg">
          <img src="../../../assets/images/sj09.png" alt="" />
          <div style="padding-left: 20px">
            <div class="ctbg-text"><span>810246.02</span></div>
            <span class="ctbg-text2">累计用电量/mvh</span>
          </div>
        </div>
      </div>
      <div class="main-right-box">
        <div class="left-top-box">
          <div class="left-top-bgimg">双碳监测</div>
          <div class="left-top-echart">
            <CarbonMonitoring />
          </div>
        </div>
        <div class="left-top-box">
          <div class="left-top-bgimg">光伏发电</div>
          <div class="">
            <ReactivePower />
          </div>
        </div>
        <div class="left-top-box">
          <div class="left-top-bgimg">水耗分析</div>
          <div class="left-top-echart">
            <TotalElectricityConsumption />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElectricVue from "@/components/echarts/Electric.vue";
import TotalElectricityConsumption from "@/components/echarts/TotalElectricityConsumption.vue";
import PieChart from "@/components/echarts/PieChart.vue";
import ReactivePower from "@/components/echarts/ReactivePower.vue";
import CarbonMonitoring from "@/components/echarts/CarbonMonitoring.vue";

export default {
  name: "NewView4",
  components: {
    ElectricVue,
    TotalElectricityConsumption,
    PieChart,
    ReactivePower,
    CarbonMonitoring,
  },

  data() {
    return {};
  },
  methods: {
    //获取当前时间
    getCurrentTime() {
      return new Date().toLocaleTimeString();
    },
  },
  created() {
    setInterval(() => {
      this.$forceUpdate(); // 强制更新组件
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.dashboard-editor-bgimg {
  width: 100%;
  height: calc(100vh - 64px);
  opacity: 1;
  border-style: solid;
  border-radius: 0px;
  background-size: 100% 100%;
  border-width: 0px;
  padding: 0px 20px;
  background-image: url("../../../assets/images/sj05.png");

  // top header
  .header-container {
    height: 150px;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../../../assets/images/sj02.png");
    display: flex;
    justify-content: space-between;

    .text-style {
      font-size: 1rem;
      font-family: 微软雅黑;
      justify-content: center;
      align-items: center;
      // line-height: 1.5;
      border-width: 0px;
      border-style: solid;
      opacity: 1;
      border-radius: 0px;
      color: rgb(180, 237, 253);
      border-color: rgb(255, 255, 255);
    }

    .header-title {
      font-size: 3rem;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      line-height: 1.8;
      opacity: 1;
      color: rgba(255, 255, 255, 0.7);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .header-left,
    .header-right {
      padding-top: 15px;
      .left-box {
        display: flex;
        .left-bgimg {
          background-color: rgba(0, 0, 0, 0);
          opacity: 1;
          border-style: solid;
          border-radius: 0px;
          border-width: 0px;
          border-color: rgb(255, 255, 255);
          padding: 10px 20px;
          pointer-events: auto;
          background-size: 100% 100%;
          background-image: url("../../../assets/images/sj03.png");
        }
        .header-mr {
          margin-right: 45px;
        }
        .header-ml {
          margin-left: 45px;
        }
      }

      .right-bgimg {
        background-image: url("../../../assets/images/sj06.png") !important;
      }
    }
  }

  // main
  .main-box {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;

    .main-left-box,
    .main-right-box,
    .main-center-box {
      position: relative;
      width: calc(60% - 20px);
      top: -30px;
    }

    .main-center-box {
      display: flex;
      .center-bgimg {
        width: 33%;
        height: 15%;
        background-color: rgba(0, 0, 0, 0);
        opacity: 1;
        border-style: solid;
        border-radius: 8px;
        background-size: 100% 100%;
        border-width: 0px;
        border-color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(6, 36, 70));
      }

      .ctbg-text {
        font-size: 2rem;
        font-family: 微软雅黑;
        font-weight: bold;
        justify-content: center;
        align-items: center;
        line-height: 1.5;
        border-width: 0px;
        border-style: solid;
        opacity: 1;
        border-radius: 0px;
        color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
      }

      .ctbg-text2 {
        font-size: 1rem;
        font-family: 微软雅黑;
        justify-content: center;
        align-items: center;
        line-height: 1.5;
        border-width: 0px;
        border-style: solid;
        opacity: 0.5;
        border-radius: 0px;
        color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
      }

      .bgimg-mx {
        margin: 0px 50px;
      }
    }

    .main-left-box,
    .main-right-box {
      height: 80%;
      width: 20%;
      background-color: rgba(6, 36, 70, 0.36);
      opacity: 1;
      border-style: solid;
      border-radius: 16px;
      background-size: 100% 100%;
      border-width: 1px;
      border-color: rgba(2, 160, 224, 0.2);
    }

    .main-left-box,
    .main-right-box {
      .left-top-box {
        height: calc(33% - 10px);
        .left-top-echart {
          display: flex;
        }
        .left-top-bgimg {
          height: 50px;
          width: 100%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url("../../../assets/images/sj10.png");
          padding-left: 35px;
          padding-top: 10px;
          font-size: 1.5rem;
          font-family: 微软雅黑;
          font-style: oblique;
          font-weight: bold;
          color: rgba(117, 224, 255, 1);
        }
      }
    }
  }
}
</style>
