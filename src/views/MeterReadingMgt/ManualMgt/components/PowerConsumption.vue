<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.region" placeholder="请选择分组">
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="正向有功总电能" name="type"></el-checkbox>
          <el-checkbox label="剩余金额" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true"
          >选择电能表</el-button
        >
        <el-button type="primary">开始抄表</el-button>
        <el-button type="danger">清空</el-button>
        <el-button type="warning" @click="dialogVisible2 = true"
          >自定义抄表选项</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div style="margin-top: 20px">
      <el-table :data="tableData"  style="width: 100%" border>
        <el-table-column prop="ordernum" label="序号"></el-table-column>
        <el-table-column prop="fz" label="分组"></el-table-column>
        <el-table-column prop="cjqnum" label="采集器编号"></el-table-column>
        <el-table-column prop="address" label="通讯地址"></el-table-column>
        <el-table-column prop="user" label="用户"></el-table-column>
        <el-table-column prop="cbtime" label="抄表时间"></el-table-column>
        <el-table-column prop="func" label="功能"></el-table-column>
        <el-table-column prop="data" label="数据"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="result" label="结果"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.$index)"
              >删除</el-button
            >
            <el-button type="text" @click="dialogVisible3 = true"
              >日志</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 选择电能表弹窗 -->
    <div>
      <el-dialog
        title="请选择在线电能表"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose"
      >
        <div style="height: 80vh; overflow: auto">
          <choiceelectricsurface></choiceelectricsurface>
        </div>
      </el-dialog>
    </div>

    <!-- 自定义抄表选项弹窗 -->
    <div>
      <el-dialog
        title="自定义抄表选项"
        :visible.sync="dialogVisible2"
        width="70%"
        :before-close="handleClose2"
      >
        <div style="height: 70vh; overflow: auto">
          <custommeterreading></custommeterreading>
        </div>
      </el-dialog>
    </div>

    <!-- 日志弹窗 -->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible3"
        width="90%"
        :before-close="handleClose3"
      >
        <div style="height: 80vh; overflow: auto">
          <logdialog></logdialog>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import choiceelectricsurface from "./choiceelectricsurface.vue";
import custommeterreading from "./custommeterreading.vue";
import logdialog from "./logdialog.vue";
export default {
  name: "PowerConsumption",
  components: {
    choiceelectricsurface,
    custommeterreading,
    logdialog,
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      form: {
        region: "",
        type: [],
      },
      tableData: [
        {
          ordernum: 1,
          fz: "fz1",
          cjqnum: "123456789",
          address: "127.0.0.1",
          user: "admin",
          cbtime: "2021-01-01 12:00:00",
          func: "正向有功总电能",
          data: "123456789",
          status: "正常",
          result: "成功",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleDelete(index) {
      // 删除操作
    },
    handleClose2(done) {
      done();
    },
    handleClose3(done) {
      done();
    },
    handleClose(done) {
      done();
    },
  },
};
</script>
