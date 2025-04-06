<template>
  <div class="app-container">
    <div class="title">查看转账记录</div>
    <el-form ref="collectionform" :model="collectionform" :inline="true">
      <el-form-item label="日期范围" prop="date1" required>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="collectionform.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="单号类型" prop="region">
        <el-select v-model="collectionform.region" placeholder="">
          <el-option label="无" value="null"></el-option>
          <el-option label="系统转账单号" value="xttransfer"></el-option>
          <el-option label="第三方转账单号" value="sftransfer"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易单号查询" prop="jynumber" required>
        <el-input
          placeholder="交易单号"
          v-model="collectionform.jynumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="转账状态" prop="region2">
        <el-select v-model="collectionform.region2" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="转账创建" value="zzcreated"></el-option>
          <el-option label="转账已发起" value="zztransfer"></el-option>
          <el-option label="转账处理中" value="zzprocessing"></el-option>
          <el-option label="转账状态未知" value="zzunknown"></el-option>
          <el-option label="延迟处理" value="zzdelay"></el-option>
          <el-option label="转账已取消间" value="zzcancel"></el-option>
          <el-option label="转账失败" value="zzfailed"></el-option>
          <el-option label="转账完成" value="zzsuccess"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="钱包" prop="qbregion3">
        <el-select v-model="collectionform.region2" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="电费(微信零钱)" value="dianfei"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代付状态" prop="dfregion4">
        <el-select v-model="collectionform.region2" placeholder="">
          <el-option label="全部" value="all"></el-option>
          <el-option label="代付成功" value="dfsuccess"></el-option>
          <el-option label="代付失败" value="dffailed"></el-option>
          <el-option label="代付处理中" value="dfprocessing"></el-option>
          <el-option label="银行退票" value="dfbank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit3">查询</el-button>
        <el-button type="primary" @click="onSubmit4">导出到EXCEL</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <div style="margin-top: 15px">
      <el-table :data="tableData2" style="width: 100%" border>
        <el-table-column prop="xtdh" label="系统转账单号"> </el-table-column>
        <el-table-column prop="skqb" label="收款钱包"> </el-table-column>
        <el-table-column prop="name" label="真实姓名"> </el-table-column>
        <el-table-column prop="amount" label="总金额"> </el-table-column>
        <el-table-column prop="zzsx" label="转账手续"> </el-table-column>
        <el-table-column prop="sjamount" label="实际到账金额">
        </el-table-column>
        <el-table-column prop="rztime" label="入账时间"> </el-table-column>
        <el-table-column prop="zzillustrate" label="转账说明">
        </el-table-column>
        <el-table-column prop="zzstatus" label="转账状态"> </el-table-column>
        <el-table-column prop="dfstatus" label="代付状态"> </el-table-column>
        <el-table-column prop="errmessage" label="错误信息"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">收款记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransferRecord",
  data() {
    return {
      collectionform: {
        date1: "",
        region: "null",
        jynumber: "",
        region2: "all",
        qbregion3: "all",
        dfregion4: "all",
      },
      tableData2: [
        {
          xtdh: "1234567890",
          skqb: "微信零钱",
          name: "张大炮",
          amount: "100.00元",
          zzsx: "0.10元/次",
          sjamount: "99.90元",
          rztime: "2021-01-01 12:00:00",
          zzillustrate: "电费",
          zzstatus: "转账成功",
          dfstatus: "代付成功",
          errmessage: "",
          operate: "",
        },
      ],
    };
  },
  methods: {
    onSubmit3() {},
    onSubmit4() {},
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
</style>
