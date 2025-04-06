<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有电能表" name="first">
        <allelectric />
      </el-tab-pane>
      <el-tab-pane label="操作记录" name="second">
        <operationrecord />
      </el-tab-pane>
      <el-tab-pane label="删表记录" name="third">
        <deleterecords />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import allelectric from "./components/allelectric.vue";
import operationrecord from "./components/operationrecord.vue";
import deleterecords from "./components/deleterecords.vue";
export default {
  name: "ElectricityMeterManagement",

  components: {
    allelectric,
    operationrecord,
    deleterecords,
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
