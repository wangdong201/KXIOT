<template>
  <div class="data-screen-container">
    <!-- 顶部标题区域 -->
    <div class="header">
      <div class="header-left">
        <div class="nav-item">首页</div>
        <div class="nav-item">电力监控</div>
        <div class="nav-item">水务管理</div>
      </div>
      <div class="header-title">电水智能监控大屏</div>
      <div class="header-right">
        <div class="time-display">{{ currentTime }}</div>
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div class="main-content">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <!-- 电费统计卡片 -->
        <div class="panel-card">
          <div class="card-header">
            <i class="card-icon electricity-icon"></i>
            <span>电费统计</span>
          </div>
          <div class="card-content">
            <div class="data-overview">
              <div class="data-item">
                <div class="data-value">{{ electricityData.monthlyFee }}</div>
                <div class="data-label">本月电费(元)</div>
              </div>
              <div class="data-item">
                <div class="data-value">{{ electricityData.yearlyFee }}</div>
                <div class="data-label">年度电费(元)</div>
              </div>
            </div>
            <div class="chart-container">
              <div ref="electricityTrendChart" class="chart"></div>
            </div>
          </div>
        </div>

        <!-- 电力消耗分析卡片 -->
        <div class="panel-card">
          <div class="card-header">
            <i class="card-icon consumption-icon"></i>
            <span>电力消耗分析</span>
          </div>
          <div class="card-content">
            <div ref="electricityPieChart" class="chart pie-chart"></div>
          </div>
        </div>
      </div>

      <!-- 中间面板 -->
      <div class="center-panel">
        <!-- 核心指标展示 -->
        <div class="core-metrics">
          <div class="metric-card">
            <div class="metric-icon electricity-metric-icon"></div>
            <div class="metric-data">
              <div class="metric-value">{{ coreMetrics.totalElectricity }}</div>
              <div class="metric-label">总用电量(kWh)</div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon water-metric-icon"></div>
            <div class="metric-data">
              <div class="metric-value">{{ coreMetrics.totalWater }}</div>
              <div class="metric-label">总用水量(m³)</div>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon carbon-metric-icon"></div>
            <div class="metric-data">
              <div class="metric-value">{{ coreMetrics.carbonEmission }}</div>
              <div class="metric-label">碳排放量(吨)</div>
            </div>
          </div>
        </div>

        <!-- 实时监控图表 -->
        <div class="realtime-monitor">
          <div class="panel-card full-width">
            <div class="card-header">
              <i class="card-icon monitor-icon"></i>
              <span>实时能耗监控</span>
            </div>
            <div class="card-content">
              <div ref="realtimeChart" class="chart full-chart"></div>
            </div>
          </div>
        </div>

        <!-- 能效评估 -->
        <div class="efficiency-assessment">
          <div class="panel-card full-width">
            <div class="card-header">
              <i class="card-icon assessment-icon"></i>
              <span>能效评估</span>
            </div>
            <div class="card-content">
              <div class="gauge-container">
                <div ref="electricityGauge" class="gauge-chart"></div>
                <div ref="waterGauge" class="gauge-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panel">
        <!-- 水费统计卡片 -->
        <div class="panel-card">
          <div class="card-header">
            <i class="card-icon water-icon"></i>
            <span>水费统计</span>
          </div>
          <div class="card-content">
            <div class="data-overview">
              <div class="data-item">
                <div class="data-value">{{ waterData.monthlyFee }}</div>
                <div class="data-label">本月水费(元)</div>
              </div>
              <div class="data-item">
                <div class="data-value">{{ waterData.yearlyFee }}</div>
                <div class="data-label">年度水费(元)</div>
              </div>
            </div>
            <div class="chart-container">
              <div ref="waterTrendChart" class="chart"></div>
            </div>
          </div>
        </div>

        <!-- 水资源消耗分析卡片 -->
        <div class="panel-card">
          <div class="card-header">
            <i class="card-icon water-consumption-icon"></i>
            <span>水资源消耗分析</span>
          </div>
          <div class="card-content">
            <div ref="waterPieChart" class="chart pie-chart"></div>
          </div>
        </div>

        <!-- 节能建议卡片 -->
        <div class="panel-card">
          <div class="card-header">
            <i class="card-icon suggestion-icon"></i>
            <span>节能建议</span>
          </div>
          <div class="card-content">
            <div class="suggestion-list">
              <div
                class="suggestion-item"
                v-for="(item, index) in energySavingSuggestions"
                :key="index"
              >
                <div class="suggestion-icon"></div>
                <div class="suggestion-text">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "DataScreen",
  data() {
    return {
      currentTime: "",
      // 电费数据
      electricityData: {
        monthlyFee: "3,856.42",
        yearlyFee: "42,187.65",
        trend: [
          { month: "1月", value: 3245 },
          { month: "2月", value: 3123 },
          { month: "3月", value: 3789 },
          { month: "4月", value: 4120 },
          { month: "5月", value: 3920 },
          { month: "6月", value: 4350 },
        ],
        distribution: [
          { name: "照明用电", value: 25 },
          { name: "空调用电", value: 40 },
          { name: "电梯用电", value: 15 },
          { name: "办公设备", value: 12 },
          { name: "其他用电", value: 8 },
        ],
      },
      // 水费数据
      waterData: {
        monthlyFee: "1,245.78",
        yearlyFee: "15,632.90",
        trend: [
          { month: "1月", value: 1120 },
          { month: "2月", value: 1050 },
          { month: "3月", value: 1230 },
          { month: "4月", value: 1340 },
          { month: "5月", value: 1280 },
          { month: "6月", value: 1420 },
        ],
        distribution: [
          { name: "生活用水", value: 35 },
          { name: "卫生间", value: 30 },
          { name: "绿化用水", value: 20 },
          { name: "餐厅用水", value: 10 },
          { name: "其他用水", value: 5 },
        ],
      },
      // 核心指标数据
      coreMetrics: {
        totalElectricity: "128,456.32",
        totalWater: "45,782.65",
        carbonEmission: "87.25",
      },
      // 实时能耗数据
      realtimeData: {
        electricity: [
          { time: "00:00", value: 42 },
          { time: "02:00", value: 35 },
          { time: "04:00", value: 30 },
          { time: "06:00", value: 38 },
          { time: "08:00", value: 65 },
          { time: "10:00", value: 78 },
          { time: "12:00", value: 82 },
          { time: "14:00", value: 85 },
          { time: "16:00", value: 80 },
          { time: "18:00", value: 70 },
          { time: "20:00", value: 60 },
          { time: "22:00", value: 50 },
        ],
        water: [
          { time: "00:00", value: 15 },
          { time: "02:00", value: 12 },
          { time: "04:00", value: 10 },
          { time: "06:00", value: 18 },
          { time: "08:00", value: 30 },
          { time: "10:00", value: 35 },
          { time: "12:00", value: 40 },
          { time: "14:00", value: 38 },
          { time: "16:00", value: 35 },
          { time: "18:00", value: 30 },
          { time: "20:00", value: 25 },
          { time: "22:00", value: 20 },
        ],
      },
      // 能效评估数据
      efficiencyData: {
        electricity: 75, // 百分比
        water: 82, // 百分比
      },
      // 节能建议
      energySavingSuggestions: [
        "建议在非工作时间关闭不必要的照明设备",
        "空调温度设置不低于26℃可节约15%能耗",
        "定期检查水管是否漏水，可减少水资源浪费",
        "使用节能灯具可降低30%照明用电",
        "安装感应式水龙头可节约25%用水量",
      ],
      // 图表实例
      charts: {},
    };
  },
  mounted() {
    this.updateTime();
    // 设置定时器，每秒更新一次时间
    this.timer = setInterval(this.updateTime, 1000);

    // 初始化所有图表
    this.$nextTick(() => {
      this.initElectricityTrendChart();
      this.initWaterTrendChart();
      this.initElectricityPieChart();
      this.initWaterPieChart();
      this.initRealtimeChart();
      this.initGaugeCharts();

      // 添加窗口大小变化监听，以便调整图表大小
      window.addEventListener("resize", this.handleResize);

      // 模拟数据更新
      this.startDataSimulation();
    });
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.timer);

    // 移除窗口大小变化监听
    window.removeEventListener("resize", this.handleResize);

    // 销毁所有图表实例
    Object.values(this.charts).forEach((chart) => {
      chart && chart.dispose();
    });
  },
  methods: {
    // 更新当前时间
    updateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    // 初始化电费趋势图表
    initElectricityTrendChart() {
      const chartDom = this.$refs.electricityTrendChart;
      this.charts.electricityTrend = echarts.init(chartDom);

      const option = {
        grid: {
          top: "15%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: this.electricityData.trend.map((item) => item.month),
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        series: [
          {
            name: "电费",
            type: "bar",
            barWidth: "40%",
            data: this.electricityData.trend.map((item) => item.value),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00FFFF" },
                { offset: 1, color: "#0080FF" },
              ]),
            },
          },
        ],
      };

      this.charts.electricityTrend.setOption(option);
    },

    // 初始化水费趋势图表
    initWaterTrendChart() {
      const chartDom = this.$refs.waterTrendChart;
      this.charts.waterTrend = echarts.init(chartDom);

      const option = {
        grid: {
          top: "15%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: this.waterData.trend.map((item) => item.month),
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        series: [
          {
            name: "水费",
            type: "bar",
            barWidth: "40%",
            data: this.waterData.trend.map((item) => item.value),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#36D1DC" },
                { offset: 1, color: "#5B86E5" },
              ]),
            },
          },
        ],
      };

      this.charts.waterTrend.setOption(option);
    },

    // 初始化电力消耗分析饼图
    initElectricityPieChart() {
      const chartDom = this.$refs.electricityPieChart;
      this.charts.electricityPie = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        series: [
          {
            name: "电力消耗",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "14",
                fontWeight: "bold",
                color: "#ffffff",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.electricityData.distribution.map((item) => ({
              value: item.value,
              name: item.name,
            })),
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        ],
      };

      this.charts.electricityPie.setOption(option);
    },

    // 初始化水资源消耗分析饼图
    initWaterPieChart() {
      const chartDom = this.$refs.waterPieChart;
      this.charts.waterPie = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        series: [
          {
            name: "水资源消耗",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "14",
                fontWeight: "bold",
                color: "#ffffff",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.waterData.distribution.map((item) => ({
              value: item.value,
              name: item.name,
            })),
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        ],
      };

      this.charts.waterPie.setOption(option);
    },

    // 初始化实时能耗监控图表
    initRealtimeChart() {
      const chartDom = this.$refs.realtimeChart;
      this.charts.realtime = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["电力消耗", "水资源消耗"],
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.realtimeData.electricity.map((item) => item.time),
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "电力 (kW)",
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
          {
            type: "value",
            name: "水量 (m³/h)",
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "电力消耗",
            type: "line",
            yAxisIndex: 0,
            data: this.realtimeData.electricity.map((item) => item.value),
            smooth: true,
            lineStyle: {
              width: 3,
              color: "#00FFFF",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 255, 255, 0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 255, 255, 0.1)",
                },
              ]),
            },
            symbol: "circle",
            symbolSize: 8,
          },
          {
            name: "水资源消耗",
            type: "line",
            yAxisIndex: 1,
            data: this.realtimeData.water.map((item) => item.value),
            smooth: true,
            lineStyle: {
              width: 3,
              color: "#5B86E5",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(91, 134, 229, 0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(91, 134, 229, 0.1)",
                },
              ]),
            },
            symbol: "circle",
            symbolSize: 8,
          },
        ],
      };

      this.charts.realtime.setOption(option);
    },

    // 初始化仪表盘图表
    initGaugeCharts() {
      // 电力能效仪表盘
      const electricityGaugeDom = this.$refs.electricityGauge;
      this.charts.electricityGauge = echarts.init(electricityGaugeDom);

      const electricityGaugeOption = {
        title: {
          text: "电力能效",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          left: "center",
          top: "15px",
        },
        series: [
          {
            type: "gauge",
            radius: "90%",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#FF4500"],
                  [0.7, "#FFCC00"],
                  [1, "#00FF00"],
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 6,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: "auto",
                width: 1,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              color: "#fff",
              fontSize: 10,
              distance: -60,
              formatter: function (value) {
                if (value === 0 || value === 100) {
                  return value + "%";
                } else {
                  return "";
                }
              },
            },
            title: {
              offsetCenter: [0, "-20%"],
              fontSize: 14,
              color: "#fff",
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return value + "%";
              },
              color: "#fff",
            },
            data: [
              {
                value: this.efficiencyData.electricity,
                name: "效率",
              },
            ],
          },
        ],
      };

      this.charts.electricityGauge.setOption(electricityGaugeOption);

      // 水资源能效仪表盘
      const waterGaugeDom = this.$refs.waterGauge;
      this.charts.waterGauge = echarts.init(waterGaugeDom);

      const waterGaugeOption = {
        title: {
          text: "水资源能效",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          left: "center",
          top: "15px",
        },
        series: [
          {
            type: "gauge",
            radius: "90%",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#FF4500"],
                  [0.7, "#FFCC00"],
                  [1, "#00FF00"],
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 6,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: "auto",
                width: 1,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              color: "#fff",
              fontSize: 10,
              distance: -60,
              formatter: function (value) {
                if (value === 0 || value === 100) {
                  return value + "%";
                } else {
                  return "";
                }
              },
            },
            title: {
              offsetCenter: [0, "-20%"],
              fontSize: 14,
              color: "#fff",
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return value + "%";
              },
              color: "#fff",
            },
            data: [
              {
                value: this.efficiencyData.water,
                name: "效率",
              },
            ],
          },
        ],
      };

      this.charts.waterGauge.setOption(waterGaugeOption);
    },

    // 处理窗口大小变化
    handleResize() {
      Object.values(this.charts).forEach((chart) => {
        chart && chart.resize();
      });
    },

    // 开始数据模拟更新
    startDataSimulation() {
      // 每5秒更新一次实时数据
      setInterval(() => {
        // 更新电力实时数据
        const newElectricityData = this.realtimeData.electricity.map((item) => {
          return {
            time: item.time,
            value: Math.floor(item.value * (0.9 + Math.random() * 0.2)),
          };
        });

        // 更新水资源实时数据
        const newWaterData = this.realtimeData.water.map((item) => {
          return {
            time: item.time,
            value: Math.floor(item.value * (0.9 + Math.random() * 0.2)),
          };
        });

        // 更新图表数据
        this.charts.realtime.setOption({
          series: [
            {
              data: newElectricityData.map((item) => item.value),
            },
            {
              data: newWaterData.map((item) => item.value),
            },
          ],
        });

        // 更新仪表盘数据
        const newElectricityEfficiency = Math.floor(65 + Math.random() * 20);
        const newWaterEfficiency = Math.floor(70 + Math.random() * 20);

        this.charts.electricityGauge.setOption({
          series: [
            {
              data: [
                {
                  value: newElectricityEfficiency,
                },
              ],
            },
          ],
        });

        this.charts.waterGauge.setOption({
          series: [
            {
              data: [
                {
                  value: newWaterEfficiency,
                },
              ],
            },
          ],
        });
      }, 5000);
    },
  },
};
</script>

<style scoped lang="scss">
.data-screen-container {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", Arial, sans-serif;

  // 顶部标题区域样式
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(
      90deg,
      rgba(0, 40, 70, 0.8),
      rgba(0, 60, 90, 0.8)
    );
    background-size: 100% 100%;
    padding: 0 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 180, 240, 0.3);
    box-shadow: 0 0 15px rgba(0, 180, 240, 0.2);

    .header-left,
    .header-right {
      display: flex;
      align-items: center;

      .nav-item {
        padding: 0 15px;
        height: 36px;
        line-height: 36px;
        background: rgba(0, 150, 199, 0.2);
        border: 1px solid rgba(0, 180, 240, 0.5);
        border-radius: 4px;
        margin-right: 10px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: rgba(0, 180, 240, 0.4);
        }
      }

      .time-display {
        font-size: 16px;
        background: rgba(0, 0, 0, 0.3);
        padding: 8px 15px;
        border-radius: 4px;
        border: 1px solid rgba(0, 180, 240, 0.3);
      }
    }

    .header-title {
      font-size: 28px;
      font-weight: bold;
      background-image: linear-gradient(to bottom, #ffffff, #7aceff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 10px rgba(0, 180, 240, 0.5);
    }
  }

  // 主体内容区域样式
  .main-content {
    display: flex;
    height: calc(100% - 80px);
    gap: 20px;

    // 左侧面板样式
    .left-panel {
      width: 25%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    // 中间面板样式
    .center-panel {
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      // 核心指标展示
      .core-metrics {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        height: 120px;

        .metric-card {
          flex: 1;
          background: rgba(0, 40, 70, 0.5);
          border: 1px solid rgba(0, 180, 240, 0.3);
          border-radius: 8px;
          padding: 15px;
          display: flex;
          align-items: center;
          box-shadow: 0 0 20px rgba(0, 180, 240, 0.1);

          .metric-icon {
            width: 50px;
            height: 50px;
            margin-right: 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            &.electricity-metric-icon {
              background: linear-gradient(135deg, #00c6ff, #0072ff);
              &:before {
                content: "⚡";
                font-size: 24px;
                color: white;
              }
            }

            &.water-metric-icon {
              background: linear-gradient(135deg, #36d1dc, #5b86e5);
              &:before {
                content: "💧";
                font-size: 24px;
                color: white;
              }
            }

            &.carbon-metric-icon {
              background: linear-gradient(135deg, #56ab2f, #a8e063);
              &:before {
                content: "🌿";
                font-size: 24px;
                color: white;
              }
            }
          }

          .metric-data {
            flex: 1;

            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #00ffff;
              margin-bottom: 5px;
            }

            .metric-label {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.7);
            }
          }
        }
      }

      // 实时监控图表
      .realtime-monitor {
        flex: 1;
      }

      // 能效评估
      .efficiency-assessment {
        height: 220px;

        .gauge-container {
          display: flex;
          justify-content: space-around;
          height: 100%;

          .gauge-chart {
            width: 45%;
            height: 100%;
          }
        }
      }
    }

    // 右侧面板样式
    .right-panel {
      width: 25%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    // 卡片通用样式
    .panel-card {
      background: rgba(0, 40, 70, 0.5);
      border: 1px solid rgba(0, 180, 240, 0.3);
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 0 20px rgba(0, 180, 240, 0.1);
      height: calc(33.33% - 14px);
      display: flex;
      flex-direction: column;

      &.full-width {
        width: 100%;
      }

      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .card-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          background-size: contain;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;

          &.electricity-icon {
            background-color: #0080ff;
            &:before {
              content: "⚡";
              font-size: 12px;
              color: white;
            }
          }

          &.water-icon {
            background-color: #36d1dc;
            &:before {
              content: "💧";
              font-size: 12px;
              color: white;
            }
          }

          &.consumption-icon {
            background-color: #ff9500;
            &:before {
              content: "📊";
              font-size: 12px;
              color: white;
            }
          }

          &.water-consumption-icon {
            background-color: #5b86e5;
            &:before {
              content: "📉";
              font-size: 12px;
              color: white;
            }
          }

          &.monitor-icon {
            background-color: #00c49f;
            &:before {
              content: "📈";
              font-size: 12px;
              color: white;
            }
          }

          &.assessment-icon {
            background-color: #ffbb28;
            &:before {
              content: "🔍";
              font-size: 12px;
              color: white;
            }
          }

          &.suggestion-icon {
            background-color: #ff5722;
            &:before {
              content: "💡";
              font-size: 12px;
              color: white;
            }
          }
        }

        span {
          font-size: 16px;
          font-weight: bold;
          color: #00ffff;
        }
      }

      .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;

        .data-overview {
          display: flex;
          justify-content: space-around;
          margin-bottom: 15px;

          .data-item {
            text-align: center;

            .data-value {
              font-size: 20px;
              font-weight: bold;
              color: #00ffff;
              margin-bottom: 5px;
            }

            .data-label {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.7);
            }
          }
        }

        .chart-container {
          flex: 1;

          .chart {
            width: 100%;
            height: 100%;
          }

          .pie-chart {
            height: 100%;
          }
        }

        .suggestion-list {
          height: 100%;
          overflow-y: auto;

          .suggestion-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            padding: 8px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;

            .suggestion-icon {
              width: 16px;
              height: 16px;
              background-color: #ff5722;
              border-radius: 50%;
              margin-right: 10px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;

              &:before {
                content: "💡";
                font-size: 10px;
                color: white;
              }
            }

            .suggestion-text {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.9);
              line-height: 1.4;
            }
          }
        }
      }
    }
  }
}

// 响应式适配
@media screen and (max-width: 1600px) {
  .data-screen-container {
    .header {
      .header-title {
        font-size: 24px;
      }
    }

    .main-content {
      .center-panel {
        .core-metrics {
          .metric-card {
            .metric-data {
              .metric-value {
                font-size: 20px;
              }

              .metric-label {
                font-size: 12px;
              }
            }
          }
        }
      }

      .panel-card {
        .card-content {
          .data-overview {
            .data-item {
              .data-value {
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
