<template>
  <div class="main-box">
    <div class="main-top">
      <div class="main-top-left box-hover">
        <div class="mtl-content">
          <span class="mtl-title">变配电站名称</span>
          <div>
            <el-input v-model="input" placeholder="请输入变配电站名称">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="mtl-content2">
          <div class="mtl-content2-item">
            <h3>配电信息</h3>
            <img src="../../../assets/images/fx.png" alt="" />
          </div>
          <div class="mtl-text">地址：嘉定区育绿路</div>
          <div class="mtl-text">变电电压等级:10/0.4kV</div>
          <div class="mtl-text">装机容量:500kVA</div>
          <div class="mtl-text">最大需量:500kW</div>
          <div class="mtl-text">变压器数量:1个</div>
        </div>
      </div>
      <div class="main-top-right">
        <div class="mtr-content box-hover">
          <h3>报警统计</h3>
          <div class="alarm-box">
            <div class="alarm-box-left">
              <div class="alarm-img" @click="dialogVisible = true">
                <img src="../../../assets/images/fx06.png" alt="" />
              </div>
              <div class="monitor-data">监测点数量</div>
              <div class="monitor-data">77 <span>(30)</span>个</div>
            </div>
            <div class="alarm-box-center">
              <div class="alarm-bc-top">
                <div class="alarm-img">
                  <img src="../../../assets/images/fx05.png" alt="" />
                </div>
                <div class="monitor-data">监测点数量</div>
                <div class="monitor-data">77 <span>(30)</span>个</div>
              </div>
              <div class="alarm-bc-bottom">
                <div class="alarm-img">
                  <img src="../../../assets/images/fx04.png" alt="" />
                </div>
                <div class="monitor-data">监测点数量</div>
                <div class="monitor-data">77 <span>(30)</span>个</div>
              </div>
            </div>
            <div class="alarm-box-right">
              <div class="alarm-bc-top">
                <div class="alarm-img">
                  <img src="../../../assets/images/fx03.png" alt="" />
                </div>
                <div class="monitor-data">监测点数量</div>
                <div class="monitor-data">77 <span>(30)</span>个</div>
              </div>
              <div class="alarm-bc-bottom">
                <div class="alarm-img">
                  <img src="../../../assets/images/fx02.png" alt="" />
                </div>
                <div class="monitor-data">监测点数量</div>
                <div class="monitor-data">77 <span>(30)</span>个</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mtr-content box-hover">
          <div class="mtr-content-input">
            <h3>实时负荷</h3>
            <el-select v-model="value" placeholder="请选择" style="width: 35%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <EChartsComponent
            :data="chartSeries"
            :unit="chartUnit"
            :yAxisMin="yAxisMin"
            :yAxisMax="yAxisMax"
            :yAxisInterval="yAxisInterval"
            :legendData="legendData"
          />
        </div>
        <div class="mtr-content box-hover">
          <h3>实时电量</h3>
          <EChartsComponent
            :data="chartSeries2"
            :unit="chartUnit"
            :yAxisMin="yAxisMin"
            :yAxisMax="yAxisMax"
            :yAxisInterval="yAxisInterval"
            :legendData="legendData1"
          />
        </div>
        <!-- 报警统计弹窗 -->
        <el-dialog
          title="仪表离线列表"
          :visible.sync="dialogVisible1"
          width="50%"
          :before-close="handleClose"
        >
          <el-table :data="tableData1" height="350" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width=""
            ></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
    <div class="main-bottom">
      <div class="main-bottom-left box-hover">
        <h3>环境监测</h3>
        <div class="mbl-content" v-for="index in 5" :key="index">
          <div class="mbl-content-left">
            <i class="el-icon-delete"></i>
          </div>
          <div class="mbl-content-right">
            <div class="mbl-text">
              <span class="span1">水浸</span>
              <span class="span2" @click="dialogVisible1 = true">更多</span>
            </div>
            <div class="mbl-text2">
              <div class="mbl-text2-flex">
                <span style="padding-left: 7px">1111</span>
                <span>正常</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-bottom-right box-hover">
        <div class="mbr-select">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="mbr-lsing">
          <img
            src="../../../assets/images/lsimg.png"
            alt=""
            @click="dialogVisible2 = true"
          />
        </div>
      </div>

      <!-- 环境监测弹窗 -->
      <el-dialog
        title="仪表离线列表"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-table :data="tableData" height="350" border style="width: 100%">
          <el-table-column prop="date" label="日期" width=""> </el-table-column>
          <el-table-column prop="name" label="姓名" width=""> </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width=""
          ></el-table-column>
        </el-table>
      </el-dialog>

      <!-- 楼层监测弹窗 -->
      <el-dialog
        title="六层"
        :visible.sync="dialogVisible2"
        width="60%"
        :before-close="handleClose"
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="实时数据" name="first">
            <div>
              <el-radio
                v-for="option in radioOptions"
                :key="option.value"
                v-model="radio1"
                :label="option.value"
                border
                size="small"
              >
                {{ option.label }}
              </el-radio>
            </div>
            <!-- 表格 -->

            <el-table
              :data="tableData2"
              style="width: 100%; margin-top: 15px; height: 600px"
              border
            >
              <el-table-column
                prop="name"
                label="参数名称"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column label="最新值(V)" align="center">
                <el-table-column
                  prop="data"
                  label="数值"
                  align="center"
                ></el-table-column>
                <el-table-column prop="time" label="更新时间" align="center">
                </el-table-column>
              </el-table-column>
              <el-table-column label="当日极值" align="center">
                <el-table-column label="最大值" align="center">
                  <el-table-column
                    prop="data2"
                    label="数值"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="time2" label="发生时间" align="center">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="最小值" align="center">
                  <el-table-column
                    prop="data3"
                    label="数值"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="time3"
                    label="发生时间"
                    align="center"
                  ></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="data4" label="平均值(V)" align="center">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="历史数据" name="second">
            <div class="tab-box">
              <div class="block">
                <span class="demonstration" style="margin-right: 15px"
                  >开始时间</span
                >
                <el-date-picker
                  v-model="timevalue1"
                  type="date"
                  placeholder="选择日期"
                  style="margin-right: 30px"
                >
                </el-date-picker>
                <span class="demonstration" style="margin-right: 15px"
                  >结束时间</span
                >
                <el-date-picker
                  v-model="timevalue2"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div class="block2">
                <span style="margin-right: 15px">电力类别</span>
                <el-select v-model="value2" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-checkbox
                  v-for="item in checkboxes"
                  :key="item.value"
                  v-model="item.checked"
                  style="margin-left: 30px"
                  >{{ item.label }}</el-checkbox
                >
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  style="margin-left: 20px"
                  >查询</el-button
                >
              </div>
              <div class="block3">
                <el-button
                  type="primary"
                  :class="{
                    epb: showChartComponent,
                    'el-button--primary': !showChartComponent,
                  }"
                  @click="showChart"
                  >图表
                </el-button>
                <el-button
                  type="primary"
                  :class="{
                    epb: !showChartComponent,
                    'el-button--primary': showChartComponent,
                  }"
                  @click="showTable"
                  >数据</el-button
                >

                <EChartsComponent2
                  v-if="showChartComponent"
                  style="margin-top: 15px; height: 300px"
                />

                <div v-else style="margin-top: 15px">
                  <el-table
                    :data="tableData1"
                    height="350"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="date" label="日期" width="">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址"
                      width=""
                    ></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import EChartsComponent from "./components/newViewEchart7.vue";
import EChartsComponent2 from "./components/newViewEchart8.vue";

export default {
  components: {
    EChartsComponent,
    EChartsComponent2,
  },
  data() {
    return {
      input: "",
      value: "1",
      value2: "1",
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      activeName: "first",
      timevalue1: "",
      timevalue2: "",
      radio1: "1",
      chartUnit: "kw",
      yAxisMin: 0,
      yAxisMax: 80,
      yAxisInterval: 20,
      showChartComponent: true,
      legendData: ["P", "Pa", "Pb", "Pc", "Pd"],
      legendData1: ["1", "2", "3", "4", "5"],
      checkboxes: [
        { label: "A相", value: "A相", checked: true },
        { label: "B相", value: "B相", checked: true },
        { label: "C相", value: "C相", checked: true },
        { label: "总有功功率", value: "总有功功率", checked: true },
      ],
      radioOptions: [
        { value: "1", label: "电压" },
        { value: "2", label: "电流" },
        { value: "3", label: "功率" },
        { value: "4", label: "电能" },
        { value: "5", label: "不平衡度" },
        { value: "6", label: "当月最大需量" },
        { value: "7", label: "线缆温度" },
      ],
      options: [
        {
          value: "1",
          label: "主进线",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],

      chartSeries: [
        {
          name: "P",
          data: [20, 32, 11, 13, 30, 20, 21],
          type: "line",
          smooth: true,
        },
        {
          name: "Pa",
          data: [22, 12, 11, 34, 29, 33, 31],
          type: "line",
          smooth: true,
        },
        {
          name: "Pb",
          data: [15, 22, 21, 54, 19, 38, 41],
          type: "line",
          smooth: true,
        },
        {
          name: "Pc",
          data: [30, 33, 31, 34, 39, 53, 80],
          type: "line",
          smooth: true,
        },
        {
          name: "Pd",
          data: [80, 32, 71, 34, 64, 42, 84],
          type: "line",
          smooth: true,
        },
      ],
      chartSeries2: [
        {
          name: "1",
          data: [20, 32, 11, 13, 30, 20, 21],
          type: "bar",
          smooth: true,
        },
        {
          name: "2",
          data: [22, 12, 11, 34, 29, 33, 31],
          type: "bar",
          smooth: true,
        },
        {
          name: "3",
          data: [15, 22, 21, 54, 19, 38, 41],
          type: "bar",
          smooth: true,
        },
        {
          name: "4",
          data: [30, 33, 31, 34, 39, 53, 80],
          type: "bar",
          smooth: true,
        },
        {
          name: "5",
          data: [80, 32, 71, 34, 64, 42, 84],
          type: "bar",
          smooth: true,
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      tableData1: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "北京市海淀区西二旗",
        },
      ],
      tableData2: [
        {
          name: "电压",
          data: "1",
          time: "2024-05-03",
          data2: "2",
          time2: "2024-05-03",
          data3: "3",
          time3: "2024-05-03",
          data4: "4",
        },
      ],
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    showChart() {
      this.showChartComponent = true;
    },
    showTable() {
      this.showChartComponent = false;
    },
  },
};
</script>

<style scoped lang="scss">
.main-box {
  height: calc(100vh - 64px);
  padding: 10px 20px;
  width: 100%;

  .box-hover:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease; /* 添加过渡效果 */
  }

  h3 {
    // color: #21ffd2;
    font-size: 14px;
  }

  .main-top {
    display: flex;
    justify-content: space-between;
    height: 35%;
  }

  .main-top-left {
    width: 17.5%;
    // height: 35%;
    padding: 15px;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  }

  .mtl-content {
    width: 100%;
    display: flex;
    align-items: center;

    .mtl-title {
      white-space: nowrap;
      font-size: 14px;
      padding: 0 12px 0 0;
    }
  }

  .mtl-content2 {
    margin-top: 10px;
    padding: 0 5px;

    .mtl-content2-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      h3 {
        // color: #21ffd2;
        font-size: 14px;
      }

      img {
        width: 15px;
      }
    }

    .mtl-text {
      font-size: 13px;
      padding: 1%;
      line-height: 22px;
    }
  }

  .main-top-right {
    width: calc(82.5% - 40px);
    display: flex;
    justify-content: space-between;

    .mtr-content {
      width: calc(33.33% - 7px);
      box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
      padding: 15px;

      .mtr-content-input {
        display: flex;
        justify-content: space-between;
      }

      h3 {
        // color: #21ffd2;
        font-size: 14px;
      }

      .alarm-box {
        height: 100%;
        height: calc(93% - 35px);
        display: flex;
        justify-content: space-between;

        .alarm-box-left {
          width: calc(33.33% - 5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;

          .alarm-img {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50%;
          }

          .monitor-data {
            font-size: 13px;
            text-align: center;
          }
        }

        .alarm-box-center,
        .alarm-box-right {
          width: calc(33.33% - 5px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .alarm-bc-top,
          .alarm-bc-bottom {
            height: calc(50% - 5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 5px;

            .alarm-img {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 50%;
            }

            .monitor-data {
              font-size: 13px;
              text-align: center;
            }
          }
        }
      }
    }
  }

  .main-bottom {
    font-size: 13px;
    height: calc(65% - 30px);
    // color: #fff;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .main-bottom-left {
      box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
      width: 17.5%;
      padding: 15px;
    }

    .mbl-content {
      padding: 3% 0;
      height: calc(20% - 5px);
      display: flex;
      justify-content: space-between;

      .mbl-content-left {
        width: 20%;
        height: 100%;
        margin-right: 5%;
        border-radius: 10px;
        background-color: rgba(60, 102, 175, 0.41);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .mbl-content-right {
      width: 70%;
      height: 100%;

      .mbl-text {
        height: 30%;
        border-bottom: 1px solid #2462d3;
        display: flex;
        justify-content: space-between;

        .span1 {
          width: 45%;
          height: 80%;
          // color: #21ffd2;
          font-weight: 700;
          padding-left: 5px;
          border-radius: 5px;
          border-bottom-right-radius: 35px;
          background-color: rgba(60, 102, 175, 0.41);
        }
      }

      .mbl-text2 {
        height: 70%;
        overflow: hidden;
        padding-top: 10px;

        .mbl-text2-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .main-bottom-right {
      width: calc(82.5% - 40px);
      padding: 15px 25px;
      overflow: hidden;
      box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);

      .mbr-select {
        display: flex;
        justify-content: flex-end;
      }

      .mbr-lsing {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;

        img {
          width: 80%;
          height: 80%;
        }
      }
    }

    .tab-box {
      height: 600px;
      padding: 20px 20px;
    }
    .block2,
    .block3 {
      margin-top: 15px;
    }

    .epb {
      background-color: #175e77;
      border: #175e77;
    }
  }
}
</style>
