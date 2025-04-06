<template>
  <div class="app-container">
    <div class="index-one">
      <!-- left content -->
      <div class="one-left">
        <div class="Water-intake">
          <div class="Water-intake-title">
            <IconSvg icon="icon-fuzhi" color="#6A80F0" fontSize="1vw" />
            <span>取水量</span>
          </div>
          <div class="Water-intake-content">
            <div
              class="Water-intake-content-item"
              v-for="(item, index) in 4"
              :key="index"
              :style="getBackgroundStyle(index)"
            >
              <div class="water-data"></div>
              <div class="water-svg">
                <IconSvg icon="icon-shuiliang" color="#ffffff" fontSize="2vw" />
              </div>
              <div class="Water-data-text">
                <div class="water-num">1215.5</div>
                <div class="water-num-text">许可取水量(万m³)</div>
              </div>
            </div>
          </div>
          <div class="Water-intake-echart overhdn">
            <DynamicChart
              :chartData="data"
              :categories="categories"
              :chartType="chartType"
            />
          </div>
        </div>
        <div class="Warning-message overhdn">
          <div class="Water-intake-title">
            <IconSvg icon="icon-fuzhi" color="#6A80F0" fontSize="1vw" />
            <span>预警消息</span>
          </div>
          <DynamicChart
            :chartData="data2"
            :categories="categories"
            :chartType="chartType2"
          />
        </div>
      </div>
      <!-- right content -->
      <div class="one-right">
        <div class="water-resource">
          <div class="water-resource-item">
            <div class="water-resource-svg">
              <IconSvg
                icon="icon-wangguangouhui"
                color="#6B81F0"
                fontSize="2vw"
              />
            </div>
            <div class="water-resource-text">
              <div>超声波流量计</div>
              <div><span>10</span>台</div>
            </div>
          </div>
          <div class="water-line"></div>
          <div class="water-resource-item">
            <div class="water-resource-svg2">
              <IconSvg
                icon="icon-shebeiguanli"
                color="#8BC4F7"
                fontSize="2vw"
              />
            </div>
            <div class="water-resource-text">
              <div>超声波流量计</div>
              <div><span>10</span>台</div>
            </div>
          </div>
        </div>
        <div class="water-resource2">
          <div class="Water-intake-title">
            <IconSvg icon="icon-fuzhi" color="#6A80F0" fontSize="1vw" />
            <span>水资源用途</span>
          </div>
          <div class="water-resource-echart">
            <DynamicPieChart :chartData="data3" />
          </div>
          <div class="water-resource-echart">
            <DynamicChart
              :chartData="data4"
              :categories="categories"
              :chartType="chartType"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicChart from "./components/DynamicChart .vue";
import DynamicPieChart from "./components/DynamicPieChart.vue";
export default {
  name: "IndexOne",
  components: {
    DynamicChart,
    DynamicPieChart,
  },
  data() {
    return {
      categories: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      chartType: "line",
      chartType2: "bar",
      data: [
        {
          name: "计算取水",
          data: [
            16.12, 4.88, 12.75, 15.98, 13.24, 16.32, 14.56, 15.67, 13.88, 15.23,
            14.45, 15.56,
          ],
          colors: ["rgba(84, 160, 255, 0.5)", "rgba(84, 160, 255, 0)"], // 渐变蓝色
        },
        {
          name: "实际取水",
          data: [
            11.88, 10.23, 9.45, 11.56, 10.02, 12.67, 11.23, 11.88, 10.56, 11.45,
            10.88, 11.67,
          ],
          colors: ["rgba(255, 87, 34, 0.5)", "rgba(255, 87, 34, 0)"], // 渐变橙色
        },
      ],
      data2: [
        {
          name: "报警次数",
          data: [12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40],
          colors: ["rgba(142,158,242, 0.9)", "rgba(255, 87, 34, 0)"],
        },
      ],
      data3: [
        { name: "生产用水", value: 8.123, color: "#5470C6" },
        { name: "生活用水", value: 3.235, color: "#91CC75" },
        { name: "绿化用水", value: 4.546, color: "#EE6666" },
      ],
      data4: [
        {
          name: "生产用水",
          data: [
            16.12, 4.88, 12.75, 15.98, 13.24, 16.32, 14.56, 15.67, 13.88, 15.23,
            14.45, 15.56,
          ],
          colors: ["rgba(84, 160, 255, 0.5)", "rgba(84, 160, 255, 0)"],
        },
        {
          name: "生活用水",
          data: [
            11.88, 10.23, 9.45, 11.56, 10.02, 12.67, 11.23, 11.88, 10.56, 11.45,
            10.88, 11.67,
          ],
          colors: ["rgba(255, 87, 34, 0.5)", "rgba(255, 87, 34, 0)"],
        },
        {
          name: "绿化用水",
          data: [
            2.3, 10.3, 3.5, 4.6, 5.7, 6.8, 7.9, 9.1, 10.2, 11.3, 12.4, 13.5,
          ],
          colors: ["rgba(174,222,158, 0.5)", "rgba(174,222,158, 0)"],
        },
      ],
    };
  },
  methods: {
    /** 背景色 */
    getBackgroundStyle(index) {
      const colors = [
        "linear-gradient(to right, rgb(129, 236, 236), rgb(84, 160, 255))",
        "linear-gradient(to right, rgb(255, 195, 113), rgb(255, 87, 34))",
        "linear-gradient(to right, rgb(252, 92, 101), rgb(253, 150, 68))",
        "linear-gradient(to right, rgb(186, 85, 211), rgb(241, 91, 181))",
      ];
      return {
        backgroundImage: colors[index % colors.length],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.Water-intake {
  background-color: #f8f9fd;
}

.Warning-message {
  background-color: #f8f9fd;
}

.water-resource {
  background-color: #f8f9fd;
}

.water-resource2 {
  background-color: #f8f9fd;
}

.dark .Water-intake {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.dark .water-resource {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.dark .Warning-message {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.dark .water-resource2 {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.app-container {
  .overhdn {
    overflow: hidden;
  }

  .Water-intake-title {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
      font-size: 1vw;
    }
  }

  .index-one {
    width: 100%;
    height: 89vh;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    font-size: 0.8vw;

    .one-left {
      width: calc(70% - 20px);
      height: 100%;

      .Water-intake {
        width: 100%;
        height: calc(65% - 20px);
        transition: background-color 0.3s ease;
        border-radius: 15px;
        padding: 10px 15px;

        .Water-intake-content {
          width: 100%;
          height: 25%;
          margin-top: 0.5vw;
          display: flex;
          justify-content: space-between;

          .Water-intake-content-item {
            width: calc(25% - 15px);
            height: 100%;
            border-radius: 15px;
            background-image: linear-gradient(
              to right,
              rgb(129, 236, 236),
              rgb(84, 160, 255)
            );
            position: relative;
            overflow: hidden;

            .water-data {
              position: absolute;
              width: 9vw;
              height: 9vw;
              border-radius: 50%;
              top: 7%;
              left: -7%;
              background-color: rgba(255, 255, 255, 0.1);
            }

            .water-svg {
              position: absolute;
              width: 3vw;
              height: 3vw;
              border-radius: 50%;
              top: 50%;
              left: 80%;
              transform: translate(-50%, -50%);
              background-color: rgba(255, 255, 255, 0.1);
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .Water-data-text {
              position: absolute;
              top: 50%;
              left: 23%;
              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              justify-content: center;
              color: #fefefe;

              .water-num {
                font-size: 1.5vw;
                font-weight: 500;
              }

              .water-num-text {
                font-size: 0.5vw;
              }
            }
          }
        }

        .Water-intake-echart {
          width: 100%;
          height: 65%;
          margin-top: 0.5vw;
        }
      }

      .Warning-message {
        width: 100%;
        height: 35%;
        transition: background-color 0.3s ease;
        margin-top: 20px;
        border-radius: 15px;
        padding: 10px 15px;
      }
    }

    .one-right {
      width: 30%;
      height: 100%;

      .water-resource {
        width: 100%;
        height: calc(20% - 10px);
        transform: background-color 0.3s ease;
        border-radius: 10px;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .water-line {
          width: 1px;
          height: 90%;
          background-color: #ccc;
          margin: 0 0.5vw;
        }

        .water-resource-item {
          width: calc(50% - 10px);
          height: 90%;
          display: flex;
          align-items: center;

          .water-resource-svg {
            width: 4vw;
            height: 4vw;
            border-radius: 10px;
            background-color: #d2d9fa;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .water-resource-svg2 {
            width: 4vw;
            height: 4vw;
            border-radius: 10px;
            background-color: #dcedfc;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .water-resource-text {
            height: 4vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 1vw;

            span {
              font-size: 1.2vw;
              font-weight: 500;
            }
          }
        }
      }

      .water-resource2 {
        width: 100%;
        height: calc(80% - 10px);
        transform: background-color 0.3s ease;
        margin-top: 20px;
        border-radius: 15px;
        padding: 10px 15px;

        .water-resource-echart {
          width: 100%;
          height: calc(50% - 20px);
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
