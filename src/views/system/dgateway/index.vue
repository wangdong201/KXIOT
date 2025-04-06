<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="网关号" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入网关号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ip" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入ip"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="独立用户" prop="alone">
        <el-input
          v-model="queryParams.alone"
          placeholder="请输入独立用户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dgateway:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:dgateway:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:dgateway:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:dgateway:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="dgatewayList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="网关号" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="ip" align="center" prop="ip" />
      <el-table-column label="通讯端口" align="center" prop="port" />
      <!-- <el-table-column label="类型" align="center" prop="mode" /> -->
      <el-table-column label="类型" align="center" prop="mode">
        <template slot-scope="scope">
          <span>{{ getModeName(scope.row.mode) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采集周期" align="center" prop="zhouqi" />
      <el-table-column label="iccid" align="center" prop="iccid" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="独立用户" align="center" prop="alone" />
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
            v-hasPermi="['system:dgateway:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dgateway:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改采集器对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="网关号" prop="id">
          <el-input v-model="form.id" placeholder="请输入网关号" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入ip" />
        </el-form-item>
        <el-form-item label="通讯端口" prop="port">
          <el-input v-model="form.port" placeholder="请输入通讯端口" />
        </el-form-item>
        <el-form-item label="类型" prop="mode">
          <el-radio-group v-model="form.mode">
            <el-radio :label="1">TCP</el-radio>
            <el-radio :label="2">直接表</el-radio>
            <el-radio :label="3">UDP</el-radio>
            <el-radio :label="4">4G</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="采集周期" prop="zhouqi">
          <el-input v-model="form.zhouqi" placeholder="请输入采集周期" />
        </el-form-item>
        <el-form-item label="iccid" prop="iccid">
          <el-input v-model="form.iccid" placeholder="请输入iccid" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="独立用户" prop="alone">
          <el-select
            v-model="form.alone"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in alonelist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listDgateway,
  getDgateway,
  delDgateway,
  addDgateway,
  updateDgateway,
} from "@/api/system/dgateway";
import { mapState } from "vuex";

export default {
  name: "Dgateway",
  data() {
    return {
      // 新增修改判断
      isEdit: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 独立用户数据
      alonelist: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 采集器表格数据
      dgatewayList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        ip: null,
        port: null,
        mode: null,
        zhouqi: null,
        iccid: null,
        description: null,
        alone: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [{ required: true, message: "id不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        ip: [{ required: true, message: "ip不能为空", trigger: "blur" }],
        port: [
          { required: true, message: "通讯端口不能为空", trigger: "blur" },
        ],
        mode: [{ required: true, message: "类型不能为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    this.getList();
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    /** 获取表类型名称 */
    getModeName(mode) {
      const modeNames = {
        1: "TCP",
        2: "直接表",
        3: "UDP",
        4: "4G",
      };
      return modeNames[mode] || "未知"; // 默认返回 '未知'，如果没有匹配的值
    },
    // 用户信息
    fetchUserInfo() {
      this.$store
        .dispatch("GetInfo")
        .then(() => {
          // this.alone = this.user.alone;
          this.alonelist = this.user.alonelist;
          // this.dialtype = this.user.dialtype;
        })
        .catch((error) => {
          console.error("获取用户信息失败:", error);
        });
    },
    /** 查询采集器列表 */
    getList() {
      this.loading = true;
      listDgateway(this.queryParams).then((response) => {
        this.dgatewayList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        ip: null,
        port: null,
        mode: null,
        zhouqi: null,
        iccid: null,
        description: null,
        alone: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.isEdit = false;
      this.title = "添加采集器";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.isEdit = true;
      const id = row.id || this.ids;
      getDgateway(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采集器";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            updateDgateway(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDgateway(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除采集器编号为"' + ids + '"的数据项？')
        .then(function () {
          return delDgateway(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/dgateway/export",
        {
          ...this.queryParams,
        },
        `dgateway_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
