<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="短信查询" name="first">
        <SMSinquiry />
      </el-tab-pane>
      <el-tab-pane label="短信发送统计" name="second">
        <SMSstatistics />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SMSinquiry from "./components/SMSinquiry.vue";
import SMSstatistics from "./components/SMSstatistics.vue";
export default {
  name: "SMSInquiry",
  components: {
    SMSinquiry,
    SMSstatistics,
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
