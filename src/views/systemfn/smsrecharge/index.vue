<template>
  <div class="app-container">
    <div class="title">短信在线充值</div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="right"
      style="width: 700px"
    >
      <el-form-item label="区域名称:">飞飞飞</el-form-item>
      <el-form-item label="当前剩余:"><span>2</span>条</el-form-item>
      <el-form-item label="充值金额:">
        <el-input
          v-model="form.smsnum"
          placeholder="请输入充值金额(每条0.1元)"
          style="width: 200px"
        ></el-input>
        <span style="padding: 0 10px"
          >元 (短信数量: {{ effectiveSmsCount }}条)</span
        >
        <!-- 充值金额 -->
        <div class="invest_money">
          <div
            v-for="item in rechargeOptions"
            :key="item.amount"
            @click="updateSmsnum(item.amount, item.bonusRate)"
            class="invest_item"
          >
            <span>¥{{ item.amount }}</span>
            <span>{{ item.smsCount }}条</span>
            <span>{{ item.bonusText }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="支付方式:">
        <el-radio-group v-model="form.payway">
          <el-radio label="微信支付"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即付款</el-button>
      </el-form-item>
    </el-form>
    <div class="notice">
      <p>通知短信每条0.1元，暂不支持退款</p>
      <p>购买的短信用于发送剩余金额报警、充值成功通知等,发送失败不扣费。</p>
      <p>
        短信通知功能需<span style="color: red"
          >打开定时抄表，设置一级，二级报警值后生效
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmsRecharge",
  components: {},
  data() {
    return {
      form: {
        smsnum: null, // 充值金额
        payway: "微信支付", // 支付方式
      },
      bonusRate: 0, // 初始化赠送比例为0
      rechargeOptions: [
        { amount: 100, bonusRate: 0, bonusText: "0.1元/条" },
        { amount: 500, bonusRate: 0.05, bonusText: "赠 5%" },
        { amount: 1000, bonusRate: 0.1, bonusText: "赠 10%" },
        { amount: 5000, bonusRate: 0.15, bonusText: "赠 15%" },
      ],
    };
  },
  computed: {
    effectiveSmsCount() {
      // 计算有效短信数量
      return Math.floor(
        this.form.smsnum / 0.1 + (this.form.smsnum * this.bonusRate) / 0.1
      );
    },
  },
  methods: {
    onSubmit() {
      // 提交表单
      console.log("submit!");
    },
    updateSmsnum(amount, bonusRate) {
      // 更新充值金额和赠送比例
      this.form.smsnum = amount;
      this.bonusRate = bonusRate;
    },
    calculateSmsCount(amount, bonusRate) {
      // 计算短信数量
      return amount + amount * bonusRate;
    },
  },
  created() {
    // 初始化时计算每个充值选项的短信数量
    this.rechargeOptions.forEach((option) => {
      option.smsCount = Math.floor(
        this.calculateSmsCount(option.amount, option.bonusRate) / 0.1
      );
    });
  },
};
</script>

<style scoped lang="scss">
.title {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
}

.invest_money {
  display: flex;
}

.invest_item {
  border: 1px solid #ccc;
  width: 100px;
  text-align: center;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 20px;
  margin-top: 10px;
  margin-right: 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    transform: scale(1.05); /* 放大效果 */
  }
}

.notice {
  color: #888;
  line-height: 25px;
  font-size: 14px;
}
</style>
