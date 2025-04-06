<template>
  <div>
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
              <el-button type="primary" @click="onSubmit2">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData2" style="width: 100%" border>
          <el-table-column label="序号" prop="numbers"></el-table-column>
          <el-table-column label="分组" prop="grouping"></el-table-column>
          <el-table-column label="名称" prop="grouping"></el-table-column>
          <el-table-column label="采集器编号" prop="cjqnum"></el-table-column>
          <el-table-column label="通讯地址" prop="address"></el-table-column>
          <el-table-column label="用户" prop="username"></el-table-column>
          <el-table-column label="触发时间" prop="created_at"></el-table-column>
          <el-table-column label="执行延迟" prop="delay"></el-table-column>
          <el-table-column
            label="完成时间"
            prop="completed_at"
          ></el-table-column>
          <el-table-column label="抄取数量" prop="count"></el-table-column>
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
              <el-button type="primary" @click="onSubmit3">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData3" style="width: 100%" border>
          <el-table-column label="序号" prop="numbers"></el-table-column>
          <el-table-column label="分组" prop="grouping"></el-table-column>
          <el-table-column label="名称" prop="grouping"></el-table-column>
          <el-table-column label="采集器编号" prop="cjqnum"></el-table-column>
          <el-table-column label="通讯地址" prop="address"></el-table-column>
          <el-table-column label="用户" prop="username"></el-table-column>
          <el-table-column label="时间" prop="time"></el-table-column>
          <el-table-column label="事件级别" prop="level"></el-table-column>
          <el-table-column label="信息" prop="message"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "one",
      form2: {
        region: "allfz",
      },
      form3: {
        region: "allfz",
      },
      tableData2: [],
      tableData3: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit2() {},

    onSubmit3() {},
  },
};
</script>
