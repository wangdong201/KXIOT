<template>
  <div class="app-container cappuser">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <div class="filter-container">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
        </div>
        <el-tree
          class="filter-tree"
          :data="deptOptionsroom"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
          node-key="id"
          highlight-current
          @node-click="handleNodeClick"
          :render-content="renderContent"
          :expand-on-click-node="false"
          :default-expanded-keys="[100]"
        >
        </el-tree>
      </el-col>
      <el-col :span="20" :xs="24">
        <!-- 子节点显示内容 -->
        <div class="table-box" v-if="selectedNode.icon === 'el-icon-user'">
          <div>
            <div class="table-title">
              <i class="el-icon-house"></i>
              {{ roomdatalist.name }}
            </div>
            <el-divider></el-divider>
          </div>
          <div class="form-je">
            <el-form
              ref="formRef"
              :inline="true"
              :model="jeform"
              label-width="100px"
            >
              <el-form-item label="基本账户" v-if="roomdatalist.jbzh !== null">
                <div>{{ roomdatalist.jbzh }}元</div>
              </el-form-item>
              <el-form-item label="电补账户" v-if="roomdatalist.dbzh !== null">
                <div>{{ roomdatalist.dbzh }}元</div>
              </el-form-item>
              <el-form-item label="水补账户" v-if="roomdatalist.sbzh !== null">
                <div>{{ roomdatalist.sbzh }}元</div>
              </el-form-item>
              <el-form-item label="水账户" v-if="roomdatalist.szh !== null">
                <div>{{ roomdatalist.szh }}元</div>
              </el-form-item>
              <el-form-item label="缴费金额">
                <el-input
                  v-model="jeform.mon"
                  placeholder="请输入缴费金额"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input placeholder="请输入内容" v-model="jeform.info">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">缴费</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="form-card">
            <div
              class="card-con"
              v-for="item in roomdatalist.listd"
              :key="item.id"
            >
              <el-card class="box-card xs">
                <div slot="header" class="clearfix">
                  <span>{{ item.name }}</span>
                </div>
                <div style="padding-top: 5px">
                  <span class="textspan">日用电量:</span>
                  <span class="textspan" style="margin-left: 0.3vw">
                    {{ item.date }}
                  </span>
                </div>
                <div style="padding-top: 5px">
                  <span class="textspan">月用电量:</span>
                  <span class="textspan" style="margin-left: 0.3vw">
                    {{ item.yue }}
                  </span>
                </div>
                <div style="padding-top: 5px">
                  <span class="textspan">余额:</span>
                  <span class="textspan" style="margin-left: 0.3vw">
                    {{ item.mon }}
                  </span>
                </div>
                <div style="padding-top: 5px">
                  <span class="textspan">抄表时间:</span>
                  <span class="textspan" style="margin-left: 0.3vw">
                    {{ item.Cbtime }}
                  </span>
                </div>
                <div style="padding-top: 5px">
                  <span class="textspan">通讯状态:</span>
                  <span class="textspan" style="margin-left: 0.3vw">
                    {{ item.zt }}
                  </span>
                </div>
                <el-button
                  type="primary"
                  style="margin-top: 10px"
                  @click="readDbdslist(item.id)"
                  size="mini"
                  >读电量</el-button
                >
                <el-button
                  type="primary"
                  style="margin-top: 10px"
                  @click="readDglxxlist(item.id)"
                  size="mini"
                  >读多功能</el-button
                >
                <el-button
                  type="primary"
                  style="margin-top: 10px"
                  @click="modifyDbdslist(item.id)"
                  size="mini"
                  >修改</el-button
                >
              </el-card>
            </div>
          </div>
        </div>
        <!-- 父节点显示内容 -->
        <div v-else class="data-content">
          <div class="sd-data">
            <div class="sd-item bgc">
              <div class="yh-data">
                <div class="yh">
                  <i
                    class="el-icon-user"
                    style="font-size: 1.5vw; padding-right: 0.5vw"
                  ></i>
                  <span>用户数</span>
                </div>
                <div class="yh2">{{ jianzhudatalist.yhs }}</div>
              </div>
              <div class="yh-data">
                <div class="yh text-r">
                  <!-- <i
                    class="el-icon-user"
                    style="font-size: 1.5vw; padding-right: 0.5vw"
                  ></i> -->
                  <span>欠费断电</span>
                </div>
                <div class="yh2 text-r">{{ jianzhudatalist.qfd }}</div>
              </div>
            </div>
            <div class="sd-item bgc1">
              <div class="yh-data">
                <div class="yh">
                  <i
                    class="el-icon-odometer"
                    style="font-size: 1.5vw; padding-right: 0.5vw"
                  ></i>
                  <span>电表数</span>
                </div>
                <div class="yh2" @click="handleAmmeterClick">
                  {{ jianzhudatalist.dbs }}
                </div>
              </div>
              <div class="yh-data">
                <div class="yh text-r">
                  <!-- <i
                    class="el-icon-odometer"
                    style="font-size: 1.5vw; padding-right: 0.5vw"
                  ></i> -->
                  <span>离线电表</span>
                </div>
                <div class="yh2 text-r">{{ jianzhudatalist.lxs }}</div>
              </div>
            </div>
            <div class="sd-item bgc2">
              <div class="yh-data">
                <div class="yh">
                  <i
                    class="el-icon-notebook-1"
                    style="font-size: 1.5vw; padding-right: 0.5vw"
                  ></i>
                  <span>今日消费</span>
                </div>
                <div class="yh2">{{ jianzhudatalist.xf }}</div>
              </div>
              <div class="yh-data">
                <div class="yh text-r">
                  <!-- <i
                    class="el-icon-notebook-1"
                    style="font-size: 1.5vw; padding-right: 0.5vw"
                  ></i> -->
                  <span>今日存款</span>
                </div>
                <div class="yh2 text-r">{{ jianzhudatalist.cun }}</div>
              </div>
            </div>
            <div class="sd-item bgc3">
              <div style="width: 100%; height: 100%; color: #fff">
                <div class="yue">账号余额</div>
                <div class="yue2">
                  <i class="el-icon-wallet" style="font-size: 2.5vw"></i>
                  <span class="yue-num">{{ jianzhudatalist.yu }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sd-data2">
            <div class="day-data bgc4">
              <div class="dryd">
                <div class="text-s">三天无电量</div>
                <div>{{ jianzhudatalist.wu3 }}</div>
              </div>
              <div class="dryd">
                <div class="text-s">七天无电量</div>
                <div>{{ jianzhudatalist.wu7 }}</div>
              </div>
              <div class="dryd">
                <div class="text-s">30天无电量</div>
                <div>{{ jianzhudatalist.wu30 }}</div>
              </div>
            </div>
            <div class="day-data bgc5">
              <div class="dryd">
                <div class="text-s">采集器数</div>
                <div>{{ jianzhudatalist.jzq }}</div>
              </div>
              <div class="dryd">
                <div class="text-s">在线采集器数</div>
                <div>{{ jianzhudatalist.jzqzx }}</div>
              </div>
              <div class="dryd">
                <div class="text-s">离线采集器数</div>
                <div>{{ jianzhudatalist.jzqlx }}</div>
              </div>
            </div>
            <div class="day-data bgc6">
              <div class="dryd">
                <div class="text-s">用量增加电表</div>
                <div>{{ jianzhudatalist.ylzj }}</div>
              </div>
              <div class="dryd">
                <div class="text-s">用量减少电表</div>
                <div>{{ jianzhudatalist.yljs }}</div>
              </div>
              <div class="dryd">
                <div class="text-s">用量稳定电表</div>
                <div>{{ jianzhudatalist.ylcp }}</div>
              </div>
            </div>
          </div>
          <div class="sd-data3">
            <div class="echart-box">
              <WaterElectricChart
                :chartData="chartData"
                :timeLabels="timeLabels"
              />
            </div>
            <div class="echart-box">
              <WaterElectricChart
                :chartData="hourchartData"
                :timeLabels="timeLabels"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog
      :title="czstatus"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div
        v-loading="loading"
        style="min-height: 100px; text-align: center; font-size: 1vw"
      >
        <p v-if="!loading">{{ dialogContent }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deptTreeSelectroom } from "@/api/system/user";
import {
  jianzhutreelist,
  roominfotreelist,
  dbdslist,
  dglxxlist,
  postjfpay,
} from "@/api/system/ammeter";
import WaterElectricChart from "../../components/WaterElectricChart.vue";

export default {
  name: "Index",
  components: {
    WaterElectricChart,
  },
  data() {
    return {
      dialogVisible: false, // 弹出层控制
      loading: false, // 控制加载状态
      dialogContent: "", // 弹出层显示的内容
      czstatus: "", // 操作状态
      filterText: "",
      jianzhudatalist: {}, // 设置默认值为空对象
      roomdatalist: {}, // 设置默认值为空对象
      selectedNode: {}, // 保存选中的节点
      deptOptionsroom: [], // 部门树数据
      defaultRootId: null, // 默认根节点 ID
      defaultProps: {
        children: "children",
        label: "label",
      },
      timeLabels: [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
      ],
      jeform: { id: null, mon: null, type: 0, info: null },
      chartData: [], // 图表数据
      hourchartData: [], // 图表数据
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    // 当建筑数据更新时，动态更新图表
    jianzhudatalist: {
      deep: true,
      handler(newData) {
        if (newData && typeof newData === "object") {
          this.chartData = [
            {
              name: "上月每日用电",
              data: newData.dataz || [], // 如果没有数据，默认空数组
            },
            {
              name: "本月每日用电",
              data: newData.data || [],
            },
          ];
          this.hourchartData = [
            {
              name: "昨天每小时用电",
              data: newData.hourz || [],
            },
            {
              name: "今日每小时用电",
              data: newData.hour || [],
            },
          ];
        }
      },
    },
  },
  async created() {
    await this.deptTreeroom(); // 初始化加载部门树和默认数据
  },
  methods: {
    // 加载部门树数据
    async deptTreeroom() {
      try {
        const res = await deptTreeSelectroom();
        this.deptOptionsroom = res.data || [];

        // 假设根节点为部门树的第一个有效节点
        const rootNode = this.deptOptionsroom.find((node) => node.id);
        if (rootNode) {
          this.defaultRootId = rootNode.id;
          await this.loadRootNodeData();
        } else {
          console.warn("未找到有效的根节点");
        }
      } catch (error) {
        console.error("部门树数据加载失败:", error);
      }
    },
    // 加载默认根节点数据
    async loadRootNodeData() {
      if (!this.defaultRootId) return;
      try {
        const response = await jianzhutreelist(this.defaultRootId);

        // 检查返回数据
        if (response && response.data) {
          this.jianzhudatalist = response.data;

          // 设置初始图表数据
          this.chartData = [
            {
              name: "上月每日用电",
              data: this.jianzhudatalist.dataz || [],
            },
            {
              name: "本月每日用电",
              data: this.jianzhudatalist.data || [],
            },
          ];

          // 设置初始小时图表数据
          this.hourchartData = [
            {
              name: "昨天每小时用电",
              data: this.jianzhudatalist.hourz || [],
            },
            {
              name: "今日每小时用电",
              data: this.jianzhudatalist.hour || [],
            },
          ];
        } else {
          console.error("返回数据格式错误或为空");
        }
      } catch (error) {
        console.error("默认根节点数据加载失败:", error);
      }
    },
    // 节点过滤方法
    filterNode(value, data) {
      if (!value) return true;
      return data.label && data.label.indexOf(value) !== -1;
    },

    // 节点点击事件
    async handleNodeClick(data) {
      this.selectedNode = data;
      const { id, icon } = data;
      this.jeform.id = this.selectedNode.id;

      if (id) {
        try {
          let response;
          // 判断是否为房间节点
          if (icon === "el-icon-user") {
            response = await roominfotreelist(id);
          } else {
            response = await jianzhutreelist(id);
          }
          // 处理接口返回的数据
          if (response && response.data) {
            if (icon === "el-icon-user") {
              this.roomdatalist = response.data;
              console.log("房间数据:", this.roomdatalist);
            } else {
              this.jianzhudatalist = response.data;
              console.log("建筑数据:", this.jianzhudatalist);
            }
          } else {
            console.error("接口返回数据格式错误");
          }
        } catch (error) {
          console.error("请求失败:", error);
        }
      }
    },
    // 自定义节点渲染
    renderContent(h, { node, data }) {
      return h("span", [h("i", { class: data.icon }), h("span", node.label)]);
    },
    // 提交表单
    onSubmit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          try {
            await postjfpay(this.jeform);
            this.$message.success("缴费成功");
            // 清空表单数据
            this.jeform.mon = "";
            this.jeform.info = "";
            // 重新拉取房间数据
            if (
              this.selectedNode &&
              this.selectedNode.icon === "el-icon-user"
            ) {
              const response = await roominfotreelist(this.selectedNode.id);
              if (response && response.data) {
                this.roomdatalist = response.data;
                console.log("房间数据更新成功:", this.roomdatalist);
              }
            }
          } catch (error) {
            this.$message.error("缴费失败,请重新提交！");
          }
        } else {
          return false;
        }
      });
    },

    // 读电量
    async readDbdslist(id) {
      this.showLoading();
      try {
        this.dialogVisible = true;
        const response = await dbdslist(id);
        this.dialogContent = response.data.show.replace(/&nbsp;/g, " ");
        this.czstatus = response.msg;
        console.log("读电量", response);
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        this.hideLoading();
      }
    },

    // 读多功能
    async readDglxxlist(id) {
      this.showLoading();
      try {
        this.dialogVisible = true;
        const response = await dglxxlist(id);
        this.dialogContent = response.data.show.replace(/&nbsp;/g, " ");
        this.czstatus = response.msg;
        console.log("读多功能", response);
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        this.hideLoading();
      }
    },

    // 跳转修改电
    modifyDbdslist(id) {
      this.$router.push({
        path: "/tool/ammeter",
        query: { id },
      });
    },
    // 跳转搜索电
    handleAmmeterClick() {
      this.$router.push({
        path: "/tool/ammeter",
        query: {
          sid: 1,
          build: 100,
          name: 111,
          gateway: 59003,
          pageNum: 1,
          pageSize: 10,
          statue: 3,
          type: 1,
        },
      });
    },
    // 显示加载中状态
    showLoading() {
      this.dialogVisible = true; // 打开弹出层
      this.loading = true; // 显示加载动画
      this.dialogContent = ""; // 清空上一次内容
    },

    // 隐藏加载中状态
    hideLoading() {
      this.loading = false; // 隐藏加载动画
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

<style scoped lang="scss">
.cappuser {
  .head-container {
    .el-tree-node__content > .el-tree-node__expand-icon {
      padding: 6px 0px 6px 0px;
      font-size: 20px;
      margin-right: 0px;
    }
  }
  .el-icon-office-building,
  .el-icon-coin,
  .el-icon-house,
  .el-icon-monitor {
    font-size: 14px;
    text-align: center;
    color: #c0c4cc;
    margin-left: 0px;
  }
  .el-icon-star-off {
    font-size: 14px;
    text-align: center;
    color: #c0c4cc;
    margin-left: 0px;
  }
  .search-icontest {
    cursor: pointer;
    font-size: 14px;
    vertical-align: middle;
    color: #c0c4cc;
  }
  .el-transfer__buttons {
    & .el-button + .el-button {
      margin-left: 0px;
    }
  }
}
.textspan {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xs {
  cursor: pointer;
}
.bgc {
  background-image: linear-gradient(
    to right bottom,
    rgb(236, 71, 134),
    rgb(185, 85, 164)
  );
}
.bgc1 {
  background-image: linear-gradient(
    to right bottom,
    rgb(134, 94, 192),
    rgb(81, 68, 180)
  );
}

.bgc2 {
  background-image: linear-gradient(
    to right bottom,
    rgb(86, 205, 243),
    rgb(113, 157, 227)
  );
}

.bgc3 {
  background-image: linear-gradient(
    to right bottom,
    rgb(252, 188, 37),
    rgb(246, 128, 87)
  );
}

.bgc4 {
  background-image: linear-gradient(
    to right bottom,
    rgb(186, 104, 200),
    rgb(255, 128, 203)
  );
}

.bgc5 {
  background-image: linear-gradient(
    to right bottom,
    rgb(129, 236, 236),
    rgb(84, 160, 255)
  );
}

.bgc6 {
  background-image: linear-gradient(
    to right bottom,
    rgb(255, 204, 204),
    rgb(204, 153, 255)
  );
}

.text-r {
  text-align: right;
}

.text-s {
  font-size: 1vw;
}

.data-content,
.table-box {
  height: 86.2vh;
  overflow-y: auto;
  border-radius: 10px;
  padding: 20px 10px;
  scrollbar-width: none; /* 针对 Firefox */
}

.data-content::-webkit-scrollbar,
.table-box::-webkit-scrollbar {
  display: none; /* 针对 Chrome、Safari 和 Edge */
}

.sd-data {
  width: 100%;
  height: 20%;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.dark .sd-data {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.sd-item {
  width: calc(25% - 20px);
  height: 85%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.yh-data {
  width: 45%;
  height: 100%;
}

.yh {
  color: #fff;
  font-size: 0.9vw;
  height: 50%;
}

.yh2 {
  color: #fff;
  font-size: 1.5vw;
  height: 50%;
  font-weight: 600;
  padding-top: 1vw;
}

.yue {
  height: 50%;
}

.yue2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.yue-num {
  font-size: 1.5vw;
  font-weight: 600;
  padding-top: 1vw;
}

.sd-data2 {
  width: 100%;
  height: calc(30% - 20px);
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
}

.dark .sd-data2 {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.day-data {
  width: calc(33% - 20px);
  height: 85%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.dryd {
  width: 30%;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.sd-data3 {
  width: 100%;
  height: calc(50% - 20px);
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
}

.dark .sd-data3 {
  background-color: rgba($color: #3f586e, $alpha: 0.5);
}

.echart-box {
  width: 50%;
  height: 100%;
}

// --------------------子节点电水表数据-------------------- //
.table-title {
  font-size: 1.5vw;
  font-weight: 600;
  text-align: center;
}

.form-je {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .card-con {
    width: calc(20% - 10px);
    font-size: 0.8vw;
    margin-right: 7px;
    margin-top: 7px;
    background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  }

  .clearfix {
    font-size: 1vw;
    font-weight: 600;
    text-align: center;
    color: rgb(84, 160, 255);
  }
}
</style>
