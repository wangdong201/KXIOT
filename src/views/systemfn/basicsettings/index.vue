<template>
  <div class="app-container">
    <div class="title">系统基本设置</div>
    <div class="form_container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-position="right"
        label-width="200px"
        style="width: 700px;"
      >
        <el-form-item label="系统名称(左上角显示名)" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称(收据抬头)" prop="corporateName">
          <el-input v-model="ruleForm.corporateName"></el-input>
        </el-form-item>
        <el-form-item label="首充最低充值金额限制" prop="zdMoney">
          <el-input
            v-model="ruleForm.zdMoney"
            placeholder="小于0或者不填表示无限制"
          ></el-input>
        </el-form-item>
        <el-form-item label="后续最低充值金额限制" prop="hxzdMoney">
          <el-input
            v-model="ruleForm.hxzdMoney"
            placeholder="小于0或者不填表示无限制"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大金额充值限制" prop="maxMoney">
          <el-input
            v-model="ruleForm.maxMoney"
            placeholder="小于0或者不填表示无限制"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机App拉合闸/开关阀" prop="appSwitch">
          <el-radio-group v-model="ruleForm.appSwitch">
            <el-radio label="不允许"></el-radio>
            <el-radio label="允许"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报警短信发送频率" prop="alarmSms">
          <el-radio-group v-model="ruleForm.alarmSms">
            <el-radio label="每个报警级别仅发送一次"></el-radio>
            <el-radio label="达到报警级别每天发送一次"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动保存心跳数据" prop="autoSave">
          <el-radio-group v-model="ruleForm.autoSave">
            <el-radio label="不保存"></el-radio>
            <el-radio label="保存"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客服/报修电话" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
          <span
            >开通在线支付功能,请完善客服电话，用于故障报修,开票,退款等售后问题长时间无法联系商家可能导致线上支付权限被关闭或支付限额</span
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
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
        name: "",
        corporateName: "",
        zdMoney: "",
        hxzdMoney: "",
        maxMoney: "",
        appSwitch: "",
        alarmSms: "",
        autoSave: "",
        tel: "",
      },
      rules: {
        name: [{ required: true, message: "请输入系统名称", trigger: "blur" }],
        corporateName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
}
.form_container {
  margin-top: 20px;
}
</style>
