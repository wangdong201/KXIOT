<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="定时时间名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入定时时间名称"
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
          v-hasPermi="['system:weektime:add']"
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
          v-hasPermi="['system:weektime:edit']"
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
          v-hasPermi="['system:weektime:remove']"
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
          v-hasPermi="['system:weektime:export']"
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
      :data="weektimeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="定时时间名称" align="center" prop="name" />
      <el-table-column label="定时内容" align="center" prop="otype" />
      <el-table-column label="独立用户" align="center" prop="alone" />
      <el-table-column label="描述" align="center" prop="description" />
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
            v-hasPermi="['system:weektime:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:weektime:remove']"
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

    <!-- 添加或修改定时时间对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="定时时间名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入定时时间名称" />
        </el-form-item>
        <el-form-item
          v-for="(day, index) in days"
          :key="index"
          :label="day"
          :prop="'otype' + index"
        >
          <el-select
            v-model="otypeValues[index]"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in bdlist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
  listWeektime,
  getWeektime,
  delWeektime,
  addWeektime,
  updateWeektime,
  yhutimelist,
} from "@/api/system/weektime";
import { convertFormData } from "@/utils/typeconfn";

export default {
  name: "Weektime",
  data() {
    return {
      // 下拉框选中的值数组，初始化为7个null
      otypeValues: Array(7).fill(null),
      // 日时间数据
      bdlist: [],
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
      // 定时时间表格数据
      weektimeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        alone: null,
        description: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 定时内容选项
      timeoptions: [
        {
          value: 1,
          label: "星期一",
        },
        {
          value: 2,
          label: "星期二",
        },
        {
          value: 3,
          label: "星期三",
        },
        {
          value: 4,
          label: "星期四",
        },
        {
          value: 5,
          label: "星期五",
        },
        {
          value: 6,
          label: "星期六",
        },
        {
          value: 7,
          label: "星期日",
        },
      ],
      // 星期数组
      days: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期天",
      ],
    };
  },
  created() {
    this.getList();
    this.getYHTime();
  },
  watch: {
    // 监听 otypeValues 数组的变化，将其赋值给 form.otype
    otypeValues: {
      handler(newValue) {
        this.form.otype = newValue;
      },
      deep: true,
    },
  },
  methods: {
    /** 日时间数据 */
    getYHTime() {
      yhutimelist().then((response) => {
        this.bdlist = response.list;
        console.log("111:", this.bdlist);
      });
    },
    /** 查询定时时间列表 */
    getList() {
      this.loading = true;
      listWeektime(this.queryParams).then((response) => {
        this.weektimeList = response.rows;
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
        otype: null,
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
      this.otypeValues = []; // 重置otype值数组
      this.open = true;
      this.title = "添加定时时间";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getWeektime(id).then((response) => {
        this.form = response.data;
        this.form = convertFormData(this.form, ["otype"]);
        this.otypeValues = this.form.otype;
        this.open = true;
        this.title = "修改定时时间";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const submitData = convertFormData(this.form, ["otype"]);
          if (this.form.id != null) {
            updateWeektime(submitData).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWeektime(submitData).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
      console.log("submitData:", this.form);
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除定时时间编号为"' + ids + '"的数据项？')
        .then(function () {
          return delWeektime(ids);
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
        "system/weektime/export",
        {
          ...this.queryParams,
        },
        `weektime_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
