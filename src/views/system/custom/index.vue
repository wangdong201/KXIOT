<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="项目名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目到期时间" prop="dqeTime">
        <el-date-picker
          clearable
          v-model="queryParams.dqeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择项目到期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="对应区域" prop="bid">
        <el-input
          v-model="queryParams.bid"
          placeholder="请输入对应区域"
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
          v-hasPermi="['system:custom:add']"
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
          v-hasPermi="['system:custom:edit']"
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
          v-hasPermi="['system:custom:remove']"
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
          v-hasPermi="['system:custom:export']"
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
      :data="customList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="项目名称" align="center" prop="name" />

      <!-- 动态日期展示 -->
      <el-table-column
        label="项目到期时间"
        align="center"
        prop="dqeTime"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dqeTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>

      <!-- 提取表格列显示 -->
      <el-table-column
        v-for="col in commonColumns"
        :key="col.prop"
        :label="col.label"
        align="center"
        :prop="col.prop"
        show-overflow-tooltip
      />

      <!-- 通过计算属性显示需要的条件列 -->
      <el-table-column
        v-for="col in filteredConditionalColumns"
        :key="col.prop"
        :label="col.label"
        align="center"
        :prop="col.prop"
        show-overflow-tooltip
      />

      <!-- 操作列 -->
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
            v-hasPermi="['system:custom:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:custom:remove']"
          >
            删除
          </el-button>
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

    <!-- 添加或修改用户对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="70%"
      append-to-body
      class="custom_dialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="dialog_form">
          <div class="form_left">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入项目名称" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" placeholder="请输入排序" />
            </el-form-item>
            <el-form-item label="项目到期时间" prop="dqeTime">
              <el-date-picker
                clearable
                v-model="form.dqeTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择项目到期时间"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="电表类型" prop="dblx">
              <el-select
                v-model="form.dblx"
                multiple
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in dboptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="水表类型" prop="sblx">
              <el-select
                v-model="form.sblx"
                multiple
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in sboptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="气表类型" prop="qblx">
              <el-select
                v-model="form.qblx"
                multiple
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in qboptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="热表类型" prop="rblx">
              <el-select
                v-model="form.rblx"
                multiple
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in rboptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="电表数量" prop="dbcount">
              <el-input v-model="form.dbcount" placeholder="请输入电表数量" />
            </el-form-item>
            <el-form-item label="水表数量" prop="sbcount">
              <el-input v-model="form.sbcount" placeholder="请输入水表数量" />
            </el-form-item>
            <!-- <el-form-item label="气表数量" prop="qbcount">
              <el-input v-model="form.qbcount" placeholder="请输入气表数量" />
            </el-form-item>
            <el-form-item label="热表数量" prop="rbcount">
              <el-input v-model="form.rbcount" placeholder="请输入热表数量" />
            </el-form-item> -->
            <el-form-item label="系统类型" prop="systype">
              <el-select
                v-model="form.systype"
                multiple
                placeholder="请输入系统类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in systypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="微信appid" prop="wxappid">
              <el-input v-model="form.wxappid" placeholder="请输入微信appid" />
            </el-form-item>
            <el-form-item label="mchid" prop="wxmchid">
              <el-input v-model="form.wxmchid" placeholder="请输入mchid" />
            </el-form-item>
            <el-form-item label="secret" prop="wxaddsecret">
              <el-input v-model="form.wxaddsecret" placeholder="请输入secret" />
            </el-form-item>
            <el-form-item label="paykey" prop="wxpaykey">
              <el-input v-model="form.wxpaykey" placeholder="请输入paykey" />
            </el-form-item>
            <el-form-item label="余额不足推送" prop="wxtemplate1">
              <el-input
                v-model="form.wxtemplate1"
                placeholder="请输入余额不足推送"
              />
            </el-form-item>
            <el-form-item label="缴费提醒推送" prop="wxtemplate2">
              <el-input
                v-model="form.wxtemplate2"
                placeholder="请输入缴费提醒推送"
              />
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="链接网址" prop="url">
              <el-input v-model="form.url" placeholder="请输入链接网址" />
            </el-form-item>
          </div>
          <div class="form_right">
            <el-form-item label="短信剩余数" prop="duanxin">
              <el-input v-model="form.duanxin" placeholder="请输入短信剩余数" />
            </el-form-item>
            <el-form-item label="支付类型" prop="zftype">
              <el-select
                v-model="form.zftype"
                multiple
                placeholder="请输入支付类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in zfoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对应区域" prop="bid">
              <Treeselect
                v-model="form.bid"
                :options="deptOptions"
                :show-count="true"
                placeholder="请选择或者搜索归属部门"
                :default-expand-level="form.bid ? Infinity : 1"
                :auto-scroll="true"
                :auto-open="true"
                :branchNodesFirst="true"
              />
            </el-form-item>

            <el-form-item label="手续费" prop="shouxufei">
              <el-input v-model="form.shouxufei" placeholder="请输入手续费" />
            </el-form-item>
            <el-form-item label="手续费提示" prop="shouxufeits">
              <el-input
                v-model="form.shouxufeits"
                placeholder="请输入手续费提示"
              />
            </el-form-item>
            <el-form-item label="最小缴费金额" prop="minmon">
              <el-input
                v-model="form.minmon"
                placeholder="请输入最小缴费金额"
              />
            </el-form-item>
            <el-form-item label="手机端底部信息" prop="phinfo">
              <el-input
                v-model="form.phinfo"
                placeholder="请输入手机端底部信息"
              />
            </el-form-item>
            <el-form-item label="开始断电时间" prop="qfks">
              <el-input v-model="form.qfks" placeholder="请输入开始断电时间" />
            </el-form-item>
            <el-form-item label="结束断电时间" prop="qfjs">
              <el-input v-model="form.qfjs" placeholder="请输入结束断电时间" />
            </el-form-item>
            <el-form-item label="警告推送模版" prop="wxtemplate3">
              <el-input
                v-model="form.wxtemplate3"
                placeholder="请输入警告推送模版"
              />
            </el-form-item>
            <el-form-item label="物业费推送模版" prop="wxtemplate11">
              <el-input
                v-model="form.wxtemplate11"
                placeholder="请输入物业费推送模版"
              />
            </el-form-item>
            <el-form-item label="支付宝appid" prop="alipayappid">
              <el-input
                v-model="form.alipayappid"
                placeholder="请输入支付宝appid"
              />
            </el-form-item>
            <el-form-item label="publickey" prop="alipaypublickey">
              <el-input
                v-model="form.alipaypublickey"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="privatekey" prop="alipayprivatekey">
              <el-input
                v-model="form.alipayprivatekey"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="logo路径" prop="logotext">
              <el-upload
                class="upload-demo"
                action="http://localhost:8080"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-change="handleChange"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件,且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </div>
        </div>
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
  listCustom,
  getCustom,
  delCustom,
  addCustom,
  updateCustom,
} from "@/api/system/custom";
import { convertFormData } from "@/utils/typeconfn";
import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Custom",
  components: { Treeselect },
  data() {
    return {
      showTimeColumns: false,
      // 支付方式选项
      zfoptions: [
        {
          value: 1,
          label: "微信",
        },
        {
          value: 2,
          label: "支付宝",
        },
        {
          value: 3,
          label: "第三方支付",
        },
      ],

      // 系统类型选项
      systypeOptions: [
        {
          value: 1,
          label: "电",
        },
        {
          value: 2,
          label: "水",
        },
      ],
      props: { multiple: true, value: "value", label: "label" }, // 多选
      cascadervalue: [], // 级联选择值
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
      // 用户表格数据
      customList: [],
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: [],
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        // sort: null,
        dqeTime: null,
        dblx: [],
        sblx: [],
        qblx: [],
        rblx: [],
        dbcount: null,
        sbcount: null,
        qbcount: null,
        rbcount: null,
        systype: null,
        duanxin: null,
        zftype: null,
        bid: null,
        logotext: null,
        title: null,
        url: null,
        shouxufei: null,
        shouxufeits: null,
        minmon: null,
        phinfo: null,
        qfks: null,
        qfjs: null,
        deptId: undefined,
        wxappid: null,
        wxmchid: null,
        wxaddsecret: null,
        wxpaykey: null,
        wxtemplate1: null,
        wxtemplate2: null,
        wxtemplate3: null,
        wxtemplate11: null,
        alipayappid: null,
        alipaypublickey: null,
        alipayprivatekey: null,
      },
      // 表单参数
      form: {},
      dboptions: [],
      sboptions: [],
      qboptions: [],
      rboptions: [],
      fileList: [],
      // 表单校验
      rules: {
        name: [
          { required: true, message: "项目名称不能为空", trigger: "blur" },
        ],
        sort: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        dbcount: [
          { required: true, message: "电表数量不能为空", trigger: "blur" },
        ],
        sbcount: [
          { required: true, message: "水表数量不能为空", trigger: "blur" },
        ],
        qbcount: [
          { required: true, message: "气表数量不能为空", trigger: "blur" },
        ],
        rbcount: [
          { required: true, message: "热表数量不能为空", trigger: "blur" },
        ],
        systype: [
          { required: true, message: "系统类型不能为空", trigger: "blur" },
        ],
        duanxin: [
          { required: true, message: "短信剩余数不能为空", trigger: "blur" },
        ],
        zftype: [
          { required: true, message: "支付类型不能为空", trigger: "blur" },
        ],
        bid: [{ required: true, message: "对应区域不能为空", trigger: "blur" }],
      },
      // 公共列的定义
      commonColumns: [{ label: "短信剩余数", prop: "duanxin" }],
      // 需要条件显示的列
      conditionalColumns: [
        { label: "电表类型", prop: "dblx" },
        { label: "水表类型", prop: "sblx" },
        { label: "气表类型", prop: "qblx" },
        { label: "热表类型", prop: "rblx" },
        { label: "电表数量", prop: "dbcount" },
        { label: "水表数量", prop: "sbcount" },
        { label: "气表数量", prop: "qbcount" },
        { label: "热表数量", prop: "rbcount" },
        { label: "系统类型", prop: "systype" },
        { label: "支付类型", prop: "zftype" },
        { label: "对应区域", prop: "bid" },
        { label: "logo路径", prop: "logotext" },
        { label: "标题", prop: "title" },
        { label: "链接网址", prop: "url" },
        { label: "手续费", prop: "shouxufei" },
        { label: "手续费提示", prop: "shouxufeits" },
        { label: "最小缴费金额", prop: "minmon" },
        { label: "手机端底部信息", prop: "phinfo" },
        { label: "开始断电时间", prop: "qfks" },
        { label: "结束断电时间", prop: "qfjs" },
        { label: "微信appid", prop: "wxappid" },
        { label: "mchid", prop: "wxmchid" },
        { label: "secret", prop: "wxaddsecret" },
        { label: "paykey", prop: "wxpaykey" },
        { label: "余额不足推送", prop: "wxtemplate1" },
        { label: "缴费提醒推送", prop: "wxtemplate2" },
        { label: "警告推送模版", prop: "wxtemplate3" },
        { label: "物业费推送模版", prop: "wxtemplate11" },
        { label: "支付宝appid", prop: "alipayappid" },
        { label: "publickey", prop: "alipaypublickey" },
        { label: "privatekey", prop: "alipayprivatekey" },
      ],
    };
  },
  computed: {
    /** 根据 showTimeColumns 决定显示哪些条件列 */
    filteredConditionalColumns() {
      return this.showTimeColumns ? this.conditionalColumns : [];
    },
  },
  created() {
    this.getList();
    this.getDeptTree();
  },
  methods: {
    /** 文件上传 */
    handleRemove(file) {
      this.fileList = []; // 清空文件列表
      this.form.logotext = ""; // 清空 logotext
    },
    handlePreview(file) {
      console.log("tup", file);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    handleChange(file, fileList) {
      if (file.status === "success") {
        // 文件上传成功，获取返回的 URL
        this.form.logotext = file.url;
        this.fileList = [file]; // 保证 fileList 只包含当前上传的文件
      } else if (file.status === "failed") {
        // 文件上传失败处理
        this.$message.error("文件上传失败，请重试");
      }
    },

    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listCustom(this.queryParams).then((response) => {
        this.customList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 查询部门下拉树结构 */
    async getDeptTree() {
      try {
        const response = await deptTreeSelect();
        this.deptOptions = response.data || [];
        // 初始化处理后的数据
      } catch (error) {
        console.error("获取部门数据失败:", error);
        this.deptOptions = [];
      }
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
        sort: null,
        dqeTime: null,
        dblx: null,
        sblx: null,
        qblx: null,
        rblx: null,
        dbcount: null,
        sbcount: null,
        qbcount: null,
        rbcount: null,
        systype: null,
        duanxin: null,
        zftype: null,
        bid: null,
        logotext: null,
        title: null,
        url: null,
        shouxufei: null,
        shouxufeits: null,
        minmon: null,
        phinfo: null,
        qfks: null,
        qfjs: null,
        wxappid: null,
        wxmchid: null,
        wxaddsecret: null,
        wxpaykey: null,
        wxtemplate1: null,
        wxtemplate2: null,
        wxtemplate3: null,
        wxtemplate11: null,
        alipayappid: null,
        alipaypublickey: null,
        alipayprivatekey: null,
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
      getCustom(0).then((response) => {
        this.dboptions = response.dianlist;
        this.sboptions = response.shuilist;
        this.qboptions = response.qilist;
        this.rboptions = response.reilist;
        this.open = true;
        this.title = "添加用户";
      });
      this.form.bid = null;
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCustom(id).then((response) => {
        this.form = response.data;
        this.dboptions = response.dianlist;
        this.sboptions = response.shuilist;
        this.qboptions = response.qilist;
        this.rboptions = response.reilist;
        // 确保为数组
        this.form = convertFormData(this.form, [
          "dblx",
          "sblx",
          "qblx",
          "rblx",
          "zftype",
          "systype",
        ]);

        this.open = true;
        this.title = "修改用户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 转换为字符串
          const submitData = convertFormData(this.form, [
            "dblx",
            "sblx",
            "qblx",
            "rblx",
            "zftype",
            "systype",
          ]);
          // 判断是更新还是新增操作;
          if (this.form.id != null) {
            updateCustom(submitData).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCustom(submitData).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
      console.log("submitForm", this.form);
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除用户编号为"' + ids + '"的数据项？')
        .then(function () {
          return delCustom(ids);
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
        "system/custom/export",
        {
          ...this.queryParams,
        },
        `custom_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>

<style lang="scss">
.dialog_form {
  display: flex;
  // justify-content: space-between;
  justify-content: space-around;
  height: 700px;
  overflow: auto;

  .form_left {
    width: 40%;
    padding-right: 20px;
  }

  .form_right {
    width: 40%;
    padding-right: 20px;
  }
}

.el-table th .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

