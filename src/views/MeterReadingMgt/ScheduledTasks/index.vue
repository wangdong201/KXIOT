<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="定时任务管理" name="first">
        <timingtask />
      </el-tab-pane>
      <el-tab-pane label="所有定时设置" name="second">
        <alltask />
      </el-tab-pane>
      <el-tab-pane label="添加定时设置" name="three">
        <addtask />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import timingtask from "./components/timingtask.vue";
import alltask from "./components/alltask.vue";
import addtask from "./components/addtask.vue";
export default {
  name: "scheduledTasks",
  components: {
    timingtask,
    alltask,
    addtask,
  },
  data() {
    return {
      activeName:
        localStorage.getItem(`activeName-${this.$options.name}`) || "first",
    };
  },
  computed: {},
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

<style scoped lang="scss"></style>
