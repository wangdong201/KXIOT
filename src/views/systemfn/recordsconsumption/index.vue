<template>
  <div class="system_container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统内消费记录" name="first">
        <!-- 系统内消费记录 -->
        <ConsumptionRecords />
      </el-tab-pane>
      <el-tab-pane label="系统内消费发票记录" name="second"
        ><ConsumptionInvoice
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConsumptionRecords from "./components/records.vue";
import ConsumptionInvoice from "./components/invoice.vue";
export default {
  name: "RecordsConsumption",
  components: {
    ConsumptionRecords,
    ConsumptionInvoice,
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

<style scoped lang="scss">
.system_container {
  padding: 10px 20px;
  height: 91vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  /*Firefox*/
  scrollbar-width: none;

  /*IE, Edge*/
  -ms-overflow-style: none;
}
</style>
