<template>
  <div class="app-container">
    <div class="app-header">这是一个标题</div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="姓名" width="180" align="center" />
      <el-table-column prop="tmd0" label="总电表数" align="center" />
      <el-table-column prop="tmd1" label="用电电表" align="center" />
      <el-table-column prop="tmd2" label="联系不上" align="center" />
      <el-table-column prop="tmd3" label="正常开电" align="center" />
      <el-table-column prop="tmd4" label="手动开电" align="center" />
      <el-table-column prop="tmd5" label="手动关电" align="center" />
      <el-table-column prop="tmd6" label="欠费断电" align="center" />
      <el-table-column prop="tmd7" label="定时关电" align="center" />
      <el-table-column prop="tmd8" label="过载跳电" align="center" />
      <el-table-column prop="tmd9" label="恶性负载" align="center" />
      <el-table-column prop="tmd10" label="异常电表" align="center" />
      <el-table-column prop="tmd13" label="异常状态" align="center" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="inquirelist"
    />
  </div>
</template>
<script>
import { getBuildInfo1 } from "@/api/system/room";
export default {
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      id: null,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
      },
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.inquirelist();
  },

  created() {},

  methods: {
    inquirelist() {
      this.loading = false;
      this.queryParams = {
        ...this.queryParams,
        id: this.id,
      };
      getBuildInfo1(this.queryParams)
        .then((response) => {
          this.tableData = response.rows;
          this.total = response.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
.app-header {
  font-size: 15px;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}
</style>
