<template>
  <div>
    <el-table
      :data="pagedTableData"
      height="590"
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
      >
      </el-table-column>
    </el-table>
    <Pagination
      :total="tableData.length"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="handlePagination"
    />
  </div>
</template>

<script>
export default {
  name: "DynamicTable",
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    pagedTableData() {
      if (!this.tableData || this.tableData.length === 0) return [];
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    handlePagination(paginationInfo) {
      this.currentPage = paginationInfo.page;
      this.pageSize = paginationInfo.limit;
    },
  },
};
</script>

<style scoped lang="scss"></style>
