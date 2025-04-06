<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有批量任务" name="first">
        <el-form ref="form" :model="form" :inline="true">
          <el-form-item label="分组">
            <el-select v-model="form.group">
              <el-option label="全部" value="all"></el-option>
              <el-option label="分组一" value="fz1"></el-option>
              <el-option label="分组二" value="fz2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称">
            <el-input
              v-model="form.name"
              placeholder="请输入任务名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select v-model="form.type">
              <el-option label="全部类型" value="alltype"></el-option>
              <el-option label="类型一" value="type1"></el-option>
              <el-option label="类型二" value="type2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="default" @click="handleReset">清空</el-button>
          </el-form-item>
        </el-form>

        <!-- table -->
        <div style="margin-top: 20px">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="group" label="分组"></el-table-column>
            <el-table-column prop="name" label="任务名称"></el-table-column>
            <el-table-column prop="type" label="任务类型"></el-table-column>
            <el-table-column
              prop="basic_params"
              label="基本参数"
            ></el-table-column>
            <el-table-column prop="notes" label="备注"></el-table-column>
            <el-table-column prop="createname" label="创建者"></el-table-column>
            <el-table-column
              prop="devicesnum"
              label="设备数量"
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
            ></el-table-column>
            <el-table-column prop="operate" label="操作"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="创建批量任务" name="second">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分组" prop="group2">
            <el-select v-model="ruleForm.group2" class="input-width">
              <el-option label="暂不分组" value="allNo"></el-option>
              <el-option label="分组一" value="fz1"></el-option>
              <el-option label="分组二" value="fz2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务名称" prop="name2">
            <el-input
              v-model="ruleForm.name2"
              placeholder="请输入任务名称"
              class="input-width"
            ></el-input>
          </el-form-item>

          <el-form-item label="任务类型" prop="type2">
            <el-select v-model="ruleForm.type2" class="input-width">
              <el-option label="全部类型" value="alltype"></el-option>
              <el-option label="类型一" value="type1"></el-option>
              <el-option label="类型二" value="type2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model="ruleForm.notes"
              class="input-width"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              添加
            </el-button>
            <el-button>返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "BatchTasks",
  components: {},
  data() {
    return {
      activeName:
        localStorage.getItem(`activeName-${this.$options.name}`) || "first",
      form: {
        group: "all",
        name: "",
        type: "alltype",
      },
      ruleForm: {
        group2: "allNo",
        name2: "",
        type2: "alltype",
        notes: "",
      },
      tableData: [],
      rules: {
        group2: [{ required: true, message: "请选择分组", trigger: "blur" }],
        name2: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        type2: [{ required: true, message: "请选择任务类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    handleSearch() {
      console.log(this.form);
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.form = {
        group: "",
        name: "",
        type: "",
      };
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
  },
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

<style lang="scss" scoped>
.input-width {
  width: 300px;
}
</style>
