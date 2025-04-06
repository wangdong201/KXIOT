<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.region" placeholder="分组">
          <el-option label="全部" value="allfz"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设置名称">
        <el-input v-model="form.name" placeholder="请输入搜索关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table :data="tableData"  style="width: 100%" border>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="分组" prop="grouping"></el-table-column>
        <el-table-column label="定时设置名称" prop="name"></el-table-column>
        <el-table-column label="功能项" prop="func">
          <template slot-scope="scope">
            <div v-for="(value, key) in scope.row.func" :key="key">
              {{ value }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="超时重抄次数" prop="retry"></el-table-column>
        <el-table-column label="定时表达式" prop="cron"></el-table-column>
        <el-table-column label="定时描述" prop="desc"></el-table-column>
        <el-table-column
          label="下次运行时间"
          prop="nextRunTime"
        ></el-table-column>
        <el-table-column label="全局定时" prop="global"></el-table-column>
        <el-table-column label="使用情况" prop="status"></el-table-column>
        <el-table-column label="操作" prop="operation">
          <template>
            <el-button type="text" size="mini" @click="dialogVisible = true"
              >定时配置</el-button
            >
            <el-button type="text" size="mini" @click="dialogVisible2 = true"
              >编辑</el-button
            >
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 定时配置弹窗 -->
    <div>
      <el-dialog
        title="配置电能表定时设置"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose"
      >
        <div class="table-container2">
          <el-form ref="formTime" :model="formTime" :inline="true">
            <el-form-item label="分组">
              <el-select v-model="formTime.region" placeholder="分组">
                <el-option label="全部" value="allfz"></el-option>
                <el-option label="分组一" value="fz1"></el-option>
                <el-option label="分组二" value="fz2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电表类型">
              <el-select v-model="formTime.type" placeholder="">
                <el-option label="全部" value="allType"></el-option>
                <el-option label="类型一" value="t1"></el-option>
                <el-option label="类型二" value="t2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采集器">
              <el-select v-model="formTime.collector" placeholder="">
                <el-option label="全部" value="allcjq"></el-option>
                <el-option label="采集器一" value="cjq1"></el-option>
                <el-option label="采集器二" value="cjq2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-radio-group v-model="formTime.showType">
                <el-radio label="仅显示未配置的表"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="电表地址：">
              <el-input
                v-model="formTime.address"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户姓名：">
              <el-input
                v-model="formTime.userName"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="电表备注：">
              <el-input
                v-model="formTime.timedesc"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit2">搜索</el-button>
            </el-form-item>
          </el-form>

          <div class="sz-radio">
            <div class="sz-radio-item">
              <span>定时设置名:</span>
              <span style="color: red">张大炮111</span>
            </div>
            <div>
              <el-radio v-model="radio" label="1"
                >表示该表使用该定时设置</el-radio
              >
              <el-radio v-model="radio" label="2"
                >表示该表取消该定时设置</el-radio
              >
            </div>
          </div>

          <div>
            <el-button type="primary">保存配置</el-button>
            <el-button type="primary" @click="selectAll">全选</el-button>
            <el-button type="primary" @click="deselectAll">全不选</el-button>
          </div>

          <div style="margin-top: 20px">
            <el-table
              :data="tableData2"
              style="width: 100%"
              border
              ref="tableRef"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="分组" prop="grouping2"></el-table-column>
              <el-table-column
                label="采集器"
                prop="collector"
              ></el-table-column>
              <el-table-column label="状态" prop="status2"></el-table-column>
              <el-table-column
                label="通讯地址"
                prop="address2"
              ></el-table-column>
              <el-table-column label="用户" prop="userName2"></el-table-column>
              <el-table-column label="电表类型" prop="dbtype"></el-table-column>
              <el-table-column label="备注" prop="notes"></el-table-column>
              <el-table-column
                label="创建时间"
                prop="createTime"
              ></el-table-column>
              <el-table-column label="状态" prop="status3"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑弹窗 -->
    <div>
      <el-dialog
        title="编辑电能表定时设置"
        :visible.sync="dialogVisible2"
        width="90%"
        :before-close="handleClose2"
      >
        <div class="table-container2">
          <el-form
            :model="ElectricTaskForm"
            ref="ElectricTaskForm"
            :rules="rules"
            label-width="180px"
          >
            <el-form-item label="名称" prop="name">
              <el-input
                v-model="ElectricTaskForm.name"
                class="input-width"
              ></el-input>
            </el-form-item>
            <el-form-item label="分组">
              <el-select
                v-model="ElectricTaskForm.region"
                placeholder="请选择分组"
                class="input-width"
              >
                <el-option label="暂不分组" value="null"></el-option>
                <el-option label="分组一" value="fz1"></el-option>
                <el-option label="分组二" value="fz2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择设备" prop="device">
              <el-select
                v-model="ElectricTaskForm.device"
                placeholder="请选择设备"
                class="input-width"
              >
                <el-option label="电能表" value="ele"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择功能" prop="func">
              <el-select
                v-model="ElectricTaskForm.func"
                multiple
                placeholder="请选择"
                class="input-width"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="超时自动重抄次数(0-2)" prop="num">
              <el-input-number
                v-model="ElectricTaskForm.num"
                controls-position="right"
                @change="handleChange"
                :min="0"
                :max="2"
                class="input-width"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="定时设置表达式" prop="cron">
              <el-input
                v-model="ElectricTaskForm.cron"
                class="input-width"
                placeholder="请输入定时设置表达式"
                :disabled="true"
              ></el-input>
              <span class="time-text">设置定时时间</span>
            </el-form-item>
            <el-form-item label="设置描述" prop="desc">
              <el-input
                type="textarea"
                v-model="ElectricTaskForm.desc"
                :disabled="true"
                class="input-width"
                placeholder="请输入设置描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="使用次数">
              <template>
                <div>2</div>
              </template>
            </el-form-item>
            <el-form-item label="下次执行时间" prop="nextTime">
              <el-date-picker
                v-model="ElectricTaskForm.nextTime"
                type="datetime"
                placeholder="选择日期时间"
                :disabled="true"
                class="input-width"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="应用到该分组所有设备" prop="allDevice">
              <el-radio-group v-model="ElectricTaskForm.allDevice">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >添加</el-button
              >
              <el-button @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
          </el-form>
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
      radio: "1",
      form: {
        region: "allfz",
        name: "",
      },
      formTime: {
        region: "allfz",
        type: "allType",
        collector: "allcjq",
        address: "",
        showType: "",
        userName: "",
        timedesc: "",
      },
      tableData: [
        {
          id: 1,
          grouping: "分组一",
          name: "定时设置名称1",
          func: { fn: "功能项1", fn2: "功能项2", fn3: "功能项3" },
          retry: 3,
          cron: "0 0/1 * * * ?",
          desc: "定时描述1",
          nextRunTime: "2021-08-01 10:00:00",
          global: "是",
          status: "2",
        },
      ],
      tableData2: Array.from({ length: 10 }, () => ({
        grouping2: "分组一",
        collector: "采集器一",
        status2: "已配置",
        address2: "123456789",
        userName2: "张大炮",
        dbtype: "类型一",
        notes: "备注1",
        createTime: "2021-08-01 10:00:00",
        status3: "正常",
      })),
      ElectricTaskForm: {
        name: "",
        region: "null",
        device: "ele",
        func: [],
        num: 0,
        cron: "",
        desc: "",
        nextTime: "",
        allDevice: "否",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        device: [{ required: true, message: "请选择设备", trigger: "blur" }],
        func: [{ required: true, message: "请选择功能", trigger: "blur" }],
        num: [
          {
            required: true,
            message: "请输入超时自动重抄次数",
            trigger: "blur",
          },
        ],
        cron: [
          { required: true, message: "请输入定时设置表达式", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请输入设置描述", trigger: "blur" }],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log(111);
    },
    onSubmit2() {},
    handleClose(done) {
      done();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose2(done) {
      done();
    },
    handleChange(value) {
      console.log(value);
    },
    selectAll() {
      this.selectedRows = this.tableData2.slice(); // 复制所有行数据
      this.$refs.tableRef.clearSelection(); // 清除当前选择
      this.selectedRows.forEach((row) => {
        this.$refs.tableRef.toggleRowSelection(row, true); // 全选
      });
    },
    deselectAll() {
      this.selectedRows = []; // 清空选中的行
      this.$refs.tableRef.clearSelection(); // 清除当前选择
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection; // 更新选中的行
    },
  },
};
</script>
<style scoped lang="scss">
.table-container {
  margin-top: 20px;
}

.table-container2 {
  height: 80vh;
  overflow-y: auto;
}

.sz-radio {
  display: flex;
  margin: 15px 0;
}

.sz-radio-item {
  margin-right: 20px;
}

.input-width {
  width: 300px;
}

.time-text {
  color: #409eff;
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
