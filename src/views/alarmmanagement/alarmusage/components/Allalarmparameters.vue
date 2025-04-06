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
      <el-form-item label="设置名称：">
        <el-input v-model="form.name" placeholder="请输入设置名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
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
        name: "",
      },
      groups: [
        { id: "0", name: "全部" },
        { id: "1", name: "分组1" },
        { id: "2", name: "分组2" },
        { id: "3", name: "分组3" },
      ],
      tableData: [],
      columns: [
        { prop: "id", label: "序号" },
        { prop: "group", label: "分组" },
        { prop: "name", label: "设置名称" },
        { prop: "detectionperiod", label: "检测周期" },
        { prop: "alarmcondition", label: "报警触发条件" },
        { prop: "alarmlevel", label: "报警静默期" },
        { prop: "configure", label: "全局配置" },
        { prop: "usage", label: "使用情况" },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$emit("search", this.form);
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
