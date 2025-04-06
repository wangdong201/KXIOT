<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.grouping" placeholder="">
          <el-option label="全部" value="allgrouping"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器">
        <el-select v-model="form.collector" placeholder="">
          <el-option label="全部" value="allcollector"></el-option>
          <el-option label="采集器一" value="cjq1"></el-option>
          <el-option label="采集器二" value="cjq2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电表地址：">
        <el-input
          v-model="form.tableAddress"
          placeholder="搜索电能表地址信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户姓名：">
        <el-input
          v-model="form.userName"
          placeholder="搜索用户姓名信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="电表备注：">
        <el-input
          v-model="form.remark"
          placeholder="搜索电能表备注信息"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="primary" @click="onReset">清空</el-button>
        <el-button type="primary">导出到Excel</el-button>
      </el-form-item>
    </el-form>
    <!-- 全选删除 -->

    <div style="margin-bottom: 15px">
      <el-button type="primary">生成二维码</el-button>
      <el-button type="primary">导入设备</el-button>
      <el-button type="danger" @click="handleDeleteAll">批量删除</el-button>
      <el-button type="primary" @click="handleChangeGrouping"
        >批量更换分组</el-button
      >
    </div>
    <!-- table -->
    <div>
      <el-table :data="tableData"  style="width: 100%" border ref="table">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible = true"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.$index)"
              >删除</el-button
            >
            <el-button type="text" @click="dialogVisible2 = true"
              >基本业务</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹窗 -->
    <div>
      <el-dialog
        title="编辑采集器"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
      >
        <el-form
          ref="editForm"
          :model="editForm"
          label-width="80px"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="分组">
            <el-select
              v-model="editForm.grouping"
              placeholder=""
              class="input-width"
            >
              <el-option label="分组一" value="fz1"></el-option>
              <el-option label="分组二" value="fz2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电表类型" prop="metertype">
            <el-select
              v-model="editForm.metertype"
              placeholder=""
              class="input-width"
            >
              <el-option label="单相2020Z款远程预付费" value="dx1"></el-option>
              <el-option label="电表二" value="db2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联用户" prop="gluser">
            <el-select
              v-model="editForm.gluser"
              placeholder=""
              class="input-width"
            >
              <el-option label="101" value="user1"></el-option>
              <el-option label="102" value="user2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表号" prop="tableNumber">
            <el-input
              v-model="editForm.tableNumber"
              class="input-width"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注信息" prop="remark">
            <el-input
              type="textarea"
              v-model="editForm.remark"
              class="input-width"
              placeholder="电表备注不能为空"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序值">
            <el-input v-model="editForm.sort" style="width: 100px"></el-input>
            <template>
              <span style="color: #909399; font-size: 12px; padding-left: 12px"
                >范围0-9999,数字越大排名越后</span
              >
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="" @click="dialogVisible = false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 基本业务弹窗 -->
    <div>
      <el-dialog
        title="详情"
        :visible.sync="dialogVisible2"
        width="80%"
        :before-close="handleClose2"
      >
        <div class="jbyw-container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
              <Basicinformation />
            </el-tab-pane>
            <el-tab-pane label="开户" name="second">
              <Openanaccount />
            </el-tab-pane>
            <el-tab-pane label="充值" name="third">
              <RechargeView />
            </el-tab-pane>
            <el-tab-pane label="用电量统计" name="fifth">
              <ydlstatistics :key="`fifth-${activeTab}`" />
            </el-tab-pane>
            <el-tab-pane label="运行数据" name="yxdata">
              <OperatingData :key="`yxdata-${activeTab}`" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Basicinformation from "./Basicinformation.vue";
import Openanaccount from "./Openanaccount.vue";
import RechargeView from "./RechargeView.vue";
import ydlstatistics from "./ydlstatistics.vue";
import OperatingData from "./OperatingData.vue";
export default {
  name: "AllElectric",
  components: {
    Basicinformation,
    Openanaccount,
    RechargeView,
    ydlstatistics,
    OperatingData,
  },
  data() {
    return {
      activeName:
        localStorage.getItem(`activeName-${this.$options.name}`) || "first",
      dialogVisible: false,
      dialogVisible2: false,
      activeTab: 0,
      editForm: {
        grouping: "",
        metertype: "",
        gluser: "",
        tableNumber: "",
        remark: "",
        sort: 0,
      },
      form: {
        grouping: "allgrouping",
        collector: "allcollector",
        tableAddress: "",
        userName: "",
        remark: "",
      },
      tableData: Array.from({ length: 10 }).map((_, index) => ({
        id: index + 1,
        grouping: `${index + 1}楼`,
        collectorId: "2120129050151",
        Presence: "已连接",
        connectQuality: "90%",
        mailaddress: "123456789",
        user: "101",
        metertype: "单相2020Z款远程预付费",
        remark: "备注信息",
        state: "未开户",
        cumulativeuseelectricity: "20.00kWh",
        remainingamount: "100.00元",
      })),
      columns: [
        { prop: "id", label: "序号" },
        { prop: "grouping", label: "分组" },
        { prop: "collectorId", label: "采集器" },
        { prop: "Presence", label: "在线状态" },
        { prop: "connectQuality", label: "通讯质量" },
        { prop: "mailaddress", label: "通讯地址" },
        { prop: "user", label: "用户" },
        { prop: "metertype", label: "电表类型" },
        { prop: "remark", label: "备注" },
        { prop: "state", label: "状态" },
        { prop: "cumulativeuseelectricity", label: "累计用电量" },
        { prop: "remainingamount", label: "剩余金额" },
      ],
      rules: {
        tableNumber: [
          { required: true, message: "请输入表号", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入备注信息", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 编辑弹窗关闭
    handleClose(done) {
      done();
    },

    // 基本业务弹窗关闭
    handleClose2(done) {
      done();
    },

    // 点击tab切换
    handleClick(tab) {
      this.activeName = tab.name;
      this.activeTab++;
    },

    // 搜索
    onSearch() {
      this.$emit("search", this.form);
    },

    // 重置
    onReset() {
      this.$refs.form.resetFields();
    },

    // 删除
    handleDelete(index) {
      this.$confirm("此操作将永久删除该采集器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },

    // 批量删除
    handleDeleteAll() {
      const selectedItems = this.$refs.table.selection;
      if (selectedItems.length === 0) {
        this.$message({
          message: "请先选择要删除的采集器",
          type: "warning",
        });
        return;
      }
      this.$confirm("此操作将永久删除选中的采集器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const selectedIds = selectedItems.map((item) => item.id);
          this.tableData = this.tableData.filter(
            (item) => !selectedIds.includes(item.id)
          );
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {});
    },
    handleChangeGrouping() {},
  },
  // 监听activeName变化
  watch: {
    activeName: {
      handler(newVal) {
        localStorage.setItem(`activeName-${this.$options.name}`, newVal);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
.input-width {
  width: 400px;
}

.detail-container {
  height: 50vh;
  overflow: auto;
  padding: 10px 10px;
}

.text-id {
  display: inline-block;
  width: 30%;
  text-align: right;
  font-size: 14px;
  font-weight: normal;
}

.text-value {
  padding-left: 30px;
  font-size: 14px;
  font-weight: normal;
}

.jbyw-container {
  height: 80vh;
  overflow: auto;
}
</style>
