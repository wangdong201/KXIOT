<template>
  <div class="app-container">
    <div class="title">远程预付费报表</div>
    <div class="content">
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
        <el-form-item label="操作状态：" prop="czstatus">
          <el-select v-model="ruleForm.czstatus" placeholder="">
            <el-option label="全部" value="allstatus"></el-option>
            <el-option label="操作已完成" value="cz1"></el-option>
            <el-option label="操作未完成" value="cz2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户" prop="user">
          <el-select v-model="ruleForm.user" placeholder="">
            <el-option label="不指定" value="alluser"></el-option>
            <el-option label="用户一" value="user1"></el-option>
            <el-option label="用户二" value="user2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合并方式：" prop="merge">
          <el-select v-model="ruleForm.merge" placeholder="">
            <el-option label="按电表" value="db"></el-option>
            <el-option label="不合并" value="nomerge"></el-option>
            <el-option label="按操作员" value="czy"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button
          >
          <el-button type="primary">导出到EXCEL</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        czstatus: "allstatus",
        user: "alluser",
        merge: "db",
      },
      rules: {
        time: [
          { required: true, message: "请选择日期范围", trigger: "change" },
        ],
        czstatus: [
          { required: true, message: "请选择操作状态", trigger: "change" },
        ],
      },
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
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
</style>
