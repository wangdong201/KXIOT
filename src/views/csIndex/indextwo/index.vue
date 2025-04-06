<template>
  <div class="app-container">
    <div class="index-two">
      <!-- state -->
      <div class="index-two-state">
        <div class="state-item">
          <div class="index-two-title">
            <IconSvg
              icon="icon-zhongdianbiaozhu"
              color="#6A80F0"
              fontSize="1vw"
            />
            <span>管网情况</span>
          </div>
          <div class="zc-state">
            <i class="el-icon-edit"></i>
            <span>资产状况</span>
          </div>
          <div class="zc-state-list">
            <div class="state-list1" v-for="item in 8" :key="item.id">
              <div class="state-list1-content">
                <IconSvg icon="icon-guanwang" color="#345DF1" fontSize="2vw" />
                <span>管网</span>
              </div>
              <div class="state-list1-content2">
                <div class="slc-text">
                  <span class="text1">新增</span>
                  <span class="text2">123.26</span>
                  <span>个</span>
                </div>
                <div class="slc-text">
                  <span class="text1">总计</span>
                  <span class="text2">476.25</span>
                  <span>个</span>
                </div>
              </div>
              <div class="state-list1-content3">
                <el-progress :percentage="percentage"></el-progress>
              </div>
            </div>
          </div>
        </div>
        <div class="state-item2">
          <div class="index-two-title">
            <IconSvg
              icon="icon-zhongdianbiaozhu"
              color="#6A80F0"
              fontSize="1vw"
            />
            <span>二次供水情况</span>
          </div>
          <div class="gs-state">
            <div class="gs-data">
              <div class="zc-state">
                <i class="el-icon-edit"></i>
                <span>供水情况</span>
              </div>
              <div class="gs-data-item">
                <div class="gs-list">
                  <IconSvg
                    icon="icon-shuiliang"
                    color="#5693F3"
                    fontSize="3vw"
                  />
                  <div class="gs-mr">
                    <div class="gs-text">总用水量</div>
                    <div>7,597,312m³</div>
                  </div>
                </div>
                <div class="gs-list">
                  <IconSvg icon="icon-dianchi" color="#5693F3" fontSize="3vw" />
                  <div class="gs-mr">
                    <div class="gs-text">总用水量</div>
                    <div>7,597,312m³</div>
                  </div>
                </div>
              </div>
              <div class="zc-state">
                <i class="el-icon-edit"></i>
                <span>水质情况</span>
              </div>
              <div class="gs-data-item">
                <div class="gs-list">
                  <el-progress
                    type="circle"
                    :percentage="25"
                    :width="80"
                  ></el-progress>
                  <div class="gs-mr">
                    <div class="gs-text"><span>正常</span><span>467</span></div>
                    <div><span>异常</span><span>112</span></div>
                  </div>
                </div>
                <div class="gs-list">
                  <el-progress
                    type="circle"
                    :percentage="25"
                    :width="80"
                  ></el-progress>
                  <div class="gs-mr">
                    <div class="gs-text"><span>正常</span><span>467</span></div>
                    <div><span>异常</span><span>112</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="gs-state-echart">
              <div class="zc-state">
                <i class="el-icon-edit"></i>
                <span>水质情况</span>
              </div>
              <EChartsLine
                :xAxisData="xAxisData"
                :seriesData="seriesData"
                :seriesNames="seriesNames"
                :smooth="false"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- situation -->
      <div class="index-two-situation">
        <div class="situation-item">
          <div class="index-two-title">
            <IconSvg
              icon="icon-zhongdianbiaozhu"
              color="#6A80F0"
              fontSize="1vw"
            />
            <span>监测</span>
          </div>
          <div class="zc-state">
            <i class="el-icon-edit"></i>
            <span>压力合格率和压力富余度对比变化曲线图</span>
          </div>
          <div class="jc-echart">
            <EChartsLine
              :xAxisData="xAxisData"
              :seriesData="seriesData2"
              :seriesNames="seriesNames"
              :smooth="true"
            />
          </div>
          <div class="jc-its">
            <div>巡检完成情况</div>
            <div class="jc-its-item" v-for="item in 3" :key="item.id">
              <div class="jc-its-list">
                <div>
                  <div class="jc-list-tit">26.7</div>
                  <div>已巡(km)</div>
                </div>
                <div>
                  <div class="jc-list-tit">26.7</div>
                  <div>未巡(km)</div>
                </div>
                <div>
                  <div class="jc-list-tit">26.7</div>
                  <div>总长(km)</div>
                </div>
              </div>
              <div class="jc-jdt">
                <el-progress
                  type="circle"
                  :percentage="25"
                  :width="58"
                ></el-progress>
              </div>
            </div>
          </div>
        </div>
        <div class="situation-item2">
          <div class="index-two-title">
            <IconSvg
              icon="icon-zhongdianbiaozhu"
              color="#6A80F0"
              fontSize="1vw"
            />
            <span>泵房状态</span>
          </div>
          <div class="bf-state">
            <div class="bf-state-item">
              <div class="zx-bf">
                <div class="zx-bf-item">
                  <IconSvg icon="icon-tixing" color="#80C7A9" fontSize="2vw" />
                  <span class="bf-span">在线泵房</span>
                </div>
                <span>579</span>
              </div>
              <div class="zx-bf">
                <div class="zx-bf-item">
                  <IconSvg icon="icon-tixing" color="#DC6355" fontSize="2vw" />
                  <span class="bf-span">异常</span>
                </div>
                <span>579</span>
              </div>
              <div class="zx-bf">
                <div class="zx-bf-item">
                  <IconSvg icon="icon-tixing" color="#FFFF68" fontSize="2vw" />
                  <span class="bf-span">预警</span>
                </div>
                <span>579</span>
              </div>
              <div class="zx-bf">
                <div class="zx-bf-item">
                  <IconSvg icon="icon-tixing" color="#345DF1" fontSize="2vw" />
                  <span class="bf-span">离场</span>
                </div>
                <span>579</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EChartsLine from "./components/EChartsLine.vue";
export default {
  name: "indexTwo",
  components: {
    EChartsLine,
  },
  data() {
    return {
      total: 192, // 总计数
      added: 10, // 新增数
      xAxisData: ["一月", "二月", "三月", "四月", "五月"],
      seriesData: [
        [820, 932, 901, 934, 1290],
        [620, 732, 801, 734, 1090],
      ],
      seriesData2: [
        ["10%", "20%", "30%", "40%", "50%"],
        ["20%", "10%", "34%", "19%", "80%"],
        ["30%", "20%", "14%", "29%", "70%"],
      ],
      seriesNames: ["水", "电"],
    };
  },
  computed: {},
  computed: {
    percentage() {
      return this.total > 0 ? +((this.added / this.total) * 100).toFixed(2) : 0;
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.state-item {
  background-color: #f0f2f5;

  .state-list1 {
    background-color: rgba($color: #ccc, $alpha: 0.3);
  }
}

.state-item2 {
  background-color: #f0f2f5;
}

.situation-item {
  background-color: #f0f2f5;
}

.situation-item2 {
  background-color: #f0f2f5;
}

.dark .state-item {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
  color: #ccc;

  .state-list1 {
    background-color: rgba($color: #304156, $alpha: 0.3);
  }
}

.dark .state-item2 {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
  color: #ccc;
}

.dark .situation-item {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
  color: #ccc;
}

.dark .situation-item2 {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
  color: #ccc;
}

.app-container {
  .index-two-title {
    height: 10%;
    display: flex;
    align-items: center;
    color: #ccc;
    border-bottom: 1px solid #ccc;

    span {
      margin-left: 5px;
    }
  }

  .zc-state {
    color: #ccc;
    margin-top: 10px;
    font-size: 0.6vw;
  }

  .index-two {
    width: 100%;
    height: 88vh;
    font-size: 0.8vw;
    display: flex;
    justify-content: space-between;
    scrollbar-width: none; /* 针对 Firefox */

    .index-two-state {
      width: calc(70% - 20px);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .state-item {
        width: 100%;
        height: calc(60% - 20px);
        transition: background-color 0.3s ease;
        padding: 10px 10px;

        .zc-state-list {
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          width: 100%;
          height: calc(80% - 20px);
          margin-top: 20px;

          .state-list1 {
            width: calc(25% - 15px);
            height: calc(50% - 7.5px);

            transition: background-color 0.3s ease;
            border-radius: 10px;
            margin-right: 15px;
            padding: 10px 20px;

            .state-list1-content {
              display: flex;
              align-items: center;

              span {
                margin-left: 2vw;
              }
            }

            .state-list1-content2 {
              .slc-text {
                margin-top: 0.5vw;

                // .text1 {
                //   color: #797979;
                // }

                .text2 {
                  padding-left: 2.5vw;
                }
              }
            }

            .state-list1-content3 {
              margin-top: 1vw;
            }
          }
        }
      }

      .state-item2 {
        width: 100%;
        height: 40%;

        transition: background-color 0.3s ease;
        padding: 10px 10px;

        .gs-state {
          height: 89%;
          display: flex;
          justify-content: space-between;

          .gs-data,
          .gs-state-echart {
            width: calc(50% - 10px);
            height: 100%;

            .gs-data-item {
              width: 100%;
              height: 37%;
              margin-top: 0.5vw;
              display: flex;

              .gs-list {
                display: flex;
                align-items: center;
                width: 50%;
                height: 100%;
                .gs-text {
                  margin-bottom: 10px;
                }

                .gs-mr {
                  margin-left: 1vw;
                }
              }
            }
          }
        }
      }
    }

    .index-two-situation {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .situation-item {
        width: 100%;
        height: calc(60% - 20px);
        padding: 10px 10px;

        .jc-echart {
          width: 100%;
          height: 35%;
        }

        .jc-its {
          width: 100%;
          height: 49%;

          .jc-its-item {
            height: 31%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            border-bottom: 1px solid #ccc;

            .jc-its-list {
              display: flex;
              justify-content: space-between;
              width: 65%;

              .jc-list-tit {
                padding-bottom: 5px;
              }
            }

            .jc-jdt {
              width: 20%;
            }
          }
        }
      }

      .situation-item2 {
        width: 100%;
        height: 40%;
        padding: 10px 10px;

        .bf-state {
          width: 100%;
          height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;

          .bf-state-item {
            width: 80%;
            height: 85%;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            padding: 10px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .zx-bf {
              width: 100%;
              height: 20%;
              display: flex;
              align-items: center;
              justify-content: space-around;

              .zx-bf-item {
                display: flex;
                align-items: center;
                width: 50%;

                .bf-span {
                  margin-left: 1vw;
                  width: 55%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
