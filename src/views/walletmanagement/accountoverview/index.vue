<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账户总览" name="zhoverview">
        <zhoverview></zhoverview>
      </el-tab-pane>

      <el-tab-pane label="资金变动日志" name="zjchange">
        <zjchange></zjchange>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import zhoverview from "./components/zhoverview.vue";
import zjchange from "./components/zjchange.vue";
export default {
  name: "WalletManagement",
  components: {
    zhoverview,
    zjchange,
  },
  data() {
    return {
      activeName:
        localStorage.getItem(`activeName-${this.$options.name}`) ||
        "zhoverview",
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
