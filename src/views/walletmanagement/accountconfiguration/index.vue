<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="账户名称">
        <template>
          <div>张大炮</div>
        </template>
      </el-form-item>
      <el-form-item label="结算微信商户号">
        <template>
          <div>智慧能源</div>
        </template>
      </el-form-item>
      <el-form-item label="当前余额">
        <template>
          <div>
            <span style="font-size: 40px; font-weight: bold">0.01</span>元
            <span>可提现金额</span>
            <span>(0.01)</span>元
            <el-button>立即手动提现</el-button>
          </div>
          <div class="fontc">提现免手续费,单笔最大提现金额5万元,T+1到账</div>
        </template>
      </el-form-item>
      <el-form-item label="今日提现预计到账日">
        <template>
          <div>{{ nextDay }}</div>
        </template>
      </el-form-item>
      <el-form-item label="结算钱包类型" prop="region">
        <el-select v-model="form.region" placeholder="请选择结算钱包类型">
          <el-option label="微信零钱方式已关闭" value="wxpay"></el-option>
          <el-option
            label="银行卡(已配置0个有效收款钱包)"
            value="bankcard"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算方式" prop="settlement">
        <el-radio-group v-model="form.settlement">
          <el-radio label="实时结算"></el-radio>
          <el-radio label="每天自动结算一次"></el-radio>
          <el-radio label="指定结算日"></el-radio>
          <el-radio label="手动结算"></el-radio>
        </el-radio-group>
        <template>
          <div class="fontc">
            每日结算:每日6时自动结算前一天收款一次性转入收款账户,(可减少银行卡方式手续费)
          </div>
          <div class="fontc">
            指定结算日：每月固定日期结算(可减少银行卡方式手续费)
          </div>
          <div class="fontc">手动结算：手动通过后台发起转账结算</div>
          <div class="fontred">
            注意：以上所有结算方式达到最大结算金额时无条件结算一次
          </div>
        </template>
      </el-form-item>
      <el-form-item label="最大结算金额" prop="max_settlement_amount">
        <el-slider
          v-model="form.max_settlement_amount"
          :min="1000"
          :max="50000"
          :step="100"
          show-input
          style="width: 500px"
        >
        </el-slider>
      </el-form-item>
      <el-form-item label="账户保留金额" prop="blamount">
        <el-input v-model="form.blamount" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="客服/报修电话" prop="phonenumber">
        <el-input v-model="form.phonenumber" style="width: 300px"></el-input>
        <template>
          <div class="fontb">
            开通在线支付功能，请完善客服电话，用于故障报修，开票，退款等售后问题
          </div>
          <div class="fontb">
            长时间无法联系商家可能导致线上支付权限被关闭或支付限额
          </div>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >保存配置</el-button
        >
        <el-button @click="resetForm('form')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nextDay: this.getNextDay(),
      form: {
        region: "",
        settlement: "",
        max_settlement_amount: 5000,
        blamount: 0,
        phonenumber: "",
      },
    };
  },
  methods: {
    getNextDay() {
      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);

      const year = nextDay.getFullYear();
      const month = String(nextDay.getMonth() + 1).padStart(2, "0");
      const day = String(nextDay.getDate()).padStart(2, "0");
      const hours = "23";
      const minutes = "59";

      return `${year}年${month}月${day}日${hours}:${minutes}前`;
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
  },
  mounted() {
    this.nextDay = this.getNextDay();
  },
};
</script>

<style lang="scss" scoped>
.fontc {
  color: #888;
}

.fontred {
  color: red;
}

.fontb {
  color: #bbb;
}
</style>
