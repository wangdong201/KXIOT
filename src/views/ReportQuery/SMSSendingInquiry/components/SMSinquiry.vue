<template>
  <div>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="form.dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="短信内容搜索：">
        <el-input
          v-model="form.smsContent"
          placeholder="短信内容搜索关键词"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码搜索：">
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="分组">
        <el-select v-model="form.group" placeholder="">
          <el-option label="全部" value="allgroup"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发送状态：">
        <el-select v-model="form.fsstate" placeholder="">
          <el-option label="全部短信" value="allsms"></el-option>
          <el-option label="发送成功" value="Successfullysent"></el-option>
          <el-option label="发送失败" value="failinsend"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        dateRange: [],
        smsContent: "",
        mobile: "",
        group: "allgroup",
        fsstate: "allsms",
      },
      tableData: [],
      columns: [
        { prop: "grouping", label: "分组" },
        { prop: "smsnumber", label: "短信编号" },
        { prop: "mobile", label: "手机号码" },
        { prop: "user", label: "用户" },
        { prop: "sendingtime", label: "发送时间" },
        { prop: "charging", label: "计费条数" },
        { prop: "smsstatus", label: "状态信息" },
        { prop: "smsContent", label: "短信内容" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
