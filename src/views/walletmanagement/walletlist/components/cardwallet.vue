<template>
  <div>
    <div class="form-body">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item label="钱包名称" prop="walletname">
          <el-input
            v-model="ruleForm.walletname"
            class="inputstyle"
            placeholder="钱包名用于区分，自定义即可"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="ruleForm.realname"
            class="inputstyle"
            placeholder="实名信息不匹配会导致收款失败"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input
            v-model="ruleForm.idcard"
            class="inputstyle"
            placeholder="实名信息不匹配会导致收款失败"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序值" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            class="inputstyle"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡卡号" prop="bankcard">
          <el-input
            v-model="ruleForm.bankcard"
            class="inputstyle"
            placeholder="请仔细核对银行卡卡号"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行机构" prop="bankname">
          <el-select
            v-model="ruleForm.bankname"
            filterable
            placeholder="请选择或者搜索所属银行"
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
        <el-form-item label="开户支行" prop="bankbranch">
          <el-input
            v-model="ruleForm.bankbranch"
            class="inputstyle"
            placeholder="请填写开户支行名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行预留手机号" prop="bankmobile">
          <el-input
            v-model="ruleForm.bankmobile"
            class="inputstyle"
            placeholder="请输入银行预留手机号(必填项)"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码验证" prop="phoneverify">
          <template>
            <div>
              为了保证资金安全，您需要验证手机号码才能修改钱包账户信息。如遗忘请联系管理员
              <div>验证手机号: <span>13545859585</span></div>
            </div>
          </template>
          <el-input
            v-model="ruleForm.phoneverify"
            style="width: 30%"
            placeholder="请输入手机号码验证码"
          ></el-input>
          <el-button type="primary" style="margin-left: 10px"
            >获取验证码</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        walletname: "",
        realname: "",
        idcard: "",
        status: "启用",
        sort: 1,
        bankcard: "",
        bankname: "",
        bankbranch: "",
        bankmobile: "",
        phoneverify: "",
      },
      rules: {
        walletname: [
          { required: true, message: "请输入钱包名称", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern:
              /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
            message: "身份证号格式错误，请输入正确的身份证号",
            trigger: "blur",
          },
        ],
        sort: [
          { required: true, message: "请输入排序值", trigger: "blur" },
          { pattern: /^\d+$/, message: "排序值必须为数字", trigger: "blur" },
        ],
        bankcard: [
          { required: true, message: "请输入银行卡卡号", trigger: "blur" },
          {
            pattern: /^[1-9]\d{9,29}$/,
            message: "银行卡卡号格式错误，请输入正确的银行卡卡号",
            trigger: "blur",
          },
        ],
        bankname: [
          { required: true, message: "请选择银行机构", trigger: "blur" },
        ],
        bankbranch: [
          { required: true, message: "请输入开户支行名称", trigger: "blur" },
        ],
        bankmobile: [
          { required: true, message: "请输入银行预留手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "银行预留手机号格式错误，请输入正确的手机号",
            trigger: "blur",
          },
        ],
        phoneverify: [
          { required: true, message: "请输入手机号码验证码", trigger: "blur" },
        ],
      },
      options: [
        { value: "ICBC", label: "中国工商银行" },
        { value: "CCB", label: "中国建设银行" },
        { value: "ABC", label: "中国农业银行" },
        { value: "BOC", label: "中国银行" },
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
  },
};
</script>

<style>
.form-body {
  width: 50%;
}

.inputstyle {
  width: 50%;
}
</style>
