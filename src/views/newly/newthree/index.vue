<template>
  <div class="dashboard-editor-container">
    <div class="dashboard-editor-content" id="printableContent">
      <!-- 标题 -->
      <div class="title-box">
        <div class="title" @click="printPage">
          <span>xx能源平台</span>
        </div>
      </div>
      <div class="dec-container">
        <!-- 左侧展示部分 -->
        <div class="dec-left">
          <dv-border-box-12 :color="['#7894DA']" class="db-box"
            ><span class="text-box">当前能耗水平(今日用电)</span>
            <div class="circle-box">
              <div class="circle">优</div>
              <div class="circle-img">
                <div class="circle-img-top">
                  <div class="circle-img-box">
                    <img
                      class="img"
                      src="https://ufsnode.chintcloud.net/ufs/cloudconfigure/a4d22f1d26e4697b751b2ce1d58dd5c3.png"
                      alt=""
                    />
                    <span class="text-pd">0%</span>
                  </div>
                  <div class="">
                    <img
                      class="img"
                      src="https://ufsnode.chintcloud.net/ufs/cloudconfigure/c4882dc3430b5ea421c4350f7d142781.png"
                      alt=""
                    />
                    <span class="text-pd">0%</span>
                  </div>
                </div>
                <div class="circle-img-bt">
                  <div class="circle-img-box">
                    <img
                      class="img"
                      src="https://ufsnode.chintcloud.net/ufs/cloudconfigure/2e43a51df9d69bc1b54a7b456714fe8c.png"
                      alt=""
                    />
                    <span class="text-pd">0%</span>
                  </div>
                  <div class="">
                    <img
                      class="img"
                      src="https://ufsnode.chintcloud.net/ufs/cloudconfigure/410b4c21b22c23b1495019d10ac51ed1.png"
                      alt=""
                    />
                    <span class="text-pd">0%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="kwh-box">
              <div class="kwh-title" v-for="index in 5" :key="index">
                <p class="text-box">xx园区能耗 kwh</p>
                <el-progress
                  :percentage="50"
                  style="width: 60%"
                  color="#3573C1"
                ></el-progress>
              </div>
            </div>
          </dv-border-box-12>
        </div>
        <!-- 中间展示部分 -->
        <div class="dec-center">
          <div class="dec-center-bg">
            <div class="dec-tb">
              <div class="dec-tb-left">
                <img
                  class="dec-image"
                  src="../../../assets/images/nh.svg"
                  alt=""
                />
              </div>
              <div class="dec-tb-right">
                <div class="dec-tb-right-title">3040.08</div>
                <div class="dec-tb-right-text">
                  <span class="sp-one">55%</span
                  ><span class="sp-two">总能耗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧展示部分 -->
        <div class="dec-right">
          <dv-border-box-12 :color="['#7894DA']" class="db-box"
            ><span class="text-box">xx园区能耗趋势(今日用水)</span>
            <div class="dec-right-box">
              <span class="">总用水量：</span>
              <div class="dec-right-box-tubiao">
                <span style="padding-right: 15px">0m³</span>
                <img
                  class="dec-shidu"
                  src="../../../assets/images/shidu.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="dec-fg"></div>
            <div>
              <water-volume-chart chart-id="main-chart"></water-volume-chart>
            </div>
          </dv-border-box-12>
        </div>
      </div>
      <!-- 底部展示部分 -->
      <div class="Bottom-data">
        <div class="Bottom-data-left dec-right">
          <dv-border-box-12 :color="['#7894DA']" class="db-box"
            ><span class="text-box">xx园区能耗趋势(今日用水)</span>
            <div class="dec-right-box">
              <span class="">总用水量：</span>
              <div class="dec-right-box-tubiao">
                <span style="padding-right: 15px">0m³</span>
              </div>
            </div>
            <div class="dec-fg"></div>
            <div>
              <water-volume-chart chart-id="main-chart"></water-volume-chart>
            </div>
          </dv-border-box-12>
        </div>
        <div class="Bottom-data-center">
          <dv-border-box-8 :color="['#7894DA']" class="db-box btn-dv">
            <div class="btn-dv-title">
              <span>历史警告</span>
              <i class="el-icon-s-tools"></i>
            </div>
            <div style="overflow: auto; height: 240px">
              <el-table
                :data="tableData"
                style="width: 100%"
                :show-header="false"
              >
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
              </el-table>
            </div>
          </dv-border-box-8>
        </div>
        <div class="Bottom-data-right dec-right">
          <dv-border-box-12 :color="['#7894DA']" class="db-box"
            ><span class="text-box">xx园区能耗趋势(今日用水)</span>
            <div class="dec-right-box">
              <span class="">总用水量：</span>
              <div class="dec-right-box-tubiao">
                <span style="padding-right: 15px">0m³</span>
              </div>
            </div>
            <div class="dec-fg"></div>
            <div>
              <water-volume-chart chart-id="main-chart"></water-volume-chart>
            </div>
          </dv-border-box-12>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WaterVolumeChart from "@/components/echarts/WaterVolumeChart.vue";
export default {
  components: {
    WaterVolumeChart,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    printPage() {
      // 调用 window.print() 方法来触发打印操作
      window.print();
    },
  },
};
</script>
<style scoped lang="scss" media>
.dashboard-editor-container {
  padding: 0px 15px;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  position: relative;
  height: calc(100vh - 64px);
  opacity: 1;
  border-style: solid;
  border-radius: 0px;
  background-size: 100% 100%;
  border-width: 0px;
  background-image: url("../../../assets/images/shujubj02.png");

  .title-box {
    width: 100%;
    height: 40px;
    left: 521px;
    top: 25px;
    transform: rotate(0deg);
    z-index: 19;
    pointer-events: auto;
    .title {
      font-size: 32px;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      border-width: 0px;
      border-style: solid;
      opacity: 1;
      border-radius: 0px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      white-space: pre-wrap;
    }
  }

  .img {
    width: 20px;
    height: 20px;
  }

  .text-box {
    font-size: 12px;
  }

  .db-box {
    padding: 20px;
  }

  .dashboard-editor-content {
    height: 100%;
    width: 100%;

    .dec-container {
      display: flex;
      justify-content: space-between;
      margin-top: 70px;
      padding: 0 40px;
      .dec-left {
        width: 25%;
        height: 100%;
      }
    }

    .circle-box {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .circle-img {
        .text-pd {
          padding-left: 15px;
        }
      }

      .circle-img-top,
      .circle-img-bt {
        display: flex;
        justify-content: space-between;
      }

      .circle-img-top {
        margin-bottom: 10px;
      }

      .circle-img-box {
        margin-right: 30px;
      }
    }

    .circle {
      width: 60px;
      height: 60px;
      background: radial-gradient(
        circle at center,
        transparent 63%,
        #5470c6 30%
      );
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
      font-size: 30px;
    }

    .kwh-box {
      margin-top: 20px;

      .kwh-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .dec-center {
      width: 41.1%;
      height: 361.5px;
      pointer-events: auto;

      .dec-center-bg {
        opacity: 1;
        border-style: solid;
        border-width: 0px;
        background-size: 100% 100%;
        background-image: url("../../../assets/images/01.png");
        width: 100%;
        height: 100%;
        position: relative;

        .dec-tb {
          position: absolute;
          display: flex;
          align-items: center;
          bottom: 30px;
          left: 100px;

          .dec-tb-left {
            margin-right: 55px;
            .dec-image {
              width: 80px;
              height: 80px;
            }
          }
          .dec-tb-right {
            .dec-tb-right-title {
              font-size: 50px;
              font-weight: 700;
              color: #b2ddff;
            }
            .dec-tb-right-text {
              font-size: 23px;
              .sp-one {
                font-family: 微软雅黑;
                color: rgb(53, 115, 193);
                margin-right: 11.915px;
              }
              .sp-two {
                font-size: 27px;
                color: #b2ddff;
              }
            }
          }
        }
      }
    }

    .dec-right {
      width: 25%;
      .dec-right-box {
        display: flex;
        align-items: center;
        padding: 20px 0;
        .dec-right-box-tubiao {
          padding-left: 50px;
          display: flex;
          align-items: center;
          .dec-shidu {
            width: 20px;
          }
        }
      }
      .dec-fg {
        width: 100%;
        height: 1px;
        margin-bottom: 20px;
        background-color: #274f81;
      }
    }
    .Bottom-data {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 40px;
      height: 45%;
      .Bottom-data-left {
        width: 25%;
        height: 380px;
      }
      .Bottom-data-center {
        width: 41.5%;
        .btn-dv {
          height: 350px;
        }
        .btn-dv-title {
          width: 100%;
          height: 50px;
          margin-bottom: 20px;
          border-bottom: 1px solid #274f81;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .Bottom-data-right {
        width: 25%;
        height: 380px;
      }
    }
  }
}
</style>
