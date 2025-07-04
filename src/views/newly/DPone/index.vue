<template>
  <div class="app-container1">
    <!-- 自定义Tab头部 -->
    <div class="custom-tabs-header" ref="tabsHeader">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-item', { active: activeName === tab.name }]"
        @click="handleTabClick(tab)"
      >
        {{ tab.label }}
      </div>
      <div class="tab-indicator" :style="indicatorStyle"></div>
    </div>

    <!-- 项目信息区域 -->
    <div class="project-info">
      <div>{{ lookingData.name }}</div>
      <div>
        <span class="demonstration">选择查询日期</span>
        <el-date-picker
          v-model="valueTime"
          type="date"
          placeholder="选择日期"
          @change="handleDateChange"
          class="select-datetime"
        />
        <el-button
          round
          size="mini"
          @click="dialogVisible = true"
          v-show="activeName === 'option1'"
          >电表控制</el-button
        >
      </div>
    </div>

    <!-- 实时监测图表 -->
    <div class="real-time-monitor" v-show="activeName === 'option1'">
      <div class="real-left">
        <div class="meter-info-compact">
          <div class="status-row">
            <span class="meter-label">电表号：{{ lookingData.dbh }}</span>
            <span
              class="meter-status"
              :class="{
                online: lookingData.bzt === '在线',
                offline:
                  lookingData.bzt === '离线' || lookingData.bzt === '未知',
              }"
              >{{ lookingData.bzt }}</span
            >
          </div>
          <div class="data-grid">
            <div class="data-item">
              <div class="data-label">今日用电</div>
              <div class="data-value">{{ lookingData.datadate }}</div>
            </div>
            <div class="data-item">
              <div class="data-label">本月用电</div>
              <div class="data-value">{{ lookingData.datamonth }}</div>
            </div>
            <div class="data-item">
              <div class="data-label">电表字</div>
              <div class="data-value">{{ lookingData.dbds }}</div>
            </div>
          </div>
          <div class="attr-grid">
            <div class="attr-item">
              <span class="attr-text">{{ lookingData.ss1 }}</span>
            </div>
            <div class="attr-item">
              <span class="attr-text">{{ lookingData.ss2 }}</span>
            </div>
            <div class="attr-item">
              <span class="attr-text">{{ lookingData.ss3 }}</span>
            </div>
            <div class="attr-item">
              <span class="attr-text">{{ lookingData.ss4 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="real-right">
        <div class="table-container">
          <el-table
            :data="phaseTableData"
            size="mini"
            border
            style="width: 100%; height: 100%"
            :span-method="objectSpanMethod"
            class="phase-data-table"
          >
            <el-table-column
              v-for="col in tableColumns"
              :key="col.prop"
              v-bind="col"
            />
          </el-table>
        </div>
      </div>
    </div>

    <!-- Tab内容区域 -->
    <div class="custom-tabs-content">
      <!-- 实时监测 -->
      <div v-show="activeName === 'option1'" class="tab-pane">
        <div class="chart-wrapper">
          <chart-component
            ref="chart1"
            :chart-data="chartDataMap['option1']"
            :title="lookingData.title72 || '暂无' + '数据'"
            :chartType="'bar'"
            :showTimeBackground="true"
            :height="'100%'"
          />
        </div>
      </div>

      <!-- 电流 -->
      <div v-show="activeName === 'option2'" class="tab-pane">
        <div class="chart-wrapper">
          <chart-component
            ref="chart2"
            :chart-data="chartDataMap['option2']"
            :title="lookingData.title72 || '暂无' + '数据'"
            :chartType="'smooth'"
            :height="'100%'"
          />
        </div>
      </div>

      <!-- 电压 -->
      <div v-show="activeName === 'option3'" class="tab-pane">
        <div class="chart-wrapper">
          <chart-component
            ref="chart3"
            :chart-data="chartDataMap['option3']"
            :title="lookingData.title72 || '暂无' + '数据'"
            :showTimeBackground="false"
            :chartType="'smooth'"
            :height="'100%'"
          />
        </div>
      </div>

      <!-- 功率 -->
      <div v-show="activeName === 'option4'" class="tab-pane">
        <div class="chart-wrapper">
          <chart-component
            ref="chart4"
            :chart-data="chartDataMap['option4']"
            :title="lookingData.title72 || '暂无' + '数据'"
            :showTimeBackground="false"
            :chartType="'smooth'"
            :height="'100%'"
          />
        </div>
      </div>

      <!-- 功率因数 -->
      <div v-show="activeName === 'option5'" class="tab-pane">
        <div class="chart-wrapper">
          <chart-component
            ref="chart5"
            :chart-data="chartDataMap['option5']"
            :title="lookingData.title72 || '暂无' + '数据'"
            :showTimeBackground="false"
            :chartType="'smooth'"
            :height="'100%'"
          />
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      title="电表控制"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>{{ projectPath }}</div>
      <div class="meter-control-content">
        <div
          v-for="section in controlSections"
          :key="section.title"
          class="control-section"
        >
          <div class="section-title">{{ section.title }}</div>
          <div class="button-group">
            <el-button
              v-for="btn in section.buttons"
              :key="btn.text"
              v-bind="btn.props"
            >
              <i :class="btn.icon"></i> {{ btn.text }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getlooking, getnewmess } from "@/api/system/ammeter";
import ChartComponent from "@/components/echarts/ChartComponent.vue";

export default {
  name: "DataScreen",
  components: { ChartComponent },
  data() {
    return {
      lookingData: {},
      meterId: "",
      valueTime: "",
      activeName: "option1",
      dialogVisible: false,
      indicatorStyle: { left: "0px", width: "0px" },

      // 基础配置
      projectPath: "",
      tabs: [
        { name: "option1", label: "实时监测" },
        { name: "option2", label: "电流" },
        { name: "option3", label: "电压" },
        { name: "option4", label: "功率" },
        { name: "option5", label: "功率因数" },
      ],

      // 表格列配置
      tableColumns: [
        { prop: "type", label: "", width: "70", align: "center" },
        { prop: "phaseA", label: "A相", align: "center" },
        { prop: "phaseB", label: "B相", align: "center" },
        { prop: "phaseC", label: "C相", align: "center" },
        { prop: "total", label: "总", align: "center" },
        { prop: "unit", label: "单位", width: "60", align: "center" },
      ],

      // 三相数据表格
      phaseTableData: [],

      // 控制面板配置
      controlSections: [
        {
          title: "电表操作命令",
          buttons: [
            {
              text: "立即读表",
              icon: "el-icon-refresh",
              props: { type: "success", size: "small" },
            },
          ],
        },
        {
          title: "读取属性",
          buttons: [
            {
              text: "读电表表号",
              icon: "el-icon-document",
              props: { size: "small" },
            },
            {
              text: "读多功能参数",
              icon: "el-icon-setting",
              props: { size: "small" },
            },
          ],
        },
        {
          title: "发送属性",
          buttons: [
            {
              text: "手动录入数据",
              icon: "el-icon-edit",
              props: { size: "small" },
            },
          ],
        },
      ],

      // 固定的图表数据
      chartDataMap: {
        option1: {
          xAxisData: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8,
            9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
          ],
          series: [
            {
              name: "小时用电",
              color: "#37a2da",
              data: [],
            },
          ],
        },
        option2: {
          xAxisData: Array.from({ length: 24 * 3 }, (_, i) =>
            (i % 24).toString()
          ),
          series: [
            {
              name: "A相电流",
              color: "#37a2da",
              data: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23,
              ],
            },
          ],
        },
        option3: {
          xAxisData: Array.from({ length: 24 * 3 }, (_, i) =>
            (i % 24).toString()
          ),
          series: [
            {
              name: "A相电压",
              color: "#37a2da",
              data: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23,
              ],
            },
          ],
        },
        option4: {
          xAxisData: Array.from({ length: 24 * 3 }, (_, i) =>
            (i % 24).toString()
          ),
          series: [
            {
              name: "有功功率",
              color: "#37a2da",
              data: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23,
              ],
            },
          ],
        },
        option5: {
          xAxisData: Array.from({ length: 24 * 3 }, (_, i) =>
            (i % 24).toString()
          ),
          series: [
            {
              name: "A相功率因数",
              color: "#37a2da",
              data: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23,
              ],
            },
          ],
        },
      },
    };
  },

  watch: {
    activeName: {
      handler() {
        this.$nextTick(this.updateIndicator);
      },
      immediate: true,
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.resizeCurrentChart();
      this.updateIndicator();
    });

    // 获取路由参数id
    this.meterId = this.$route.query.id;
    if (this.meterId) {
      this.fetchMeterData();
      this.startNewmessPolling();
    }
  },
  beforeDestroy() {
    this.stopNewmessPolling();
  },

  methods: {
    handleTabClick(tab) {
      if (this.activeName === tab.name) return;
      this.activeName = tab.name;
      this.$nextTick(this.resizeCurrentChart);
    },

    updateIndicator() {
      const activeIndex = this.tabs.findIndex(
        (tab) => tab.name === this.activeName
      );
      if (activeIndex >= 0 && this.$refs.tabsHeader) {
        const activeTab = this.$refs.tabsHeader.children[activeIndex];
        if (activeTab?.classList.contains("tab-item")) {
          this.indicatorStyle = {
            left: activeTab.offsetLeft + "px",
            width: activeTab.offsetWidth + "px",
          };
        }
      }
    },

    resizeCurrentChart() {
      const chartRef = this.$refs[`chart${this.activeName.slice(-1)}`];
      if (chartRef?.[0]?.chart) {
        chartRef[0].chart.resize();
      }
    },

    objectSpanMethod({ row, columnIndex }) {
      if (row.type === "通讯时间") {
        return columnIndex === 0 ? [1, 1] : columnIndex === 1 ? [1, 5] : [0, 0];
      }
      return [1, 1];
    },

    handleClose(done) {
      this.dialogVisible = false;
      done();
    },

    handleDateChange() {
      console.log("日期选择:", this.valueTime);
      if (this.meterId && this.valueTime) {
        this.fetchMeterData();
      }
    },

    async fetchMeterData() {
      try {
        const params = { id: this.meterId };
        if (this.valueTime) {
          // 将时间格式化为 YYYY-MM-DD 格式
          const formatDate = (date) => {
            if (date instanceof Date) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              return `${year}-${month}-${day}`;
            }
            return date;
          };
          params.date = formatDate(this.valueTime);
        }
        const response = await getlooking(params);
        this.lookingData = response;
        this.valueTime = response.datatime;
        this.chartDataMap.option1.series[0].data = response.d72;

        console.log(
          "更新的电表数据:",
          this.chartDataMap.option1.series[0].data
        );
      } catch (error) {
        console.error("获取电表数据失败:", error);
        this.$message.error("获取电表数据失败");
      }
    },

    startNewmessPolling() {
      this.tableDataNewmess();
      this.newmessTimer = setInterval(() => {
        this.tableDataNewmess();
      }, 300000);
    },
    // 停止轮询
    stopNewmessPolling() {
      if (this.newmessTimer) {
        clearInterval(this.newmessTimer);
        this.newmessTimer = null;
      }
    },
    async tableDataNewmess() {
      try {
        const params2 = { id: this.meterId };
        const response2 = await getnewmess(params2);
        this.phaseTableData = response2.phaseTableData;
      } catch (error) {
        console.error("获取新数据失败:", error);
        this.$message.error("获取新数据失败");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/fonts/led.css";
.dark {
  .data-item,
  .attr-item {
    background-color: #143647 !important;
  }
}

.app-container1 {
  padding: 5px 15px;
  min-height: calc(100vh - 84px);
}

::v-deep .phase-data-table .el-table__body td:not(:first-child) {
  font-size: 17px !important;
  font-weight: 500;
  font-family: electronicFont, "Courier New", monospace;
}

::v-deep .phase-data-table .el-table__body td:first-child {
  font-size: 12px;
}

.custom-tabs-header {
  height: 45px;
  position: relative;
  display: flex;
  border-bottom: 2px solid rgba(24, 144, 255, 0.9);
  margin-bottom: 10px;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tab-item {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    color: #409eff;
    background: rgba(64, 158, 255, 0.1);
  }

  &.active {
    color: #409eff;
  }

  &:first-child {
    border-radius: 4px 0 0 0;
  }
  &:last-child {
    border-radius: 0 4px 0 0;
  }
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: linear-gradient(90deg, #409eff, #66b1ff);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1.5px;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.3);
  z-index: 1;
}

.custom-tabs-content {
  position: relative;
}

.tab-pane {
  width: 100%;
  height: calc(100vh - 470px);
}

.chart-wrapper {
  height: calc(100vh - 470px);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  }
}

.project-info {
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  .demonstration {
    padding-right: 5px;
  }
  .select-datetime {
    margin-right: 5px;
  }
}

.real-time-monitor {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 250px;
  margin: 15px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 15px;

  .real-left {
    width: calc(100% - 500px);

    .meter-info-compact {
      border-radius: 6px;
      height: 100%;
      display: flex;
      flex-direction: column;

      .status-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #f0f0f0;

        .meter-label {
          font-size: 14px;
          font-weight: 500;
        }

        .meter-status {
          font-size: 14px;
          font-weight: 600;

          &.online {
            color: #52c41a;
          }

          &.offline {
            color: #ff4d4f;
          }
        }
      }

      .data-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 12px;

        .data-item {
          text-align: center;
          padding: 8px 4px;
          background: #f8f9fa;
          border-radius: 4px;

          .data-label {
            font-size: 11px;
            margin-bottom: 4px;
          }

          .data-value {
            font-size: 13px;
            font-weight: 600;
            color: #1890ff;
          }
        }
      }

      .attr-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4px;
        flex: 1;

        .attr-item {
          text-align: center;
          background-color: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;

          .attr-text {
            font-size: 14px;
          }
        }
      }
    }
  }

  .real-right {
    width: 500px;

    .table-container {
      border-radius: 6px;
      height: 100%;

    }
  }
}

.meter-control-content {
  padding: 20px 0;
}

.control-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f5f7fa;
  border-left: 4px solid #409eff;
}

.button-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  padding: 0 10px;

  .el-button {
    min-width: 120px;
  }
}

@media (max-width: 768px) {
  .custom-tabs-header {
    flex-wrap: wrap;
  }

  .tab-item {
    flex: 1;
    text-align: center;
    padding: 10px 12px;
    font-size: 13px;
  }

  .chart-wrapper {
    padding: 15px;
  }

  .real-time-monitor .real-right .table-container {
    padding: 6px;

    .el-table ::v-deep .el-table__cell {
      padding: 4px 0;
    }
  }
}
</style>
