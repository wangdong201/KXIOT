<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="选择用户" prop="build" label-width="80px">
        <treeselect
          v-model="queryParams.build"
          :options="deptOptionsroom"
          placeholder="请选择或者搜索归属房间"
          :show-count="true"
          :disable-branch-nodes="false"
          search-nested
          :multiple="multiple"
          style="width: 213px"
          :max-height="200"
          :clearable="true"
          :limit="1"
          :limit-text="(count) => `已选${count + 1}项`"
        />
      </el-form-item>
      <el-form-item label="选择名称" prop="name" label-width="80px">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采集器" prop="gateway" label-width="80px">
        <el-select
          v-model="queryParams.gateway"
          placeholder="请选择采集器"
          clearable
          filterable
          style="width: 100%"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="item in gatewayList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通道号" prop="tdh" label-width="80px">
        <el-select
          v-model="queryParams.tdh"
          clearable
          placeholder="请选择"
          style="width: 100%"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="item in Tdhoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电表类型" prop="type" label-width="80px">
        <el-select
          v-model="queryParams.type"
          clearable
          filterable
          placeholder="请选择电表类型"
          style="width: 100%"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="item in dialtype"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电表状态" prop="statue" label-width="80px">
        <el-select
          v-model="queryParams.statue"
          clearable
          placeholder="请选择电表状态"
          @keyup.enter.native="handleQuery"
          style="width: 100%"
        >
          <el-option
            v-for="item in dianbiaotype"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="电表号" prop="dbh" label-width="80px">
        <el-input
          v-model="queryParams.dbh"
          placeholder="请输入电表号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="账户金额" prop="zhmoney1" label-width="80px">
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
      <el-form-item label="通讯时间" prop="txradio" label-width="80px">
        <el-radio v-model="queryParams.txradio" label="1">之前</el-radio>
        <el-radio v-model="queryParams.txradio" label="2">之后</el-radio>
      </el-form-item>

      <el-form-item label="" prop="tongxtime">
        <el-date-picker
          v-model="queryParams.tongxtime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
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
          v-hasPermi="['system:ammeter:add']"
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
          v-hasPermi="['system:ammeter:edit']"
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
          v-hasPermi="['system:ammeter:remove']"
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
          v-hasPermi="['system:ammeter:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="PlhandleUpdate"
          v-hasPermi="['system:ammeter:edit']"
          >批量修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="XfcshandleUpdate"
          v-hasPermi="['system:ammeter:cs']"
          >下发参数</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="ammeterList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        v-for="col in commonColumns"
        :key="col.prop"
        :label="col.label"
        align="center"
        :prop="col.prop"
        show-overflow-tooltip
      />
      <!-- 无需显示的列 -->
      <el-table-column
        v-for="col in filteredConditionalColumns"
        :key="col.prop"
        :label="col.label"
        align="center"
        :prop="col.prop"
        show-overflow-tooltip
      />

      <el-table-column
        label="入库时间"
        align="center"
        prop="usetime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.usetime, "{y}-{m}-{d}") }}</span>
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
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:ammeter:remove']"
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

    <!-- 添加或修改电对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="70%"
      append-to-body
      class="ammeter-dialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="ammeter-dialog-form">
          <div class="adf-left">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>

            <el-form-item label="采集器" prop="gateway">
              <el-select
                v-model="form.gateway"
                placeholder="请选择采集器"
                style="width: 100%"
              >
                <el-option
                  v-for="item in gatewayList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="form.type"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in dialtype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通道号" prop="tdh">
              <el-select
                v-model="form.tdh"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in Tdhoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电表号" prop="dbh">
              <el-input v-model="form.dbh" placeholder="请输入电表号" />
            </el-form-item>
            <el-form-item label="电压比" prop="dyb">
              <el-input v-model="form.dyb" placeholder="请输入电压比" />
            </el-form-item>
            <el-form-item label="电流比" prop="beilv">
              <el-input v-model="form.beilv" placeholder="请输入电流比" />
            </el-form-item>
            <el-form-item label="房间" prop="build">
              <treeselect
                v-model="form.build"
                :options="deptOptionsroom"
                placeholder="请选择或者搜索归属房间"
                :show-count="true"
                :disable-branch-nodes="true"
                search-nested
              >
                <!-- 使用 option-label 显示每个节点的标签 -->
                <template #option-label="{ node }">
                  <span class="custom-label">
                    <i v-if="node.id >= 1000000" class="el-icon-house"></i>
                    {{ node.label }}
                  </span>
                </template>

                <!-- 使用 item 插槽进一步自定义显示 -->
                <template #item="{ node }">
                  <div class="custom-item">
                    <i v-if="node.id >= 1000000" class="el-icon-house"></i>
                    {{ node.label }}
                  </div>
                </template>
              </treeselect>
            </el-form-item>
          </div>
          <div class="adf-right">
            <el-form-item
              label="单价"
              prop="danjia"
              v-if="currentType === 0 || currentType === null"
            >
              <el-input v-model="form.danjia" placeholder="请输入单价" />
            </el-form-item>
            <div v-if="currentType === 1 || currentType === null">
              <div class="danjia-box">
                <el-form-item label="尖单价" prop="danjiaj">
                  <el-input v-model="form.danjiaj" placeholder="请输入尖单价" />
                </el-form-item>
                <el-form-item label="峰单价" prop="danjiaf">
                  <el-input v-model="form.danjiaf" placeholder="请输入峰单价" />
                </el-form-item>
              </div>
              <div class="danjia-box">
                <el-form-item label="平单价" prop="danjiap">
                  <el-input v-model="form.danjiap" placeholder="请输入平单价" />
                </el-form-item>
                <el-form-item label="谷单价" prop="danjiag">
                  <el-input v-model="form.danjiag" placeholder="请输入谷单价" />
                </el-form-item>
              </div>
            </div>
            <el-form-item label="欠费断电" prop="duandian">
              <el-radio-group v-model="form.duandian">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="安装位置" prop="weizhi">
              <el-input v-model="form.weizhi" placeholder="请输入安装位置" />
            </el-form-item>
            <el-form-item label="备注" prop="beizhu">
              <el-input v-model="form.beizhu" placeholder="请输入备注" />
            </el-form-item>
            <el-form-item v-if="alone === 1" label="独立用户" prop="alone">
              <el-select
                v-model="form.alone"
                clearable
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
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量修改 -->
    <el-dialog
      :title="title"
      :visible.sync="open2"
      width="30%"
      append-to-body
      class=""
    >
      <!-- 批量修改表单 -->
      <el-form
        ref="plxgform"
        :model="plxgform"
        label-width="100px"
        v-if="dialogType === 'batchEdit'"
      >
        <el-form-item label="采集器" prop="gateway">
          <el-select
            v-model="plxgform.gateway"
            placeholder="请选择采集器"
            style="width: 100%"
          >
            <el-option
              v-for="item in gatewayList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="plxgform.type"
            placeholder="请选择类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in dialtype"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通道号" prop="tdh">
          <el-select
            v-model="plxgform.tdh"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in Tdhoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="danjia">
          <el-input v-model="plxgform.danjia" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="欠费断电" prop="duandian">
          <el-radio-group v-model="plxgform.duandian">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 下发参数表单 -->
      <el-form
        ref="xfcsform"
        :model="xfcsform"
        label-width="100px"
        v-if="dialogType === 'sendParams'"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="手动开电" prop="sdkd">
              <el-checkbox v-model="xfcsform.sdkd"></el-checkbox>
            </el-form-item>
            <el-form-item label="手动关电" prop="sdgd">
              <el-checkbox v-model="xfcsform.sdgd"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="解除手动" prop="jcsd">
              <el-checkbox v-model="xfcsform.jcsd"></el-checkbox>
            </el-form-item>
            <el-form-item label="立即抄表" prop="ljcb">
              <el-checkbox v-model="xfcsform.ljcb"></el-checkbox> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="同步电价" prop="tbdj">
              <el-checkbox v-model="xfcsform.tbdj"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Plcancel">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listAmmeter,
  getAmmeter,
  delAmmeter,
  addAmmeter,
  updateAmmeter,
} from "@/api/system/ammeter";
import { deptTreeSelectroom, seleGatlist } from "@/api/system/user";

import { mapState } from "vuex";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Ammeter",
  components: { Treeselect },
  data() {
    return {
      // 弹窗类型
      dialogType: "",
      // 定时器清除
      timer: null,
      // 修改电id
      xgdid: null,
      selectedType: "",
      // 判断是否独立用户
      alone: "",
      // 采集器列表
      gatewayList: [],
      // 电表数据
      dialtype: [],
      // 独立用户数据
      alonelist: [],
      // 新增修改判断
      isEdit: false,
      // 是否显示更多列
      showTimeColumns: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 房间树
      deptOptionsroom: undefined,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 电表格数据
      ammeterList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open2: false,
      // 当前选择类型值
      // currentType: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        ip: null,
        type: null,
        gateway: null,
        tdh: null,
        dbh: null,
        dyb: null,
        beilv: null,
        statue: null,
        statue2: null,
        build: [],
        dshuxing: null,
        dshuxing1: null,
        dshuxing12: null,
        danjia: null,
        danjiaj: null,
        danjiaf: null,
        danjiap: null,
        danjiag: null,
        duandian: null,
        ddje: null,
        xingzhi: null,
        weizhi: null,
        beizhu: null,
        usetime: null,
        dbds: null,
        dbdsj: null,
        dbdsf: null,
        dbdsp: null,
        dbdsg: null,
        alone: null,
        tongxtime: null,
      },
      // 表单参数
      form: {},
      // 表单参数2
      plxgform: {
        gateway: null,
        type: null,
        tdh: null,
        danjia: null,
        duandian: null,
      },
      // 表单参数3
      xfcsform: {
        sdkd: null,
        sdgd: null,
        jcsd: null,
        ljcb: null,
        tbdj: null,
      },
      // 表单校验
      rules: {
        name: [{ required: true, message: "名称不可为空", trigger: "blur" }],
        gateway: [
          { required: true, message: "采集器不可为空", trigger: "blur" },
        ],
        type: [{ required: true, message: "类型不可为空", trigger: "blur" }],
        tdh: [{ required: true, message: "通道号不可为空", trigger: "blur" }],
        dbh: [{ required: true, message: "电表号不可为空", trigger: "blur" }],
        build: [
          { required: true, message: "归属房间不可为空", trigger: "blur" },
        ],
        danjia: [{ required: true, message: "单价不可为空", trigger: "blur" }],
        danjiaj: [
          { required: true, message: "尖单价不可为空", trigger: "blur" },
        ],
        danjiaf: [
          { required: true, message: "峰单价不可为空", trigger: "blur" },
        ],
        danjiap: [
          { required: true, message: "平单价不可为空", trigger: "blur" },
        ],
        danjiag: [
          { required: true, message: "谷单价不可为空", trigger: "blur" },
        ],
        duandian: [
          { required: true, message: "欠费断电不可为空", trigger: "blur" },
        ],
      },
      // 默认显示的列
      commonColumns: [
        { label: "序号", prop: "id" },
        { label: "名称", prop: "name" },

        { label: "类型", prop: "type" },
        { label: "采集器", prop: "gateway" },
        { label: "电表号", prop: "dbh" },
        { label: "通道号", prop: "tdh" },
        { label: "电表状态", prop: "statue" },
      ],
      conditionalColumns: [
        { label: "ip", prop: "ip" },
        { label: "电压比", prop: "dyb" },
        { label: "电流比", prop: "beilv" },

        { label: "第二路状态", prop: "statue2" },
        { label: "用户", prop: "build" },
        { label: "属性", prop: "dshuxing" },
        { label: "属性1", prop: "dshuxing1" },
        { label: "属性1", prop: "dshuxing12" },
        { label: "单价", prop: "danjia" },
        { label: "尖单价", prop: "danjiaj" },
        { label: "峰单价", prop: "danjiaf" },
        { label: "平单价", prop: "danjiap" },
        { label: "谷单价", prop: "danjiag" },
        { label: "欠费断电", prop: "duandian" },
        { label: "断电金额", prop: "ddje" },
        { label: "性质", prop: "xingzhi" },
        { label: "安装位置", prop: "weizhi" },
        { label: "备注", prop: "beizhu" },
        { label: "电表底数", prop: "dbds" },
        { label: "尖电表底数", prop: "dbdsj" },
        { label: "峰电表底数", prop: "dbdsf" },
        { label: "平电表底数", prop: "dbdsp" },
        { label: "谷电表底数", prop: "dbdsg" },
        { label: "独立用户", prop: "alone" },
      ],
      // 通道号选项
      Tdhoptions: [
        { value: 0, label: "A1B1" },
        { value: 1, label: "A2B2" },
        { value: 2, label: "A3B3" },
        { value: 3, label: "A4B4" },
        { value: 4, label: "A5B5" },
        { value: 5, label: "A6B6" },
        { value: 6, label: "A7B7" },
        { value: 7, label: "A8B8" },
      ],
      // 电表状态
      dianbiaotype: [
        { id: 3, name: "手动开电" },
        { id: 4, name: "手动关电" },
        { id: 5, name: "欠费断电" },
        { id: 6, name: "定时关电" },
        { id: 2, name: "正常" },
        { id: 100, name: "通讯失败" },
      ],
    };
  },
  computed: {
    /** 根据 showTimeColumns 决定显示哪些条件列 */
    filteredConditionalColumns() {
      return this.showTimeColumns ? this.conditionalColumns : [];
    },
    ...mapState({
      user: (state) => state.user,
    }),
    /** 根据 form.type 查找对应的 type 值 */
    currentType() {
      const selectedOption = this.dialtype.find(
        (item) => item.id === this.form.type
      );
      return selectedOption ? selectedOption.type : null;
    },
  },

  created() {
    this.getList();
    this.deptTreeroom();
    this.fetchGatewayList();
    if (this.form.type !== null) {
      this.form.type = this.form.type;
    }
  },

  mounted() {
    this.fetchUserInfo();
    this.xgdid = this.$route.query.id;
    this.checkAndOpen();
  },

  watch: {
    // 监听$route变化
    "$route.query.id"(newId) {
      this.xgdid = newId || null;
      this.checkAndOpen();
    },
    // 监听 form.type 初始化值
    "form.type": function (newType) {},
    // 监听所有路由参数变化
    "$route.query": {
      immediate: true,
      handler(newQuery) {
        if (Object.keys(newQuery).length === 0) return;
        // 转换参数格式
        const processedParams = this.processRouteParams(newQuery);
        // 合并参数（保留原有非冲突参数）
        this.queryParams = {
          ...this.queryParams,
          ...processedParams,
        };
        this.getList();
        // 清除路由参数（保留编辑参数）
        this.cleanFilterParams(newQuery);
      },
    },
  },

  methods: {
    /** 路由参数预处理 */
    processRouteParams(query) {
      const params = { ...query };
      // 处理数组类型参数（build字段）
      if (params.build) {
        params.build = Array.isArray(params.build)
          ? params.build.map(Number)
          : [Number(params.build)];
      }
      // 转换数字类型参数
      const numberFields = ["gateway", "type", "statue", "pageNum", "pageSize"];
      numberFields.forEach((key) => {
        if (params[key]) params[key] = Number(params[key]);
      });
      // 处理日期参数（示例）
      if (params.tongxtime) {
        params.tongxtime = new Date(params.tongxtime);
      }
      return params;
    },
    /** 清除筛选参数 */
    cleanFilterParams(originalQuery) {
      const paramsToClean = Object.keys(originalQuery).filter(
        (key) => key !== "id" // 保留编辑参数
      );
      const query = { ...this.$route.query };
      paramsToClean.forEach((key) => delete query[key]);
      // 避免空参数残留
      if (Object.keys(query).length !== Object.keys(this.$route.query).length) {
        this.$router.replace({ query });
      }
    },
    /** 检查并打开弹出层的逻辑 */
    checkAndOpen() {
      if (this.xgdid) {
        this.handleUpdate({ id: this.xgdid });
        this.open = true;
      }
    },

    // 用户信息
    fetchUserInfo() {
      this.$store
        .dispatch("GetInfo")
        .then(() => {
          this.alone = this.user.alone;
          this.alonelist = this.user.alonelist;
          this.dialtype = this.user.dialtype;
        })
        .catch((error) => {
          console.error("获取用户信息失败:", error);
        });
    },
    /** 房间树结构 */
    deptTreeroom() {
      deptTreeSelectroom().then((response) => {
        this.deptOptionsroom = response.data;
      });
    },

    /** 采集器列表 */
    fetchGatewayList() {
      seleGatlist().then((response) => {
        this.gatewayList = response.data;
      });
    },
    /** 查询电列表 */
    getList() {
      // console.log("请求参数：", JSON.parse(JSON.stringify(this.queryParams))); // 深度拷贝打印
      this.loading = true;
      listAmmeter(this.queryParams).then((response) => {
        this.ammeterList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.$router.replace({ query: null }).catch(() => {});
      this.reset();
    },
    Plcancel() {
      this.open2 = false;
      // 自动清除验证痕迹
      this.$nextTick(() => {
        this.$refs.plxgform?.clearValidate();
        this.$refs.xfcsform?.clearValidate();
      });
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        ip: null,
        type: null,
        gateway: null,
        tdh: null,
        dbh: null,
        dyb: null,
        beilv: null,
        statue: null,
        statue2: null,
        build: null,
        dshuxing: null,
        dshuxing1: null,
        dshuxing12: null,
        danjia: null,
        danjiaj: null,
        danjiaf: null,
        danjiap: null,
        danjiag: null,
        duandian: null,
        ddje: null,
        xingzhi: null,
        weizhi: null,
        beizhu: null,
        usetime: null,
        dbds: null,
        dbdsj: null,
        dbdsf: null,
        dbdsp: null,
        dbdsg: null,
        alone: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.queryParams.tongxtime) {
        // 将Date对象转换为yyyy-MM-dd HH:mm:ss格式
        const formattedTime = this.parseTime(
          this.queryParams.tongxtime,
          "{y}-{m}-{d} {h}:{i}:{s}"
        );
        this.queryParams = {
          ...this.queryParams,
          tongxtime: formattedTime,
        };
      }
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        ...this.queryParams, // 保留分页参数
        pageNum: 1,
        name: null,
        gateway: null,
        type: null,
        tdh: null,
        dbh: null,
        statue: null,
        build: [],
        tongxtime: null,
        zhmoney1: null,
        zhmoney2: null,
        txradio: null,
      };
      this.$nextTick(() => {
        this.$refs.queryForm?.clearValidate();
        if (this.$refs.treeselect) {
          this.$refs.treeselect.setValue(null);
        }
      });
      // this.resetForm("queryForm");
      this.$router.replace({ query: {} }).catch(() => {});
      // this.handleQuery();
      this.getList();
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
      this.title = "添加电";
      this.selectedType = "";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.isEdit = true;
      const id = row.id || this.ids || this.xgdid;
      getAmmeter(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改电";
        const selectedOption2 = this.dialtype.find(
          (item) => item.id === response.data.type
        );
        if (selectedOption2) {
          this.selectedType = selectedOption2.type;
        }
      });
    },
    /** 提交按钮 */
    submitForm() {
      if (this.form.build < 1000000) {
        this.$modal.msgError("请选择正确的房间");
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            updateAmmeter(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
              this.$router.replace({ query: null }).catch(() => {});
            });
          } else {
            addAmmeter(this.form).then((response) => {
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
        .confirm('是否确认删除电编号为"' + ids + '"的数据项？')
        .then(function () {
          return delAmmeter(ids);
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
        "system/ammeter/export",
        {
          ...this.queryParams,
        },
        `ammeter_${new Date().getTime()}.xlsx`
      );
    },
    /** 批量修改按钮 */
    PlhandleUpdate() {
      this.dialogType = "batchEdit";
      // 重置批量修改表单
      this.plxgform = {
        gateway: null,
        type: null,
        tdh: null,
        danjia: null,
        duandian: null,
      };
      this.open2 = true;
      this.title = "批量修改";
    },

    /** 下发参数按钮操作 */
    XfcshandleUpdate() {
      this.dialogType = "sendParams";
      // 重置下发参数表单
      this.xfcsform = {
        sdkd: null,
        sdgd: null,
        jcsd: null,
        ljcb: null,
        tbdj: null,
      };
      this.open2 = true;
      this.title = "下发参数";
    },

    /** 统一提交处理 */
    handleDialogSubmit() {
      if (this.dialogType === "batchEdit") {
        this.$refs.plxgform.validate((valid) => {
          if (valid) this.handleBatchSubmit();
        });
      } else {
        this.$refs.xfcsform.validate((valid) => {
          if (valid) this.handleSendSubmit();
        });
      }
    },
    /** 批量修改提交 */
    handleBatchSubmit() {
      // 直接提交不再二次确认
      this.$refs["plxgform"].validate((valid) => {
        if (valid) {
          // 直接提交不再二次确认
          const mockData = {
            // ids: this.ids.length ? this.ids : undefined,
            data: { ...this.plxgform },
          };

          console.log("最终提交数据:", mockData);

          // 模拟提交过程
          this.loading = true;
          setTimeout(() => {
            // 计算实际影响数量
            // const affectCount = this.ids.length || this.total;

            this.loading = false;
            this.open2 = false;
            this.$modal.msgSuccess(`成功修改数据`);
            this.ids = [];
          }, 100);
        }
      });
    },
    /** 下发参数提交 */
    handleSendSubmit() {
      const params = {
        params: { ...this.xfcsform },
      };
      console.log("下发参数:", params);
      // 模拟提交过程
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.open2 = false;
        this.$modal.msgSuccess("模拟成功下发参数");
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.ammeter-dialog-form {
  display: flex;
  justify-content: space-around;
  height: 620px;
  overflow: auto;

  .adf-right,
  .adf-left {
    width: 40%;
    padding-right: 20px;
  }
}

.danjia-box {
  display: flex;
}

.vue-treeselect__control {
  min-height: 32px !important;
  max-height: 32px !important;
  line-height: 18px !important;
}
</style>
