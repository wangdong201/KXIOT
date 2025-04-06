<template>
  <div>
    <el-form v-model="form" ref="form" :inline="true">
      <el-form-item label="钱包名称">
        <el-input
          v-model="form.walletname"
          placeholder="请输入钱包名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="skorder" label="收款顺序"> </el-table-column>
        <el-table-column prop="walletname" label="钱包名称"> </el-table-column>
        <el-table-column prop="type" label="钱包类型"> </el-table-column>
        <el-table-column prop="name" label="真实姓名"> </el-table-column>
        <el-table-column prop="walletinfo" label="钱包信息"> </el-table-column>
        <el-table-column prop="todaypmt" label="今日收款"> </el-table-column>
        <el-table-column prop="totalpmt" label="总收款"> </el-table-column>
        <el-table-column prop="enable" label="是否启用"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <el-button size="mini" type="text" @click="dialogVisible = true"
              >编辑</el-button
            >
            <el-button size="mini" type="text" @click="dialogVisible2 = true"
              >收款记录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出层 -->
    <el-dialog
      title="编辑钱包信息"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      class="demo-ruleForm"
    >
      <el-form
        ref="walletform"
        :model="walletform"
        label-width="140px"
        style="height: 700px"
        :rules="rules"
      >
        <el-form-item label="钱包名称" prop="walletname">
          <el-input
            v-model="walletform.walletname"
            placeholder="请输入钱包名称"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input
            v-model="walletform.name"
            placeholder="请输入真实姓名"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="walletform.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序值" prop="skorder">
          <el-input
            v-model="walletform.skorder"
            placeholder="请输入排序值"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信账号绑定情况"></el-form-item>
        <el-form-item label="手机号码验证" prop="phone">
          <div>
            为了保证资金安全，您需要验证手机号码才能修改钱包账户信息。如遗忘请联系管理员
          </div>
          <div>验证手机号: <span>13800138000</span></div>
          <el-input
            v-model="walletform.phone"
            placeholder="请输入随机验证码"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" style="margin-left: 10px"
            >发送短信</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit2(walletform)"
            >保存</el-button
          >
          <el-button>返回</el-button>
        </el-form-item>
        <el-form-item>
          <template>
            <div style="color: red; font-size: 12px">通知:无</div>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 收款记录弹出层 -->
    <el-dialog
      title="查看转账记录"
      :visible.sync="dialogVisible2"
      width="80%"
      :before-close="handleClose2"
    >
      <div style="height: 750px; overflow: auto">
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
          <el-table :data="tableData2" stripe style="width: 100%" border>
            <el-table-column prop="xtdh" label="系统转账单号">
            </el-table-column>
            <el-table-column prop="skqb" label="收款钱包"> </el-table-column>
            <el-table-column prop="name" label="真实姓名"> </el-table-column>
            <el-table-column prop="amount" label="总金额"> </el-table-column>
            <el-table-column prop="zzsx" label="转账手续"> </el-table-column>
            <el-table-column prop="sjamount" label="实际到账金额">
            </el-table-column>
            <el-table-column prop="rztime" label="入账时间"> </el-table-column>
            <el-table-column prop="zzillustrate" label="转账说明">
            </el-table-column>
            <el-table-column prop="zzstatus" label="转账状态">
            </el-table-column>
            <el-table-column prop="dfstatus" label="代付状态">
            </el-table-column>
            <el-table-column prop="errmessage" label="错误信息">
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <template>
                <el-button size="mini" type="text">编辑</el-button>
                <el-button size="mini" type="text">收款记录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        walletname: "",
        name: "",
      },
      walletform: {
        walletname: "微信",
        name: "张大炮",
        status: "启用",
        skorder: "1",
        phone: "",
      },
      collectionform: {
        date1: "",
        region: "null",
        jynumber: "",
        region2: "all",
        qbregion3: "all",
        dfregion4: "all",
      },
      tableData: [
        {
          skorder: "1",
          walletname: "电费",
          type: "微信零钱",
          name: "张大炮",
          walletinfo: "",
          todaypmt: "0.00元/共0次",
          totalpmt: "0.00元",
          enable: "已启用",
          status: "正常",
          operate: "",
        },
      ],
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
      rules: {
        walletname: [
          { required: true, message: "请输入钱包名称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      dialogVisible: false,
      dialogVisible2: false,
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleClose2(done) {
      done();
    },
    onSubmit() {
      console.log("submit!");
    },
    onSubmit2(formName) {
      if (this.$refs.walletform) {
        this.$refs.walletform.validate((valid) => {
          if (valid) {
            console.log("提交成功!", formName);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        console.error("walletform is not defined");
      }
    },
    onSubmit3() {},
    onSubmit4() {},
  },
};
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 15px;
}

.el-dialog__body {
  height: 780px;
}
</style>
