<template>
  <div class="app-container">
    <div class="app-header">{{ title }}</div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="名称" width="180" align="center" />
      <el-table-column prop="tmd0" label="总电表数" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: null })"
          >
            {{ scope.row.tmd0 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd1" label="用电电表" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: null })"
          >
            {{ scope.row.tmd1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd2" label="通讯失败" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 100 })"
          >
            {{ scope.row.tmd2 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd3" label="正常开电" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 2 })"
          >
            {{ scope.row.tmd3 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd4" label="手动开电" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 3 })"
          >
            {{ scope.row.tmd4 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd5" label="手动关电" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 4 })"
          >
            {{ scope.row.tmd5 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd6" label="欠费断电" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 5 })"
          >
            {{ scope.row.tmd6 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd7" label="定时关电" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 6 })"
          >
            {{ scope.row.tmd7 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd8" label="过载跳电" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 7 })"
          >
            {{ scope.row.tmd8 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd9" label="恶性负载" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: 8 })"
          >
            {{ scope.row.tmd9 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="tmd10" label="异常电表" align="center">
        <template slot-scope="scope">
          <span
            class="clickable-cell"
            @click="handleCellClick(scope.row, { value: null })"
          >
            {{ scope.row.tmd10 }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="tmd13" label="异常状态" align="center" /> -->
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
      title: "",
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
    /**
     * 处理表格单元格点击事件
     * @param {Object} row - 当前行数据
     * @param {Object} typeInfo - 类型信息，包含value
     */
    handleCellClick(row, typeInfo) {
      const query = {};
      if (row.id) {
        query.buildId = row.id;
      }

      if (typeInfo.value !== null && typeInfo.value !== undefined) {
        query.statue = typeInfo.value;
      }
      this.$router.push({
        path: "/tool/ammeter",
        query: query,
      });
    },

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
          this.title = response.title;
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

.clickable-cell {
  cursor: pointer;
  color: #409eff;

  &:hover {
    text-decoration: underline;
  }
}
</style>
