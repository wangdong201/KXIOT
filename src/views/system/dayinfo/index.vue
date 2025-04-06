<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="98px"
    >
      <el-form-item label="日时间表名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入日时间表名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item
        v-for="(item, index) in queryItems"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <el-input
          v-model="queryParams[item.prop]"
          :placeholder="item.placeholder"
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
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入描述"
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
          v-hasPermi="['system:dayinfo:add']"
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
          v-hasPermi="['system:dayinfo:edit']"
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
          v-hasPermi="['system:dayinfo:remove']"
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
          v-hasPermi="['system:dayinfo:export']"
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
      :data="dayinfoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :label="col.label"
        align="center"
        :prop="col.prop"
        show-overflow-tooltip
      />
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
            v-hasPermi="['system:dayinfo:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dayinfo:remove']"
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

    <!-- 添加或修改日时间对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="日时间表名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入日时间表名称" />
        </el-form-item>
        <el-form-item
          v-for="(item, index) in timeGroup"
          :key="index"
          :label="`第${index + 1}组`"
          :prop="item.prop"
        >
          <el-time-picker
            is-range
            v-model="form[item.model]"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            format="HH:mm"
            style="width: 100%"
            :default-value="[getTodayWithTime(0, 0), getTodayWithTime(23, 59)]"
          />
        </el-form-item>
        <el-form-item label="独立用户" prop="alone">
          <el-input v-model="form.alone" placeholder="请输入独立用户" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
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
  listDayinfo,
  getDayinfo,
  delDayinfo,
  addDayinfo,
  updateDayinfo,
} from "@/api/system/dayinfo";
import { formatTimeRange, parseTimeRange } from "@/utils/typeconfn";

export default {
  name: "Dayinfo",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 日时间表格数据
      dayinfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        data1: null,
        data2: null,
        data3: null,
        data4: null,
        data5: null,
        data6: null,
        alone: null,
        description: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 时间组
      timeGroup: [
        { prop: "data1", model: "data1" },
        { prop: "data2", model: "data2" },
        { prop: "data3", model: "data3" },
        { prop: "data4", model: "data4" },
        { prop: "data5", model: "data5" },
        { prop: "data6", model: "data6" },
      ],
      // 表格列
      columns: [
        { label: "id", prop: "id" },
        { label: "日时间表名称", prop: "name" },
        { label: "第一组", prop: "data1" },
        { label: "第二组", prop: "data2" },
        { label: "第三组", prop: "data3" },
        { label: "第四组", prop: "data4" },
        { label: "第五组", prop: "data5" },
        { label: "第六组", prop: "data6" },
        { label: "独立用户", prop: "alone" },
        { label: "描述", prop: "description" },
      ],

      // 查询条件
      queryItems: [
        // { label: "第一组", prop: "data1", placeholder: "请输入第一组" },
        // { label: "第二组", prop: "data2", placeholder: "请输入第二组" },
        // { label: "第三组", prop: "data3", placeholder: "请输入第三组" },
        // { label: "第四组", prop: "data4", placeholder: "请输入第四组" },
        // { label: "第五组", prop: "data5", placeholder: "请输入第五组" },
        // { label: "第六组", prop: "data6", placeholder: "请输入第六组" },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 获取当前时间 */
    getTodayWithTime(hours, minutes) {
      const today = new Date();
      today.setHours(hours);
      today.setMinutes(minutes);
      today.setSeconds(0);
      today.setMilliseconds(0);
      return today;
    },
    /** 查询日时间列表 */
    getList() {
      this.loading = true;
      listDayinfo(this.queryParams).then((response) => {
        this.dayinfoList = response.rows;
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
        data1: null,
        data2: null,
        data3: null,
        data4: null,
        data5: null,
        data6: null,
        alone: null,
        description: null,
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
      this.title = "添加日时间";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getDayinfo(id).then((response) => {
        this.form = response.data;
        // 转换时间字段的数据
        this.timeGroup.forEach((item) => {
          const parsedTime = parseTimeRange(this.form[item.model]);
          // 只在有效的时间对象时赋值
          if (parsedTime) {
            this.form[item.model] = parsedTime;
          }
        });
        this.open = true;
        this.title = "修改日时间";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.timeGroup.forEach((item) => {
            this.form[item.model] = formatTimeRange(this.form[item.model]);
          });
          if (this.form.id != null) {
            updateDayinfo(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDayinfo(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
      console.log(this.form);
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除日时间编号为"' + ids + '"的数据项？')
        .then(function () {
          return delDayinfo(ids);
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
        "system/dayinfo/export",
        {
          ...this.queryParams,
        },
        `dayinfo_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
