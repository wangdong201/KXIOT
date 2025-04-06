<template>
  <div>
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
      <el-form-item label="采集器">
        <el-select v-model="form.collector">
          <el-option
            v-for="item in collectors"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警设置">
        <el-select v-model="form.alarmsettings">
          <el-option
            v-for="item in alarmsettings"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表通讯地址">
        <el-input
          v-model="form.tableaddress"
          placeholder="请输入表通讯地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input
          v-model="form.username"
          placeholder="请输入用户姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <div>
      <el-table :data="tableData" border  style="width: 100%">
        <el-table-column
          v-for="(item, index) in columns"
          :prop="item.prop"
          :label="item.label"
          :key="index"
        ></el-table-column>
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
        collector: "",
        alarmsettings: "",
        tableaddress: "",
        username: "",
      },

      groups: [
        { id: "1", name: "全部" },
        { id: "2", name: "分组2" },
        { id: "3", name: "分组3" },
      ],
      collectors: [
        { id: "1", name: "全部" },
        { id: "2", name: "采集器2" },
        { id: "3", name: "采集器3" },
      ],
      alarmsettings: [
        { id: "1", name: "全部" },
        { id: "2", name: "报警设置2" },
        { id: "3", name: "报警设置3" },
      ],
      tableData: [],
      columns: [
        { prop: "id", label: "序号" },
        { prop: "group", label: "分组" },
        { prop: "collectornum", label: "采集器编号" },
        { prop: "mailaddress", label: "通讯地址" },
        { prop: "user", label: "用片" },
        { prop: "alarmsetting", label: "报警设置" },
        { prop: "lastalarmtime", label: "最近报警时间" },
        { prop: "createtime", label: "创建时间" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
