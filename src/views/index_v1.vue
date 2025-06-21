<template>
  <div class="app-container">
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
          :render-content="renderContent"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          :default-expanded-keys="[100]"
        >
        </el-tree>
      </el-col>
      <el-col :span="20" :xs="24">
        <!-- 缴费显示区域 -->
        <div
          v-if="selectedNode.icon === 'el-icon-user'"
          class="jiaofei-container"
        >
          <div class="table-title">
            <i class="el-icon-house"></i>
            {{ roomdatalist.name }}
          </div>
          <el-divider></el-divider>
          <el-form
            ref="formRef"
            :inline="true"
            :model="jeform"
            :rules="formRules"
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
            <el-form-item label="缴费金额" prop="mon">
              <el-input
                v-model="jeform.mon"
                @input="handleNumberInput"
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
                <el-button-group
                  style="display: flex; gap: 8px; margin-top: 10px"
                >
                  <el-button
                    type="primary"
                    @click="readDbdslist(item.id)"
                    size="mini"
                    style="flex: 1; white-space: nowrap"
                    >读电量</el-button
                  >
                  <el-button
                    type="primary"
                    @click="readDglxxlist(item.id)"
                    size="mini"
                    style="flex: 1; white-space: nowrap"
                    >读多功能</el-button
                  >
                  <el-button
                    type="primary"
                    @click="modifyDbdslist(item.id)"
                    size="mini"
                    style="flex: 1; white-space: nowrap"
                    >修改</el-button
                  >
                </el-button-group>
              </el-card>
            </div>
          </div>
        </div>
        <!-- 表格数据 -->
        <div v-else class="table-container">
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
          >
            <el-form-item label="名称" prop="name" label-width="68px">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="余额" prop="zhmoney1" label-width="68px">
              <el-input
                v-model="queryParams.zhmoney1"
                placeholder="输入金额"
                clearable
                @keyup.enter.native="handleQuery"
                style="width: 100px"
              />
            </el-form-item>
            <el-form-item label="至" prop="zhmoney2">
              <el-input
                v-model="queryParams.zhmoney2"
                clearable
                placeholder="输入金额"
                @keyup.enter.native="handleQuery"
                style="width: 100px"
              />
            </el-form-item>
            <el-form-item label="状态" prop="state" label-width="68px">
              <el-select
                v-model="queryParams.state"
                clearable
                placeholder="请选择状态"
                @keyup.enter.native="handleQuery"
                style="width: 100%"
              >
                <el-option
                  v-for="item in paymentOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联" prop="txradio" label-width="68px">
              <el-radio-group v-model="queryParams.txradio">
                <el-radio :label="0">全部</el-radio>
                <el-radio :label="1">参考左边节点</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleQuery"
                icon="el-icon-search"
                size="mini"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" @click="handleReset" size="mini"
                >重置</el-button
              >
            </el-form-item>
          </el-form>

          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['system:ammeter:export']"
                >导出</el-button
              >
            </el-col>

            <!-- <right-toolbar
            :showSearch.sync="showSearch"
            @queryTable="getList"
          ></right-toolbar> -->
          </el-row>

          <el-table v-loading="loading" :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="id" label="id" align="center" />
            <el-table-column prop="name" label="名称" align="center" />
            <el-table-column prop="balance" label="账户余额" align="center" />
            <el-table-column prop="state" label="缴费状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.state === 1 ? 'danger' : 'success'"
                  @click="toggleStatus(scope.row)"
                  style="cursor: pointer"
                >
                  {{ scope.row.state === 1 ? "禁止缴费" : "正常缴费" }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:ammeter:edit']"
                  >缴费</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getpaylist"
          />
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
import { paylist, jiaoFeiChangeState } from "@/api/monitor/jiaofei";
import {
  roominfotreelist,
  postjfpay,
  dbdslist,
  dglxxlist,
} from "@/api/system/ammeter";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      dialogContent: "",
      czstatus: "",
      dialogVisible: false,
      selectedNode: {},
      roomdatalist: {},
      // 表格数据加载状态
      loading: false,
      // 过滤输入框值
      filterText: "",
      // 部门树数据
      deptOptionsroom: [],
      // 总条数
      total: 0,
      // 部门树默认选中项
      defaultProps: {
        children: "children",
        label: "label",
      },
      paymentOptions: [
        { id: 0, name: "正常缴费" },
        { id: 1, name: "禁止缴费" },
      ],
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        state: null,
        txradio: null,
        zhmoney1: null,
        zhmoney2: null,
        deptId: null,
      },
      jeform: { id: null, mon: "", type: 0, info: null },
      formRules: {
        mon: [{ required: true, message: "请输入缴费金额", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  async created() {
    await this.deptTreeroom();
    this.getpaylist();
  },
  methods: {
    /** 加载部门树数据 */
    async deptTreeroom() {
      try {
        const res = await deptTreeSelectroom();
        this.deptOptionsroom = res.data || [];
      } catch (error) {
        console.error("部门树数据加载失败:", error);
      }
    },

    /** 查询表格数据 */
    getpaylist() {
      this.loading = true;
      // 构造最终请求参数
      const params = {
        ...this.queryParams,
        // 当选择"全部"时不传deptId
        deptId:
          this.queryParams.txradio === 0 ? undefined : this.queryParams.deptId,
      };
      // 过滤undefined值
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      );
      paylist(filteredParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 节点过滤方法
    filterNode(value, data) {
      if (!value) return true;
      return data.label && data.label.indexOf(value) !== -1;
    },

    // 自定义节点渲染
    renderContent(h, { node, data }) {
      return h("span", [h("i", { class: data.icon }), h("span", node.label)]);
    },

    /** 节点点击事件 */
    async handleNodeClick(nodedata) {
      this.selectedNode = nodedata;
      const { id, icon } = nodedata;
      this.queryParams.deptId = id;
      this.jeform.id = this.selectedNode.id;

      if (!id) return;

      try {
        let response;
        if (icon === "el-icon-user") {
          response = await roominfotreelist(id);
        } else {
          response = await paylist({
            ...this.queryParams,
            pageNum: 1,
            pageSize: 10,
            deptId: id,
          });
        }

        // 统一处理响应格式
        if (response?.code === 200) {
          if (icon === "el-icon-user") {
            this.roomdatalist = response.data || {};
          } else {
            this.tableData = response.rows || [];
            this.total = response.total || 0;
          }
        } else {
          console.error("接口返回异常:", response?.msg);
        }
      } catch (error) {
        console.error("请求失败:", error);
        this.$message.error("数据加载失败");
      }

      // this.handleQuery();
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/ammeter/export",
        {
          ...this.queryParams,
        },
        `ammeter_${new Date().getTime()}.xlsx`
      );
    },

    /** 状态切换方法 */
    async toggleStatus(row) {
      try {
        await this.$confirm("确定要切换缴费状态吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const newState = row.state === 1 ? 0 : 1;
        await jiaoFeiChangeState({
          deptId: row.id,
          state: newState,
        });
        // 更新前端状态
        row.state = newState;
        this.$message.success("状态更新成功");
        // 建议添加数据刷新
        await this.getpaylist();
      } catch (error) {
        if (error !== "cancel") {
          this.$message.error(error.response?.data?.msg || "状态更新失败");
        }
      }
    },

    /** 缴费按钮操作 */
    handleUpdate(row) {
      if (row.state === 1) {
        this.$message.warning("该用户已被禁止缴费，无法进行缴费操作");
      }
      this.selectedNode = {
        icon: "el-icon-user",
        id: row.id,
        state: row.state,
      };
      this.jeform.id = row.id;
      roominfotreelist(row.id).then((response) => {
        this.roomdatalist = response.data || {};
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      if (this.queryParams.txradio === 0) {
        this.queryParams.deptId = null;
      }
      this.getpaylist();
    },

    /**  重置按钮操作 */
    handleReset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        state: null,
        txradio: null,
        zhmoney1: null,
        zhmoney2: null,
      };
      this.getpaylist();
    },

    /** 处理金额输入 */
    handleNumberInput(value) {
      this.jeform.mon = value
        .replace(/[^\d.-]/g, "") // 只保留数字、小数点和负号
        .replace(/(?!^)-/g, "") // 负号只能在开头
        .replace(/(\..*)\./g, "$1"); // 只允许一个小数点
    },

    /** 充值提交 */
    onSubmit() {
      // 检查缴费状态
      if (this.selectedNode && this.selectedNode.state === 1) {
        this.$message.warning("该用户已被禁止缴费，无法进行缴费操作");
        return;
      }

      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          try {
            const submitData = {
              ...this.jeform,
              mon: parseFloat(this.jeform.mon),
            };
            await postjfpay(submitData);
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

    /** 读电量 */
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
    /** 读多功能 */
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
    /** 跳转修改电 */
    modifyDbdslist(id) {
      this.$router.push({
        path: "/tool/ammeter",
        query: { id },
      });
    },

    /** 显示加载中状态 */
    showLoading() {
      this.dialogVisible = true;
      this.loading = true;
      this.dialogContent = "";
    },

    /** 隐藏加载中状态 */
    hideLoading() {
      this.loading = false;
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

<style scoped lang="scss">
.form-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .card-con {
    width: calc(20% - 10px);
    min-width: 260px;
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
