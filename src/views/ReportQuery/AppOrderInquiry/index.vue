<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="支付宝订单" name="first">
        <alipayorder />
      </el-tab-pane>
      <el-tab-pane label="微信支付订单" name="second">
        <WeChatorder />
      </el-tab-pane>
      <el-tab-pane label="微信/银行卡支付订单" name="third">
        <WeChatbankcardorder />
      </el-tab-pane>
      <el-tab-pane label="APP支付统计" name="fourth">
        <APPpaymentstatistics :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane label="退款查询" name="fifth">
        <Refundinquiry />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import alipayorder from "./components/alipayorder.vue";
import WeChatorder from "./components/WeChatorder.vue";
import WeChatbankcardorder from "./components/WeChatbankcardorder.vue";
import APPpaymentstatistics from "./components/APPpaymentstatistics.vue";
import Refundinquiry from "./components/Refundinquiry.vue";
export default {
  name: "AppOrderInquiry",

  components: {
    alipayorder,
    WeChatorder,
    WeChatbankcardorder,
    APPpaymentstatistics,
    Refundinquiry,
  },
  data() {
    return {
      activeName:
        localStorage.getItem(`activeName-${this.$options.name}`) || "first",
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
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
