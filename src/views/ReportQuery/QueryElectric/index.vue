<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="电量数据查询" name="first">
        <yddataquery />
      </el-tab-pane>
      <el-tab-pane label="当前状态数据" name="second">
        <statedata />
      </el-tab-pane>
      <el-tab-pane label="余额报警查询" name="third">
        <balancealert />
      </el-tab-pane>
      <el-tab-pane label="最大需量报表" name="fourth">
        <xlreportform />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import yddataquery from "./components/yddataquery.vue";
import statedata from "./components/statedata.vue";
import balancealert from "./components/balancealert.vue";
import xlreportform from "./components/xlreportform.vue";
export default {
  name: "QueryElectric",
  components: {
    yddataquery,
    statedata,
    balancealert,
    xlreportform,
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
