<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.region" placeholder="分组">
          <el-option label="全部" value="allfz"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="定时设置">
        <el-select v-model="form.timing" placeholder="">
          <el-option label="全部" value="alltime"></el-option>
          <el-option label="张大炮" value="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器">
        <el-select v-model="form.cjq" placeholder="">
          <el-option label="全部" value="allcjq"></el-option>
          <el-option label="123465(1只)" value="cjqnum"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表通讯地址">
        <el-input
          v-model="form.address"
          placeholder="搜索表通讯地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户">
        <el-input v-model="form.username" placeholder="搜索用户姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button>按条件删除</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table :data="tableData"  style="width: 100%" border>
        <el-table-column label="序号" prop="numbers"></el-table-column>
        <el-table-column label="分组" prop="grouping"></el-table-column>
        <el-table-column label="采集器编号" prop="cjqnum"></el-table-column>
        <el-table-column label="通讯地址" prop="address"></el-table-column>
        <el-table-column label="用户" prop="username"></el-table-column>
        <el-table-column label="定时设置" prop="timing"></el-table-column>
        <el-table-column label="下次执行时间" prop="nexttime"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" size="mini">删除</el-button>
            <el-button type="text" size="mini" @click="dialogVisible = true"
              >抄表日志</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 抄表日志弹出框 -->
    <div>
      <el-dialog
        title="抄表日志"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose"
      >
        <div class="table-container2">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="任务日志" name="one">
              <div style="margin-bottom: 15px">
                <el-form ref="form2" :model="form2" :inline="true">
                  <el-form-item label="分组">
                    <el-select v-model="form2.region" placeholder="分组">
                      <el-option label="全部" value="allfz"></el-option>
                      <el-option label="分组一" value="fz1"></el-option>
                      <el-option label="分组二" value="fz2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="onSubmit2"
                      >搜索</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
              <el-table :data="tableData2"  style="width: 100%" border>
                <el-table-column label="序号" prop="numbers"></el-table-column>
                <el-table-column label="分组" prop="grouping"></el-table-column>
                <el-table-column label="名称" prop="grouping"></el-table-column>
                <el-table-column
                  label="采集器编号"
                  prop="cjqnum"
                ></el-table-column>
                <el-table-column
                  label="通讯地址"
                  prop="address"
                ></el-table-column>
                <el-table-column label="用户" prop="username"></el-table-column>
                <el-table-column
                  label="触发时间"
                  prop="created_at"
                ></el-table-column>
                <el-table-column
                  label="执行延迟"
                  prop="delay"
                ></el-table-column>
                <el-table-column
                  label="完成时间"
                  prop="completed_at"
                ></el-table-column>
                <el-table-column
                  label="抄取数量"
                  prop="count"
                ></el-table-column>
                <el-table-column label="结果" prop="result"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="执行事件" name="two">
              <div style="margin-bottom: 15px">
                <el-form ref="form2" :model="form3" :inline="true">
                  <el-form-item label="分组">
                    <el-select v-model="form3.region" placeholder="分组">
                      <el-option label="全部" value="allfz"></el-option>
                      <el-option label="分组一" value="fz1"></el-option>
                      <el-option label="分组二" value="fz2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="onSubmit3"
                      >搜索</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
              <el-table :data="tableData3"  style="width: 100%" border>
                <el-table-column label="序号" prop="numbers"></el-table-column>
                <el-table-column label="分组" prop="grouping"></el-table-column>
                <el-table-column label="名称" prop="grouping"></el-table-column>
                <el-table-column
                  label="采集器编号"
                  prop="cjqnum"
                ></el-table-column>
                <el-table-column
                  label="通讯地址"
                  prop="address"
                ></el-table-column>
                <el-table-column label="用户" prop="username"></el-table-column>
                <el-table-column label="时间" prop="time"></el-table-column>
                <el-table-column
                  label="事件级别"
                  prop="level"
                ></el-table-column>
                <el-table-column label="信息" prop="message"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: "allfz",
        timing: "alltime",
        cjq: "allcjq",
        address: "",
        username: "",
      },
      form2: {
        region: "allfz",
      },
      form3: {
        region: "allfz",
      },
      tableData: [
        {
          numbers: 1,
          grouping: "分组一",
          cjqnum: "123465(1只)",
          address: "192.168.1.1",
          username: "101",
          timing: "张大炮",
          nexttime: "4小时后",
          created_at: "3年前",
          status: "正常",
        },
      ],
      tableData2: [],
      tableData3: [],
      dialogVisible: false,
      activeName: "one",
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {},
    onSubmit2() {},

    onSubmit3() {},
  },
};
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 20px;
}

.table-container2 {
  height: 80vh;
  overflow-y: auto;
}
</style>
