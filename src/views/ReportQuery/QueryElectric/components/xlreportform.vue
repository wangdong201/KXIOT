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
      <el-form-item label="报表月份" prop="bbmonth">
        <el-date-picker
          v-model="form.bbmonth"
          type="month"
          placeholder="选择月"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="form.type" @change="handleCheckboxChange">
          <el-checkbox label="计算需量费用" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="success">导出到EXCEL</el-button>
      </el-form-item>

      <div v-if="showDetails">
        <el-form-item label="总：" prop="total">
          <el-input v-model="form.total" style="width: 100px"></el-input>
          <span>元/kw</span>
        </el-form-item>
        <el-form-item label="尖：" prop="jian">
          <el-input v-model="form.jian" style="width: 100px"></el-input>
          <span>元/kw</span>
        </el-form-item>
        <el-form-item label="峰：" prop="feng">
          <el-input v-model="form.feng" style="width: 100px"></el-input>
          <span>元/kw</span>
        </el-form-item>
        <el-form-item label="平：" prop="ping">
          <el-input v-model="form.ping" style="width: 100px"></el-input>
          <span>元/kw</span>
        </el-form-item>
        <el-form-item label="谷：" prop="gu">
          <el-input v-model="form.gu" style="width: 100px"></el-input>
          <span>元/kw</span>
        </el-form-item>
        <el-form-item label="深谷：" prop="shengu">
          <el-input v-model="form.shengu" style="width: 100px"></el-input>
          <span>元/kw</span>
        </el-form-item>
      </div>
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
        bbmonth: "",
        type: [],
        total: "",
        jian: "",
        feng: "",
        ping: "",
        gu: "",
        shengu: "",
      },
      showDetails: false,
    };
  },
  methods: {
    handleQuery() {
      console.log("handleQuery");
    },
    handleCheckboxChange(value) {
      this.showDetails = value.includes("计算需量费用");
    },
  },
};
</script>
