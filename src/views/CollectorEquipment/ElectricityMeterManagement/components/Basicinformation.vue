<template>
  <div>
    <!-- 基本消息表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="采集器编号">
        <template>
          <div>
            <span>123456489</span>
            <span class="form-text form-texcolor">已连接</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="地址">
        <template>
          <div>
            <span>123456489</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="电能表类型">
        <template>
          <div>
            <span>单相2020Z款远程预付费</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="当前分组">
        <template>
          <div>
            <span>二楼</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="绑定用户">
        <template>
          <div>
            <span>已绑定：</span>
            <span class="form-text form-texcolor">101</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="描述"></el-form-item>
      <el-form-item label="购电次数">
        <template>
          <div>
            <span>0</span>
            <span class="form-text">未开户</span>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="应用参数模板" prop="apptemplate">
        <el-select
          v-model="ruleForm.apptemplate"
          placeholder=""
          class="input-width"
        >
          <el-option label="参数一" value="parameter1"></el-option>
          <el-option label="参数二" value="parameter2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电价" prop="price">
        <el-input v-model="ruleForm.price" class="input-width"></el-input>
        <template>
          <span>元/kWh</span>
          <span
            >(当前值 <span class="form-textcolor2">1.0000元/kWh</span> )</span
          >
        </template>
      </el-form-item>
      <el-form-item label="显示报警金额" prop="warnprice">
        <el-input v-model="ruleForm.warnprice" class="input-width"></el-input>
        <template>
          <span>元</span>
          <span>(当前值 <span class="form-textcolor2">10.00元</span> )</span>
        </template>
      </el-form-item>
      <el-form-item label="断电报警金额" prop="outageprice">
        <el-input v-model="ruleForm.outageprice" class="input-width"></el-input>
        <template>
          <span>元</span>
          <span>(当前值 <span class="form-textcolor2">10.00元</span> )</span>
        </template>
      </el-form-item>
      <el-form-item label="互感器变比" prop="mutual">
        <el-input v-model="ruleForm.mutual" class="input-width"></el-input>
        <template>
          <span>倍</span>
          <span>(当前值 <span class="form-textcolor2">1倍</span> )</span>
        </template>
      </el-form-item>
      <el-form-item label="负荷限制功率" prop="powerlimit">
        <el-input v-model="ruleForm.powerlimit" class="input-width"></el-input>
        <template>
          <span>Kw</span>
          <span>(当前值 <span class="form-textcolor2">8.0000Kw</span> )</span>
        </template>
      </el-form-item>
      <el-form-item label="超负荷延迟" prop="overloaddelay">
        <el-input
          v-model="ruleForm.overloaddelay"
          class="input-width"
        ></el-input>
        <template>
          <span>分钟</span>
          <span>(当前值 <span class="form-textcolor2">5分钟</span> )</span>
        </template>
      </el-form-item>
      <el-form-item label="最大透支金额" prop="overdraft">
        <el-input v-model="ruleForm.overdraft" class="input-width"></el-input>
        <template>
          <span>元</span>
          <span>(当前值 <span class="form-textcolor2">0.00元</span> )</span>
        </template>
      </el-form-item>
      <el-form-item label="电表模板参数下发">
        <el-radio-group v-model="ruleForm.templateparameters">
          <el-radio label="不下发"></el-radio>
          <el-radio label="仅下发修改过的"></el-radio>
          <el-radio label="下发全部参数"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其他参数下发"></el-form-item>
      <el-form-item label="其他操作">
        <el-button type="primary">电能表清零</el-button>
        <el-button type="primary" disabled>电能表销户</el-button>
        <el-button type="primary">跳闸</el-button>
        <el-button type="primary">合闸</el-button>
        <el-button type="primary">保电</el-button>
        <el-button type="primary">解除保电</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button type="">返回</el-button>
        <el-button type="">刷新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        apptemplate: "参数一",
        price: "1.0000",
        warnprice: "10.00",
        outageprice: "10.00",
        mutual: "1",
        powerlimit: "8.0000",
        overloaddelay: "5",
        overdraft: "0.00",
        templateparameters: "不下发",
      },
      rules: {
        price: [{ required: true, message: "请输入电价", trigger: "blur" }],
        warnprice: [
          { required: true, message: "请输入报警金额", trigger: "blur" },
        ],
        outageprice: [
          { required: true, message: "请输入断电报警金额", trigger: "blur" },
        ],
        mutual: [
          { required: true, message: "请输入互感器变比", trigger: "blur" },
        ],
        powerlimit: [
          { required: true, message: "请输入负荷限制功率", trigger: "blur" },
        ],
        overloaddelay: [
          { required: true, message: "请输入超负荷延迟", trigger: "blur" },
        ],
        overdraft: [
          { required: true, message: "请输入最大透支金额", trigger: "blur" },
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
.form-text {
  padding-left: 15px;
}

.form-texcolor {
  color: aquamarine;
}

.form-textcolor2 {
  color: red;
}

.input-width {
  width: 250px;
}
</style>
