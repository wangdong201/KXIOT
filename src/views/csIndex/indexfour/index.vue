<template>
  <div class="app-container">
    <!-- 说明 -->
    <PageHelp
      :help-items="helpConfig"
      dialog-title="页面功能说明"
      @help-opened="onHelpOpened"
      @help-closed="onHelpClosed"
    />
    <div class="index-one">
      <!-- left content -->
      <div class="one-left">
        <div class="Water-intake">
          <div class="Water-intake-title">
            <IconSvg icon="icon-chart" color="#6A80F0" fontSize="1vw" />
            <el-tooltip
              class="item"
              effect="dark"
              content="点击选择项目"
              placement="top-start"
            >
              <span style="cursor: pointer" @click="dialogVisible = true">{{
                title
              }}</span>
            </el-tooltip>
          </div>
          <div class="Water-intake-content">
            <div
              class="Water-intake-content-item"
              v-for="(item, index) in dataListOption"
              :key="index"
              :style="getBackgroundStyle(index)"
              @click="
                index === 0
                  ? detailPaylist()
                  : index === 1
                  ? detailRoomlist(deptId)
                  : index === 2
                  ? detailIndex()
                  : null
              "
            >
              <div class="water-data"></div>
              <div class="water-svg">
                <IconSvg :icon="item.icon" color="#ffffff" fontSize="2vw" />
              </div>
              <div class="Water-data-text">
                <div class="water-num">{{ item.value }}</div>
                <div class="water-num-text">{{ item.label }}</div>
              </div>
            </div>
          </div>
          <div class="Water-intake-echart overhdn">
            <DynamicChart
              :chartData="dayData"
              :categories="categories"
              :chartType="chartType"
            />
          </div>
        </div>
        <div class="Warning-message overhdn">
          <div class="Water-intake-title">
            <IconSvg icon="icon-fuzhi" color="#6A80F0" fontSize="1vw" />
            <span>用电量</span>
          </div>
          <DynamicChart
            :chartData="hourData"
            :categories="categories2"
            :chartType="chartType2"
          />
        </div>
      </div>
      <!-- right content -->
      <div class="one-right">
        <div class="water-resource">
          <div class="water-resource-item">
            <div class="water-resource-svg" @click="detailDBMeslist(deptId)">
              <IconSvg icon="icon-idb" color="#6B81F0" fontSize="2vw" />
            </div>
            <div class="water-resource-text">
              <div class="cp-div">电表数:{{ BuildInfoData.m5 }}</div>
              <div class="cp-div">离线电表:{{ BuildInfoData.m6 }}</div>
            </div>
          </div>
          <div class="water-line"></div>
          <div class="water-resource-item">
            <div class="water-resource-svg2" @click="detailDBMeslist(deptId)">
              <IconSvg icon="icon-ind" color="#8BC4F7" fontSize="2vw" />
            </div>
            <div class="water-resource-text">
              <div class="cp-div">欠费断电:{{ BuildInfoData.m7 }}</div>
              <div class="cp-div">其他断电:{{ BuildInfoData.m8 }}</div>
            </div>
          </div>
        </div>
        <div class="water-resource2">
          <div class="Water-intake-title">
            <IconSvg icon="icon-fuzhi" color="#6A80F0" fontSize="1vw" />
            <span>能耗分项及月用电量</span>
          </div>
          <div class="water-resource-echart">
            <DynamicPieChart :chartData="dshuxingData" />
          </div>
          <div class="water-resource-echart">
            <DynamicChart
              :chartData="monthData"
              :categories="categories3"
              :chartType="chartType"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      title="项目选择"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="tree-container">
        <!-- default-expand-all -->
        <el-tree
          :data="deptOptions"
          :props="defaultProps"
          :expand-on-click-node="false"
          ref="tree"
          node-key="id"
          :default-expanded-keys="[100]"
          highlight-current
          @node-click="handleNodeSelect"
          :render-content="renderContent"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="confirmSelection">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import { getBuildInfo } from "@/api/system/room";
import DynamicChart from "./components/DynamicChart.vue";
import DynamicPieChart from "./components/DynamicPieChart.vue";
import PageHelp from "./components/describe.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "IndexFour",
  components: {
    DynamicChart,
    DynamicPieChart,
    Treeselect,
    PageHelp,
  },
  data() {
    return {
      dialogVisible: false,
      deptOptions: undefined,
      deptId: null,
      title: "请选择项目",
      selectedNode: null,
      expandedKeys: [],
      BuildInfoData: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      dataListOption: [
        { label: "今日存款", value: "", icon: "icon-iqb" },
        { label: "用户数", value: "", icon: "icon-iyh" },
        { label: "账户充值", value: "", icon: "icon-iye" },
        { label: "实时功率（千瓦）", value: "", icon: "icon-igl" },
      ],
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      categories2: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
      categories3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      chartType: "line",
      chartType2: "bar",
      dayData: [
        {
          name: "今日用电量",
          data: [],
          colors: ["rgba(84, 160, 255, 0.5)", "rgba(84, 160, 255, 0)"], // 渐变蓝色
        },
        {
          name: "昨日用电量",
          data: [],
          colors: ["rgba(255, 195, 113, 0.5)", "rgba(255, 195, 113, 0)"],
        },
      ],
      hourData: [
        {
          name: "当前小时用电量",
          data: [],
          colors: ["rgba(142,158,242, 0.9)", "rgba(255, 87, 34, 0)"],
        },
        {
          name: "上小时用电量",
          data: [],
          colors: ["rgba(255, 195, 113, 0.5)", "rgba(255, 195, 113, 0)"],
        },
      ],
      dshuxingData: [],
      monthData: [
        {
          name: "本月用电量",
          data: [],
          colors: ["rgba(84, 160, 255, 0.5)", "rgba(84, 160, 255, 0)"],
        },
        {
          name: "上月用电量",
          data: [],
          colors: ["rgba(142,158,242, 0.9)", "rgba(255, 87, 34, 0)"],
        },
      ],
      helpConfig: [
        {
          icon: "el-icon-data-analysis",
          title: "取水监控区域",
          descriptions: [
            "实时显示许可取水量、计划取水量等关键指标",
            "通过图表对比分析计划与实际取水情况",
            "支持项目切换，点击项目名称选择不同监控对象",
          ],
        },
        {
          icon: "el-icon-warning",
          title: "预警消息区域",
          descriptions: [
            "展示系统报警次数的月度统计",
            "通过柱状图直观显示报警趋势",
            "帮助及时发现和处理异常情况",
          ],
        },
        {
          icon: "el-icon-monitor",
          title: "设备监控区域",
          descriptions: [
            "显示超声波流量计等设备的数量统计",
            "实时监控设备运行状态",
            "便于设备管理和维护",
          ],
        },
        {
          icon: "el-icon-pie-chart",
          title: "水资源用途区域",
          descriptions: [
            "饼图展示生产用水、生活用水、绿化用水的分布比例",
            "折线图显示各类用水的月度变化趋势",
            "支持用水结构分析和优化决策",
          ],
        },
      ],
    };
  },
  created() {
    this.initPageData();
  },
  methods: {
    /** 初始化页面数据 */
    initPageData() {
      this.getDeptTree();
    },

    /** 查询部门下拉树结构 */
    getDeptTree() {
      deptTreeSelect().then((response) => {
        this.deptOptions = response.data;

        // 尝试从localStorage获取之前选择的部门
        const savedDeptInfo = this.getSavedDeptInfo();

        if (
          savedDeptInfo &&
          this.findNodeInTree(response.data, savedDeptInfo.id)
        ) {
          // 如果找到了之前保存的部门，使用保存的数据
          this.title = savedDeptInfo.label;
          this.selectedNode = savedDeptInfo;
          this.deptId = savedDeptInfo.id;
        } else if (response.data && response.data.length > 0) {
          // 否则使用默认的第一个部门
          this.title = response.data[0].label;
          this.selectedNode = response.data[0];
          this.deptId = response.data[0].id;
          // 保存默认选择
          this.saveDeptInfo(response.data[0]);
        }

        // 获取部门数据
        this.getBuildInfoData();
      });
    },

    /** 从localStorage获取保存的部门信息 */
    getSavedDeptInfo() {
      try {
        const saved = localStorage.getItem("indexFour_selectedDept");
        return saved ? JSON.parse(saved) : null;
      } catch (error) {
        console.error("获取保存的部门信息失败:", error);
        return null;
      }
    },

    /** 保存localStorage */
    saveDeptInfo(deptInfo) {
      try {
        const saveData = {
          id: deptInfo.id,
          label: deptInfo.label,
        };
        localStorage.setItem(
          "indexFour_selectedDept",
          JSON.stringify(saveData)
        );
      } catch (error) {
        console.error("保存部门信息失败:", error);
      }
    },

    /** 查找指定ID的节点 */
    findNodeInTree(tree, targetId) {
      for (let node of tree) {
        if (node.id === targetId) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const found = this.findNodeInTree(node.children, targetId);
          if (found) return found;
        }
      }
      return null;
    },

    /** 处理事件 */
    handleNodeSelect(node) {
      this.selectedNode = node;
      console.log("选中的节点:", node);
      if (this.selectedNode) {
        this.title = this.selectedNode.label;
        this.deptId = this.selectedNode.id;
        this.dialogVisible = false;
        this.saveDeptInfo(this.selectedNode);
        this.getBuildInfoData();
      } else {
        this.$message.warning("请先选择一个项目");
      }
    },

    /** 数据接口 */
    getBuildInfoData() {
      const params = { id: this.deptId };
      getBuildInfo(params)
        .then((response) => {
          this.BuildInfoData = response;
          this.dataListOption[0].value = this.BuildInfoData.m1;
          this.dataListOption[1].value = this.BuildInfoData.m2;
          this.dataListOption[2].value = this.BuildInfoData.m3;
          this.dataListOption[3].value = this.BuildInfoData.m4;
          this.dayData[0].data = response.day1;
          this.dayData[1].data = response.day2;
          this.hourData[0].data = response.hour1;
          this.hourData[1].data = response.hour2;
          this.dshuxingData = response.dshuxing;
          this.monthData[0].data = response.month1;
          this.monthData[1].data = response.month2;
        })
        .catch((error) => {
          console.error("获取项目信息失败", error);
        });
    },

    renderContent(h, { node, data }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span> {node.label}</span>
        </span>
      );
    },

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
    handleClose(done) {
      this.dialogVisible = false;
      done();
    },

    /** 跳转DBMes */
    detailDBMeslist(id) {
      this.$router.push({
        path: "/newly/newly/newone",
        query: { id: id },
      });
    },

    /** 跳转房间页面 */
    detailRoomlist(id) {
      this.$router.push({
        path: "/tool/room",
        query: { id: id },
      });
    },

    /** 跳转缴费报表 */
    detailPaylist() {
      this.$router.push({
        path: "/tool/paymentreport",
      });
    },

    /** 跳转首页 */
    detailIndex() {
      this.$router.push({
        path: "/index",
      });
    },

    // 帮助组件事件处理
    onHelpOpened() {
      console.log("帮助说明已打开");
    },

    onHelpClosed() {
      console.log("帮助说明已关闭");
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
    height: calc(100vh - 124px);
    // overflow-y: auto;
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
          cursor: pointer;

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
                width: 100px;
                padding-left: 30px;
                font-size: 1.5vw;
                font-weight: 500;
                white-space: nowrap;
                text-align: left;
              }

              .water-num-text {
                width: 120px;
                padding-left: 35px;
                font-size: 0.71vw;
                color: #ffffffa6;
                white-space: nowrap;
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
            cursor: pointer;
          }

          .water-resource-svg2 {
            width: 4vw;
            height: 4vw;
            border-radius: 10px;
            background-color: #dcedfc;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .water-resource-text {
            height: 4vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 1vw;

            .cp-div {
              cursor: pointer;
            }

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
  .tree-container {
    max-height: 700px;
    overflow-y: auto;
  }
}
</style>
