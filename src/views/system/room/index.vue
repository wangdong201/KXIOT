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
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="建筑id" prop="build">
        <el-input
          v-model="queryParams.build"
          placeholder="请输入建筑id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="负责人" prop="leader">
        <el-input
          v-model="queryParams.leader"
          placeholder="请输入负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系电话"
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
          v-hasPermi="['system:room:add']"
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
          v-hasPermi="['system:room:edit']"
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
          v-hasPermi="['system:room:remove']"
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
          v-hasPermi="['system:room:export']"
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
      :data="roomList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="建筑id" align="center" prop="build" />
      <el-table-column label="显示顺序" align="center" prop="orderNum" />
      <el-table-column label="负责人" align="center" prop="leader" />
      <el-table-column label="联系电话" align="center" prop="phone" />
      <el-table-column label="是否允许缴费" align="center" prop="jiaofei" />
      <el-table-column label="推送档位" align="center" prop="tuisong" />
      <el-table-column label="地址" align="center" prop="weizhi" />
      <el-table-column label="备注" align="center" prop="beizhu" />
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
            v-hasPermi="['system:room:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:room:remove']"
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

    <!-- 添加或修改房间对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="70%"
      append-to-body
      class="ammeter-dialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <div class="ammeter-dialog-form">
          <div class="adf-left">
            <el-form-item label="序号" prop="id">
              <el-input v-model="form.id" placeholder="请输入序号" />
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="建筑id" prop="build">
              <treeselect
                v-model="form.build"
                :options="deptOptions"
                :show-count="true"
                placeholder="请选择归属部门"
              />
            </el-form-item>
            <el-form-item label="显示顺序" prop="orderNum">
              <el-input v-model="form.orderNum" placeholder="请输入显示顺序" />
            </el-form-item>
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="form.leader" placeholder="请输入负责人" />
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </div>
          <div class="adf-right">
            <el-form-item label="是否允许缴费" prop="jiaofei">
              <el-radio-group v-model="form.jiaofei">
                <el-radio :label="1">否</el-radio>
                <el-radio :label="0">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="推送档位" prop="tuisong">
              <el-input v-model="form.tuisong" placeholder="请输入推送档位" />
            </el-form-item>
            <el-form-item label="地址" prop="weizhi">
              <el-input v-model="form.weizhi" placeholder="请输入地址" />
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listRoom,
  getRoom,
  delRoom,
  addRoom,
  updateRoom,
} from "@/api/system/room";

import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import { mapState } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Room",
  components: {
    Treeselect,
  },
  data() {
    return {
      // 独立用户数据
      alonelist: [],
      // 判断是否独立用户
      alone: "",
      // 新增修改判断
      isEdit: false,
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
      // 房间表格数据
      roomList: [],
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        type: null,
        build: null,
        orderNum: null,
        leader: null,
        phone: null,
        jiaofei: null,
        balance: null,
        subsidy: null,
        b1: null,
        waterzb: null,
        three: null,
        tuisong: null,
        weizhi: null,
        beizhu: null,
        alone: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    this.getList();
    this.getDeptTree();
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    /** 用户信息 */
    fetchUserInfo() {
      this.$store
        .dispatch("GetInfo")
        .then(() => {
          this.alone = this.user.alone;
          this.alonelist = this.user.alonelist;
          // this.dialtype = this.user.dialtype;
        })
        .catch((error) => {
          console.error("获取用户信息失败:", error);
        });
    },
    /** 查询房间列表 */
    getList() {
      this.loading = true;
      listRoom(this.queryParams).then((response) => {
        this.roomList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getDeptTree() {
      deptTreeSelect().then((response) => {
        this.deptOptions = response.data;
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
        type: null,
        build: null,
        orderNum: null,
        leader: null,
        phone: null,
        jiaofei: null,
        balance: null,
        subsidy: null,
        b1: null,
        waterzb: null,
        three: null,
        tuisong: null,
        weizhi: null,
        beizhu: null,
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
      this.title = "添加房间";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.isEdit = true;
      const id = row.id || this.ids;
      getRoom(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改房间";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            updateRoom(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRoom(this.form).then((response) => {
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
        .confirm('是否确认删除房间编号为"' + ids + '"的数据项？')
        .then(function () {
          return delRoom(ids);
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
        "system/room/export",
        {
          ...this.queryParams,
        },
        `room_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>

<style lang="scss">
.ammeter-dialog-form {
  display: flex;
  justify-content: space-around;
  min-height: 420px;
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
</style>
