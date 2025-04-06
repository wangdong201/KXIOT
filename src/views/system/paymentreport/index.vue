<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      :rules="rules"
    >
      <el-form-item label="房间" prop="bid">
        <treeselect
          v-model="queryParams.bid"
          :options="deptOptionsroom"
          placeholder="请选择房间"
          :show-count="true"
          :disable-branch-nodes="false"
          search-nested
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="管理员" prop="userid">
        <el-select
          v-model="queryParams.userid"
          filterable
          clearable
          placeholder="请选择管理员"
        >
          <el-option
            v-for="item in unameoptions"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缴费时间" prop="dateRange">
        <el-date-picker
          v-model="queryParams.dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['monitor:jiaofei:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      ref="tables"
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column
        label="房间名称"
        align="center"
        prop="name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="缴费前余额"
        align="center"
        prop="qjine"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="缴费金额"
        align="center"
        prop="jine"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="管理员"
        align="center"
        prop="uname"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="时间"
        align="center"
        prop="mtime"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="描述"
        align="center"
        prop="info"
        :show-overflow-tooltip="true"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="handlePagination"
    />
  </div>
</template>

<script>
import { list, userlist } from "@/api/monitor/jiaofei";
import { deptTreeSelectroom } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "PaymentReport",
  components: { Treeselect },
  data() {
    return {
      // 管理员
      unameoptions: [],
      // 房间树
      deptOptionsroom: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 选中数组
      ids: [],
      // 选择用户名
      selectName: "",
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 日期范围
      // dateRange: [],
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bid: undefined,
        userid: undefined,
        dateRange: [],
      },
      rules: {
        dateRange: [
          { required: true, message: "请选择缴费时间", trigger: "change" },
        ],
      },
    };
  },

  created() {
    Promise.all([this.deptTreeroom(), this.getUserList()]).then(() => {});
    this.getList();
    // this.deptTreeroom();
    // this.getUserList();
  },

  methods: {
    /** 房间树结构 */
    deptTreeroom() {
      deptTreeSelectroom().then((response) => {
        this.deptOptionsroom = response.data;
      });
    },

    /** 管理员数据 */
    getUserList() {
      userlist().then((response) => {
        this.unameoptions = response.data;
      });
    },

    /** 查询缴费报表 */
    getList(params) {
      this.loading = true;
      const baseParams = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        bid: this.queryParams.bid,
        userid: this.queryParams.userid,
        ...params, // 允许覆盖基础参数
      };
      list(
        this.addDateRange(
          baseParams,
          this.queryParams.dateRange,
          undefined,
          true
        )
      ).then((response) => {
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 分页处理方法 */
    handlePagination(pagination) {
      const pageParams = {
        pageNum: pagination.page,
        pageSize: pagination.limit,
      };
      // 调用时显式传递分页参数
      this.getList(pageParams);
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.$refs.queryForm.validate((valid) => {
        if (valid) {
          // 创建参数副本
          const { dateRange, ...restParams } = this.queryParams;
          const params = {
            ...restParams,
            pageNum: 1,
          };
          this.getList(params);
        }
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        ...this.queryParams,
        pageNum: 1,
        bid: undefined,
        userid: undefined,
        dateRange: [],
      };
      this.resetForm("queryForm");
      this.getList();
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      this.selectName = selection.map((item) => item.bid);
    },
    /** 导出按钮操作 */
    handleExport() {
      // 构建参数时排除 dateRange
      const { dateRange, ...exportParams } = this.queryParams;
      this.download(
        "monitor/jiaofei/export",
        this.addDateRange(exportParams, dateRange, undefined, true),
        `paymentreport_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
