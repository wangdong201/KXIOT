<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="alarmName">
        <el-input
          v-model="ruleForm.alarmName"
          placeholder="请输入报警名称"
          class="input-width1"
        ></el-input>
      </el-form-item>
      <el-form-item label="分组">
        <el-select v-model="ruleForm.group" class="input-width1">
          <el-option label="暂不分组" value="0"></el-option>
          <el-option label="分组1" value="1"></el-option>
          <el-option label="分组2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择设备类型">
        <el-select v-model="ruleForm.deviceType" class="input-width1">
          <el-option label="电能表" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警周期" prop="alarmCycle">
        <el-input
          v-model="ruleForm.alarmCycle"
          placeholder="请输入报警周期"
          class="input-width2"
        ></el-input>
        <el-select v-model="ruleForm.time" class="input-width3">
          <el-option label="天" value="1"></el-option>
          <el-option label="月" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区间用量" prop="intervalusage">
        <el-select v-model="ruleForm.yl" class="input-width4">
          <el-option label="低于" value="1"></el-option>
          <el-option label="高于" value="2"></el-option>
        </el-select>
        <el-input
          v-model="ruleForm.intervalusage"
          placeholder="请输入报警周期"
          class="input-width2"
        ></el-input>
        <template>
          <span class="time">kWh</span>
        </template>
      </el-form-item>
      <el-form-item label="报警静默期">
        <el-input
          v-model="ruleForm.silence"
          placeholder="请输入报警静默期"
          class="input-width1"
        ></el-input>
        <template>
          <span class="time">{{
            ruleForm.time == 1 ? "天" : ruleForm.time == 2 ? "月" : "天"
          }}</span>
          <span class="text">触发报警后一定时间内不再重复触发报警</span>
        </template>
      </el-form-item>
      <el-form-item label="应用到该分组所有设备">
        <el-radio-group v-model="ruleForm.alldevice">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >添加</el-button
        >

        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        alarmName: "",
        group: "暂不分组",
        deviceType: "电能表",
        alarmCycle: "1",
        time: "天",
        yl: "低于",
        intervalusage: "",
        silence: "1",
        alldevice: "是",
      },
      rules: {
        alarmName: [
          { required: true, message: "请输入报警名称", trigger: "blur" },
        ],
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "change" },
        ],
        alarmCycle: [
          { required: true, message: "请输入报警周期", trigger: "blur" },
        ],
        intervalusage: [
          { required: true, message: "请输入区间用量", trigger: "blur" },
        ],
      },
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
  },
};
</script>

<style scoped lang="scss">
.input-width1 {
  width: 300px;
}

.input-width2 {
  width: 150px;
}

.input-width3 {
  width: 140px;
  margin-left: 10px;
}
.input-width4 {
  width: 140px;
  margin-right: 10px;
}

.text {
  color: #ccc;
  font-size: 12px;
  padding-left: 10px;
}

.time {
  padding-left: 5px;
}
</style>
