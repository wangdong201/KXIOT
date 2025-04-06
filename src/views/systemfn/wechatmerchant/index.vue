<template>
  <div class="app-container">
    <div class="title">微信商户号设置</div>
    <el-form
      ref="form"
      :model="form"
      label-width="180px"
      label-position="right"
      style="width: 900px"
    >
      <el-form-item label="微信支付">
        <el-radio-group v-model="form.payway">
          <el-radio label="关闭"></el-radio>
          <el-radio label="开启"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户收款方式"
        >当前收款方式为
        <span>钱包收款(绑定对私账户)</span>
        ,是否切换到商户号收款(绑定对公账户)，切换后钱包功能不可用</el-form-item
      >
      <el-form-item
        ><el-button type="primary">切换为商户号收款</el-button></el-form-item
      >
      <el-form-item label="相关文档"
        ><span class="look">公众号商户号申请配置流程文档在线查看</span>
        <span class="link">下载pdf版文档</span>
      </el-form-item>
      <el-form-item label="公众号/商户号主体">
        <el-input
          v-model="form.name"
          placeholder="公司名称"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="开发者ID(AppID)">
        <el-input
          v-model="form.appid"
          placeholder="开发者ID(AppID)"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="开发者密码(AppSecret)">
        <el-input
          v-model="form.appsecret"
          placeholder="开发者密码(AppSecret)"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="商户号">
        <el-input
          v-model="form.mchid"
          placeholder="商户号"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="API密钥">
        <el-input
          v-model="form.apikey"
          placeholder="API密钥"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item><el-button type="primary">保存</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        payway: "关闭",
        name: "",
        appid: null,
        appsecret: null,
        mchid: null,
        apikey: null,
      },
    };
  },
};
</script>

<style scoped lang="scss">
.title {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
}

.look {
  color: #409eff;
  cursor: pointer;
  padding-right: 20px;

  &:hover {
    color: #157ab5;
  }
}

.link {
  color: #409eff;
  cursor: pointer;
  padding-right: 20px;

  &:hover {
    color: #157ab5;
  }
}
</style>
