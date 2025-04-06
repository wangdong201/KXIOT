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
      <el-form-item label="采集器ID:">
        <el-input
          v-model="form.collectorId"
          placeholder="请输入采集器ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注信息：">
        <el-input
          v-model="form.remark"
          placeholder="请输入采集器备注信息"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="primary" @click="onReset">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- 全选删除 -->

    <div style="margin-bottom: 15px">
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
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible = true"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.$index)"
              >删除</el-button
            >
            <el-button type="text" @click="dialogVisible2 = true"
              >详情</el-button
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
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="editForm" :model="editForm" label-width="80px">
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
          <el-form-item label="采集器ID">
            <el-input
              v-model="editForm.collectorId"
              class="input-width"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注信息">
            <el-input v-model="editForm.remark" class="input-width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="" @click="dialogVisible = false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 详情弹窗 -->
    <div>
      <el-dialog
        title="详情"
        :visible.sync="dialogVisible2"
        width="50%"
        :before-close="handleClose2"
      >
        <div class="detail-container">
          <p class="p-span" v-for="index in 20" :key="index">
            <span class="text-id">采集器ID:</span>
            <span class="text-value">12313515</span>
          </p>
          <div style="margin-left: 85%">
            <el-button type="" @click="dialogVisible2 = false">返回</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      editForm: {
        grouping: "",
        collectorId: "",
        remark: "",
      },
      form: {
        grouping: "allgrouping",
        collectorId: "",
        remark: "",
      },
      tableData: Array.from({ length: 10 }).map((_, index) => ({
        id: index + 1,
        grouping: `${index + 1}楼`,
        collectorId: "2120129050151",
        state: "已连接",
        connectQuality: "90%",
        tableCount: "1只",
        remark: "备注信息",
        lasttime: "1小时前",
        accumulatedonline: "100分钟",
      })),
      columns: [
        { prop: "id", label: "序号" },
        { prop: "grouping", label: "分组" },
        { prop: "collectorId", label: "采集器ID" },
        { prop: "state", label: "状态" },
        { prop: "connectQuality", label: "连接质量" },
        { prop: "tableCount", label: "表数量" },
        { prop: "remark", label: "备注" },
        { prop: "lasttime", label: "上次连接/掉线" },
        { prop: "accumulatedonline", label: "累计在线" },
      ],
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleClose2(done) {
      done();
    },
    onSearch() {
      this.$emit("search", this.form);
    },
    onReset() {
      this.$refs.form.resetFields();
    },
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
</style>
