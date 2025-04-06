<template>
  <div class="app-container">
    <!-- form -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="分组">
        <el-select v-model="form.group">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型：">
        <el-select v-model="form.devicetype">
          <el-option
            v-for="item in devicetypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警状态：">
        <el-select v-model="form.errorstatus">
          <el-option
            v-for="item in errorstatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警类型：">
        <el-select v-model="form.alarmtype">
          <el-option
            v-for="item in alarmtypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备号：">
        <el-input v-model="form.deviceid" placeholder="请输入设备号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="default" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <div style="margin: 20px 0">
      <el-button type="primary">关闭报警</el-button>
      <el-button type="danger">删除报警</el-button>
    </div>

    <!-- table -->
    <div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :prop="item.prop"
          :label="item.label"
          :key="index"
        ></el-table-column>
        <el-table-column label="操作" width="150"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        group: "",
        devicetype: "",
        errorstatus: "",
        alarmtype: "",
        deviceid: "",
      },
      groups: [
        { id: "1", name: "全部" },
        { id: "2", name: "分组2" },
        { id: "3", name: "分组3" },
      ],
      devicetypes: [
        { id: "1", name: "全部" },
        { id: "2", name: "设备类型2" },
        { id: "3", name: "设备类型3" },
      ],
      errorstatus: [
        { id: "1", name: "全部" },
        { id: "2", name: "报警" },
        { id: "3", name: "恢复" },
      ],
      alarmtypes: [
        { id: "1", name: "全部" },
        { id: "2", name: "报警类型2" },
        { id: "3", name: "报警类型3" },
      ],
      tableData: [],
      columns: [
        { id: 1, prop: "group", label: "分组" },
        { id: 2, prop: "deviceID", label: "设备编号" },
        { id: 3, prop: "equipmentremarks", label: "设备备注" },
        { id: 4, prop: "alarmitem", label: "报警项" },
        { id: 5, prop: "triggertime", label: "触发时间" },
        { id: 6, prop: "alarmdetails", label: "报警详情" },
        { id: 7, prop: "troubleshoot", label: "排查提示" },
        { id: 8, prop: "status", label: "状态" },
      ],
    };
  },
  methods: {
    onSearch() {
      console.log(this.form);
    },
    onReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
