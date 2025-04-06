<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="报警用量监测管理" name="first">
        <Alarmmonitoring />
      </el-tab-pane>
      <el-tab-pane label="所有报警用量参数设置" name="second">
        <Allalarmparameters />
      </el-tab-pane>
      <el-tab-pane label="添加报警用量参数设置" name="third">
        <Addalarmparameters />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Alarmmonitoring from "./components/Alarmmonitoring.vue";
import Addalarmparameters from "./components/Addalarmparameters.vue";
import Allalarmparameters from "./components/Allalarmparameters.vue";
export default {
  name: "AlarmUsage",
  components: {
    Alarmmonitoring,
    Addalarmparameters,
    Allalarmparameters,
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
