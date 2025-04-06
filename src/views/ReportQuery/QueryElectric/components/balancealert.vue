<template>
  <div>
    <el-form :model="form" ref="form" :inline="true">
      <el-form-item label="分组" prop="grouping">
        <el-select v-model="form.grouping" placeholder="">
          <el-option label="全部" value="allgrouping"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器" prop="collector">
        <el-select v-model="form.collector" placeholder="">
          <el-option label="全部" value="allcollector"></el-option>
          <el-option label="采集器一" value="cjq1"></el-option>
          <el-option label="采集器二" value="cjq2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="仅筛选已开户用户" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="最小报警值：" prop="minvalue">
        <el-input-number
          v-model="form.minvalue"
          controls-position="right"
          @change="handleChange"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最大报警值：" prop="maxvalue">
        <el-input-number
          v-model="form.maxvalue"
          controls-position="right"
          @change="handleChange"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="success">导出到EXCEL</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        grouping: "allgrouping",
        collector: "allcollector",
        type: [],
        minvalue: 0,
        maxvalue: 0,
      },
    };
  },
  methods: {
    handleQuery() {
      console.log("handleQuery");
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>
