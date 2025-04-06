<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="钱包列表" name="qlist">
        <walletlist></walletlist>
      </el-tab-pane>
      <el-tab-pane label="添加微信钱包" name="wxqb">
        <wxwallet></wxwallet>
      </el-tab-pane>
      <el-tab-pane label="添加银行卡钱包" name="yhkqb">
        <cardwallet></cardwallet>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import walletlist from "./components/walletlist.vue";
import wxwallet from "./components/wxwallet.vue";
import cardwallet from "./components/cardwallet.vue";

export default {
  name: "Walletlist",
  components: {
    walletlist,
    wxwallet,
    cardwallet,
  },
  data() {
    return {
      activeName:
        localStorage.getItem(`activeName-${this.$options.name}`) || "qlist",
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

<style lang="scss" scoped></style>
