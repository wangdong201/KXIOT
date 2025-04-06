<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      :inline="true"
    >
      <el-form-item label="日期范围" required prop="time">
        <el-date-picker
          v-model="ruleForm.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分组" prop="grouping">
        <el-select v-model="ruleForm.grouping" placeholder="">
          <el-option label="全部" value="allgrouping"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器" prop="collector">
        <el-select v-model="ruleForm.collector" placeholder="">
          <el-option label="全部" value="allcollector"></el-option>
          <el-option label="采集器一" value="cjq1"></el-option>
          <el-option label="采集器二" value="cjq2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户" prop="user">
        <el-select v-model="ruleForm.user" placeholder="">
          <el-option label="不指定" value="alluser"></el-option>
          <el-option label="用户一" value="user1"></el-option>
          <el-option label="用户二" value="user2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能选择" prop="funcselect">
        <el-select v-model="ruleForm.funcselect" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="包含起始日期前一条数据" name="type"></el-checkbox>
          <el-checkbox label="忽略互感器变比" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >查询</el-button
        >
        <el-button @click="resetForm('ruleForm')">统计</el-button>
        <el-button type="success">导出查询数据到EXCEL</el-button>
        <el-button type="success">导出统计数据到EXCEL</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        time: [],
        grouping: "allgrouping",
        collector: "allcollector",
        user: "alluser",
        funcselect: [],
        type: [],
      },
      rules: {
        time: [{ required: true, message: "请选择日期范围", trigger: "blur" }],
        funcselect: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个功能",
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          value: "选项1",
          label: "正向有功总电能",
        },
        {
          value: "选项2",
          label: "剩余金额",
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>
