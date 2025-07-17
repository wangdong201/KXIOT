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
          v-model="currentTabDate"
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
            :title="currentData.title || '暂无' + '数据'"
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
            :title="voltageData.title || '暂无' + '数据'"
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
            :title="powerData.title || '暂无' + '数据'"
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
            :title="powerfactorData.title || '暂无' + '数据'"
            :showTimeBackground="false"
            :chartType="'smooth'"
            :height="'100%'"
          />
        </div>
      </div>
    </div>

    <!-- 电表控制弹窗 -->
    <el-dialog
      title="电表控制"
      :visible.sync="dialogVisible"
      width="620px"
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
              @click="
                btn.text === '读电表表号'
                  ? readDbdslist()
                  : btn.text === '读多功能参数'
                  ? readDglxxlist()
                  : btn.text === '手动关电'
                  ? closePowerChange()
                  : btn.text === '手动开电'
                  ? openPowerChange()
                  : btn.text === '解除手动'
                  ? unmanualOffChange()
                  : btn.text === '立即抄表'
                  ? nowMeterChange()
                  : btn.text === '手动录入底数'
                  ? (dialogFormVisible = true)
                  : null
              "
            >
              <i :class="btn.icon"></i> {{ btn.text }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 读取属性弹窗 -->
    <el-dialog
      :title="czstatus"
      :visible.sync="dialogVisible2"
      width="320px"
      :before-close="handleClose2"
      class="simple-reading-dialog"
    >
      <div class="simple-dialog-content" v-loading="loading">
        <div v-if="!loading" class="content-wrapper">
          <!-- 成功读取时显示数值 -->
          <div
            v-if="dialogContent && !dialogContent.includes('失败')"
            class="reading-display"
          >
            <div class="data-card">
              <div class="data-value">{{ dialogContent }}</div>
            </div>
          </div>

          <!-- 失败时显示错误信息 -->
          <div v-else class="error-display">
            <div class="error-container">
              <i class="el-icon-warning"></i>
              <p class="error-text">{{ dialogContent }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 手动录入数据弹窗 -->
    <el-dialog
      title="手动录入底数"
      width="340px"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="formRules" ref="manualInputForm">
        <el-form-item label="输入口令" label-width="85px" prop="mm">
          <el-input size="mini" v-model="form.mm"></el-input>
        </el-form-item>
        <el-form-item label="电表底数" label-width="85px" prop="date">
          <el-input size="mini" v-model="form.date"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitManualInputChange"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getlooking,
  getnewmess,
  getvoltage,
  getcurrent,
  getpower,
  getpowerfactor,
  dbdslist,
  dglxxlist,
  getOpenPower,
  getClosePower,
  getUnmanualOff,
  getNowMeter,
  postManualInput,
} from "@/api/system/ammeter";
import ChartComponent from "@/components/echarts/ChartComponent.vue";

export default {
  name: "DataScreen",
  components: { ChartComponent },
  data() {
    return {
      lookingData: {},
      voltageData: {},
      currentData: {},
      powerData: {},
      powerfactorData: {},
      meterId: "",
      activeName: "option1",
      dialogVisible: false,
      dialogVisible2: false,
      dialogFormVisible: false,
      czstatus: "操作提示",
      dialogContent: "",
      loading: false,
      indicatorStyle: { left: "0px", width: "0px" },

      // 基础配置
      projectPath: "",

      form: {
        id: "",
        date: "",
        mm: "",
      },

      formRules: {
        mm: [{ required: true, message: "口令不能为空", trigger: "blur" }],
        date: [
          { required: true, message: "电表底数不能为空", trigger: "blur" },
        ],
      },
      tabDates: {
        option1: new Date(),
        option2: new Date(),
        option3: new Date(),
        option4: new Date(),
        option5: new Date(),
      },
      requestDateForTab: {
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
      },
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
              text: "立即抄表",
              icon: "el-icon-refresh",
              props: { size: "small" },
            },
            {
              text: "手动开电",
              icon: "el-icon-refresh",
              props: { size: "small" },
            },
            {
              text: "手动关电",
              icon: "el-icon-refresh",
              props: { size: "small" },
            },
            {
              text: "解除手动",
              icon: "el-icon-refresh",
              props: { size: "small" },
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
              text: "手动录入底数",
              icon: "el-icon-edit",
              props: { size: "small" },
            },
          ],
        },
      ],

      // 固定的图表数据
      chartDataMap: {
        option1: {
          xAxisData: Array.from({ length: 24 * 3 }, (_, i) =>
            (i % 24).toString()
          ),
          series: [
            {
              name: "小时用电",
              color: "#37a2da",
              data: [],
            },
          ],
        },
        option2: {
          xAxisData: [],
          series: [],
        },
        option3: {
          xAxisData: [],
          series: [],
        },
        option4: {
          xAxisData: [],
          series: [],
        },
        option5: {
          xAxisData: [],
          series: [],
        },
      },
    };
  },

  computed: {
    // 当前激活tab的日期
    currentTabDate: {
      get() {
        return this.tabDates[this.activeName] || "";
      },
      set(value) {
        this.$set(this.tabDates, this.activeName, value);
      },
    },
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
      this.getvoltageData();
      this.getcurrentData();
      this.getpowerData();
      this.getpowerfactorData();
    }
  },
  beforeDestroy() {
    this.stopNewmessPolling();
  },

  methods: {
    getChartColors() {
      return ["#6d2061", "#d8586a", "#f7c356", "#1A3269", "#257182"];
    },
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
    handleClose2(done) {
      this.dialogVisible2 = false;
      done();
    },

    formatDate(date) {
      if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      return date;
    },

    buildRequestParams() {
      const params = { id: this.meterId };
      const currentDate = this.requestDateForTab[this.activeName];
      if (currentDate) {
        params.date = this.formatDate(currentDate);
      }
      return params;
    },

    handleDateChange() {
      this.requestDateForTab[this.activeName] = this.tabDates[this.activeName];
      if (this.meterId && this.currentTabDate) {
        switch (this.activeName) {
          case "option1":
            this.fetchMeterData();
            break;
          case "option2":
            this.getcurrentData();
            break;
          case "option3":
            this.getvoltageData();
            break;
          case "option4":
            this.getpowerData();
            break;
          case "option5":
            this.getpowerfactorData();
            break;
          default:
            this.fetchMeterData();
        }
      }
    },

    async fetchMeterData() {
      try {
        const params = this.buildRequestParams();
        const response = await getlooking(params);
        this.lookingData = response;
        this.valueTime = response.datatime;
        this.chartDataMap.option1.series[0].data = response.d72;
      } catch (error) {
        console.error("获取电表数据失败:", error);
        this.$message.error("获取电表数据失败");
      }
    },

    startNewmessPolling() {
      this.tableDataNewmess();
      this.newmessTimer = setInterval(() => {
        this.tableDataNewmess();
      }, 30000);
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

    async getvoltageData() {
      try {
        const params = this.buildRequestParams();
        const response3 = await getvoltage(params);
        this.voltageData = response3;
        const colors = this.getChartColors();
        this.chartDataMap.option3 = {
          xAxisData: response3.xAxisData || [],
          series: (response3.series || []).map((item, index) => ({
            ...item,
            color: colors[index],
          })),
        };
      } catch (error) {
        console.error("获取电压数据失败:", error);
        this.$message.error("获取电压数据失败");
      }
    },

    async getcurrentData() {
      try {
        const params = this.buildRequestParams();
        const response = await getcurrent(params);
        this.currentData = response;
        const colors = this.getChartColors();
        this.chartDataMap.option2 = {
          xAxisData: response.xAxisData || [],
          series: (response.series || []).map((item, index) => ({
            ...item,
            color: colors[index],
          })),
        };
      } catch (error) {
        console.error("获取电流数据失败:", error);
        this.$message.error("获取电流数据失败");
      }
    },

    async getpowerData() {
      try {
        const params = this.buildRequestParams();
        const response = await getpower(params);
        this.powerData = response;
        const colors = this.getChartColors();
        this.chartDataMap.option4 = {
          xAxisData: response.xAxisData || [],
          series: (response.series || []).map((item, index) => ({
            ...item,
            color: colors[index],
          })),
        };
      } catch (error) {
        console.error("获取功率数据失败:", error);
        this.$message.error("获取功率数据失败");
      }
    },

    async getpowerfactorData() {
      try {
        const params = this.buildRequestParams();
        const response = await getpowerfactor(params);
        const colors = this.getChartColors();
        this.powerfactorData = response;
        this.chartDataMap.option5 = {
          xAxisData: response.xAxisData || [],
          series: (response.series || []).map((item, index) => ({
            ...item,
            color: colors[index],
          })),
        };
      } catch (error) {
        console.error("获取功率因数数据失败:", error);
        this.$message.error("获取功率因数数据失败");
      }
    },

    // 读取属性
    async readDbdslist() {
      this.showLoading();
      try {
        this.dialogVisible = true;
        const response = await dbdslist(this.meterId);
        this.dialogContent = response.data.show.replace(/&nbsp;/g, " ");
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        this.hideLoading();
      }
    },
    async readDglxxlist() {
      this.showLoading();
      try {
        this.dialogVisible = true;
        const response = await dglxxlist(this.meterId);
        this.dialogContent = response.data.show.replace(/&nbsp;/g, " ");
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        this.hideLoading();
      }
    },

    // 关电
    async closePowerChange() {
      try {
        const params = { id: this.meterId };
        const response = await getClosePower(params);
        const message = response.data.show;
        this.$message({
          message: message,
          type: response.data.status,
          showClose: true,
        });
      } catch (err) {
        this.$message.error("关电失败，请稍后再试");
      }
    },
    // 开电
    async openPowerChange() {
      try {
        const params = { id: this.meterId };
        const response = await getOpenPower(params);
        const message = response.data.show;
        this.$message({
          message: message,
          type: response.data.status,
          showClose: true,
        });
      } catch (err) {
        this.$message.error("开电失败，请稍后再试");
      }
    },

    // 解除手动
    async unmanualOffChange() {
      try {
        const params = { id: this.meterId };
        const response = await getUnmanualOff(params);
        const message = response.data.show;
        this.$message({
          message: message,
          type: response.data.status,
          showClose: true,
        });
      } catch (err) {
        this.$message.error("解除手动失败，请稍后再试");
      }
    },

    // 立即抄表
    async nowMeterChange() {
      try {
        const params = { id: this.meterId };
        const response = await getNowMeter(params);
        const message = response.data.show;
        this.$message({
          message: message,
          type: response.data.status,
          showClose: true,
        });
      } catch (err) {
        this.$message.error("抄表失败，请稍后再试");
      }
    },

    // 手动录入底数
    async submitManualInputChange() {
      this.$refs.manualInputForm.validate(async (valid) => {
        if (valid) {
          const params = {
            id: this.meterId,
            date: this.form.date,
            mm: this.form.mm,
          };
          try {
            const response = await postManualInput(params);
            this.form.date = "";
            this.form.mm = "";
            this.dialogFormVisible = false;
            const message = response.data.show;
            this.$message({
              message: message,
              type: response.data.status,
              showClose: true,
            });
          } catch (error) {
            this.$message.error("提交失败");
          }
        } else {
          return false;
        }
      });
    },
    showLoading() {
      this.dialogVisible2 = true;
      this.loading = true;
      this.dialogContent = "";
    },
    hideLoading() {
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
// @import "../../../assets/fonts/led.css";
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
  border-bottom: 2px solid rgba(248, 249, 250, 0.9);
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

.simple-dialog-content {
  padding: 6px 5px 26px 5px;

  .content-wrapper {
    text-align: center;
  }

  .reading-display {
    .data-card {
      border-radius: 10px;
      padding: 15px 5px;
      margin-bottom: 15px;
      // background-image: url("../../../assets/images/dudian.png");
      // background-size: 100% 100%;
      // background-position: center;
      // background-repeat: no-repeat;
      position: relative;

      .data-value {
        // font-family: electronicFont, "Courier New", monospace;
        font-size: 20px;
        font-weight: normal;
        color: #0f3819;
        letter-spacing: 3px;
        line-height: 1.2;
        padding: 10px 15px;
        border-radius: 6px;
        display: inline-block;
      }

      .data-label {
        font-size: 12px;
        color: #718096;
        font-weight: 400;
      }
    }

    .success-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f0fff4;
      color: #38a169;
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid #c6f6d5;

      i {
        font-size: 14px;
      }

      span {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  .error-display {
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;

      i {
        font-size: 32px;
        // color: #e53e3e;
      }

      .error-text {
        font-size: 16px;
        // color: #e53e3e;
        margin: 0;
        font-weight: 500;
      }
    }
  }
}
</style>
