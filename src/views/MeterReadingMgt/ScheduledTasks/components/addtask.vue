<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="180px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="分组">
        <el-select
          v-model="form.region"
          placeholder="请选择分组"
          class="input-width"
        >
          <el-option label="暂不分组" value="null"></el-option>
          <el-option label="分组一" value="fz1"></el-option>
          <el-option label="分组二" value="fz2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择设备" prop="device">
        <el-select
          v-model="form.device"
          placeholder="请选择设备"
          class="input-width"
        >
          <el-option label="电能表" value="ele"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择功能" prop="func">
        <el-select
          v-model="form.func"
          multiple
          placeholder="请选择"
          class="input-width"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超时自动重抄次数(0-2)" prop="num">
        <el-input-number
          v-model="form.num"
          controls-position="right"
          @change="handleChange"
          :min="0"
          :max="2"
          class="input-width"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="定时设置表达式" prop="cron">
        <el-input
          v-model="form.cron"
          class="input-width"
          placeholder="请输入定时设置表达式"
          :disabled="true"
        ></el-input>
        <span class="time-text">设置定时时间</span>
      </el-form-item>
      <el-form-item label="设置描述" prop="desc">
        <el-input
          type="textarea"
          v-model="form.desc"
          :disabled="true"
          class="input-width"
          placeholder="请输入设置描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="下次执行时间" prop="nextTime">
        <el-date-picker
          v-model="form.nextTime"
          type="datetime"
          placeholder="选择日期时间"
          :disabled="true"
          class="input-width"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="应用到该分组所有设备" prop="allDevice">
        <el-radio-group v-model="form.allDevice">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >添加</el-button
        >
        <el-button @click="resetForm('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "null",
        device: "ele",
        func: [],
        num: 0,
        cron: "",
        desc: "",
        nextTime: "",
        allDevice: "否",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        device: [{ required: true, message: "请选择设备", trigger: "blur" }],
        func: [{ required: true, message: "请选择功能", trigger: "blur" }],
        num: [
          {
            required: true,
            message: "请输入超时自动重抄次数",
            trigger: "blur",
          },
        ],
        cron: [
          { required: true, message: "请输入定时设置表达式", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请输入设置描述", trigger: "blur" }],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-width {
  width: 300px;
}

.time-text {
  color: #409eff;
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
