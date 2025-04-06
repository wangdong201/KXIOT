<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有采集器" name="first">
        <Allcollectors />
      </el-tab-pane>
      <el-tab-pane label="在线采集器" name="second">
        <Onlinecollector />
      </el-tab-pane>
      <el-tab-pane label="离线采集器" name="third">
        <Offlinecollector />
      </el-tab-pane>
      <el-tab-pane label="连接记录" name="fourth">
        <ConnectionRecord />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Allcollectors from "./components/Allcollectors.vue";
import Onlinecollector from "./components/Onlinecollector.vue";
import Offlinecollector from "./components/Offlinecollector.vue";
import ConnectionRecord from "./components/ConnectionRecord.vue";
export default {
  name: "CollectorManagement",

  components: {
    Allcollectors,
    Onlinecollector,
    Offlinecollector,
    ConnectionRecord,
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
