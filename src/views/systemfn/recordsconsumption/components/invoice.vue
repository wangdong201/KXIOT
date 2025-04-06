<template>
  <div>
    <div class="RecordsConsumption">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="消费类型">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="全部" value="all"></el-option>
            <el-option label="开票中" value="applying"></el-option>
            <el-option label="已交付" value="delivered"></el-option>
            <el-option label="审核失败" value="err"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="apply_text">
      仅支持最近90天消费订单申请开票,单次开票金额需满200元
    </div> -->
    <div class="RecordsConsumption_table">
      <el-table :data="pagedTableData" height="590" border style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="state" label="开票状态"> </el-table-column>
        <el-table-column prop="name" label="抬头"> </el-table-column>
        <el-table-column prop="acount" label="税号"> </el-table-column>
        <el-table-column prop="amount" label="开票金额"> </el-table-column>
        <el-table-column prop="time" label="申请时间"> </el-table-column>
        <el-table-column prop="other" label="其他"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <span style="color: #1890ff; cursor: pointer">{{
              scope.row.operate
            }}</span>
          </template></el-table-column
        >
      </el-table>
      <div>
        <Pagination
          :total="total"
          :page.sync="currentPage"
          :limit.sync="pageSize"
          @pagination="handlePagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invoice",
  data() {
    return {
      form: {
        region: "all",
      },
      tableData: Array.from({ length: 50 }, (_, index) => ({
        state: "已开票",
        name: `抬头${index + 1}`,
        acount: "11223344",
        amount: "100",
        time: "2021-08-01 10:00:00",
        other: "其他信息",
        operate: "查看详情",
      })),
      total: 50,
      currentPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    pagedTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handlePagination(paginationInfo) {
      this.currentPage = paginationInfo.page;
      this.pageSize = paginationInfo.limit;
    },
  },
};
</script>

<style scoped lang="scss">
// .apply_text {
//   font-size: 12px;
//   color: #777;
// }

.RecordsConsumption_table {
  margin-top: 20px;
}

.apply_btn {
  display: flex;
  align-items: center;
}
</style>
