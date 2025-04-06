<template>
  <div>
    <!-- 开户表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="采集器编号">
        <template>
          <div>
            <span>123456489</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="地址">
        <template>
          <div>
            <span>123456489</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="电表状态">
        <template>
          <div>
            <span>未开户</span>
          </div>
        </template>
      </el-form-item>

      <el-form-item label="开户金额" prop="amount">
        <el-input v-model="ruleForm.amount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="开户备注" prop="remark">
        <el-input
          v-model="ruleForm.remark"
          class="input-width"
          placeholder="开户备注,最多50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="总用电量" prop="totalPower">
        <el-input v-model="ruleForm.totalPower" class="input-width"></el-input>
        <template>
          <span> kWh </span>
        </template>
      </el-form-item>
      <el-form-item label="用电量同步时间" prop="syncTime">
        <el-input v-model="ruleForm.syncTime" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="剩余金额" prop="remainingamount">
        <el-input
          v-model="ruleForm.remainingamount"
          class="input-width"
        ></el-input>
        <template>
          <span> 元 </span>
        </template>
      </el-form-item>
      <el-form-item label="剩余金额同步时间" prop="amountsyncTime">
        <el-input
          v-model="ruleForm.amountsyncTime"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item label="总充值金额" prop="totalRechargeAmount">
        <el-input
          v-model="ruleForm.totalRechargeAmount"
          class="input-width"
        ></el-input>
        <template>
          <span> 元 </span>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">开户</el-button>
        <el-button type="">返回</el-button>
        <el-button type="">刷新</el-button>
        <el-button type="primary">立即查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        amount: "0",
        remark: "",
        totalPower: "0.00",
        syncTime: "无",
        remainingamount: "0.00",
        amountsyncTime: "无",
        totalRechargeAmount: "0.00",
      },
      rules: {
        amount: [
          { required: true, message: "请输入开户金额", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入开户备注", trigger: "blur" },
          { max: 50, message: "最多50个字符", trigger: "blur" },
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

<style lang="scss" scoped>
.input-width {
  width: 250px;
}
</style>
