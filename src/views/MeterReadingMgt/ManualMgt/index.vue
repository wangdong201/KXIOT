<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用电量" name="first">
        <PowerConsumption />
      </el-tab-pane>
      <el-tab-pane label="APP自助查询" name="second">
        <APPinquiry />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PowerConsumption from "./components/PowerConsumption.vue";
import APPinquiry from "./components/APPinquiry.vue";
export default {
  name: "ManualMgt",
  components: {
    PowerConsumption,
    APPinquiry,
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

<style lang="scss" scoped></style>
