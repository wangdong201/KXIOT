<template>
<div class="login">
    <vue-particles
          color="#21fcfa"
          :particleOpacity="0.7"
          :particlesNumber="39"
          shapeType="circle"
          :particleSize="5"
          linesColor="#409EFF"
          :linesWidth="2"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="push"
    >
    </vue-particles>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">预付费管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          clearable
          auto-complete="off"
          placeholder="账号"
        >
        <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          <svg-icon :icon-class="eyeType" slot="suffix" class="el-input__icon input-icon cright-icon" @click="changeType" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          clearable
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" text-color="#fff" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;" round
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登  录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span  @click="clianji">Copyright © 2024-2024 All Rights Reserved</span>
    </div>

  </div>

</template>

<script>
import Vue from 'vue'
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      pwdType: "password",
      eyeType: "eye",
      loginForm: {
        username: "admin",//admin
        password: "admin123",//admin123
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: true,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    changeType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.eyeType = this.eyeType === 'eye' ? 'eye-open' : 'eye';
    },
    clianji() {
      window.location.href="https://www.baidu.com/";
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe');
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!this.loading)
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};// calc(100% - 50px);
</script>
<style rel="stylesheet/scss" lang="scss">
#particles-12js{
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url("../assets/images/img1.png");
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat;
        margin-left: auto;
        margin-right: auto;
        overflow:hidden;
    }
#particles-js {
  width:100%;
  height:100%;
  position: absolute;
  left:0;
  top:0;
  overflow:hidden;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/img0.png");
  background-size: cover;

  .title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #707070;
    font-family: 楷体;
    font-family: "楷体",sans-serif;
    color:#1890ff;
    color: rgb(18,254,253);
    font-size: 27px;
  }

  .login-form {
    border-radius: 16px;
    background: #ffffff;
    background: rgba(0, 0, 0, 0.3);
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 5px;
      margin-right: 0px;
      color: #888;
    }
    .el-input__prefix .el-input__icon{
      color: #888;
    }
    .cright-icon{
      margin-right: 6px;
      cursor:pointer;
    }
    .cright-icon:hover{
      color: #333;
    }
    .el-checkbox{
      .el-checkbox__label  {
          color: #fff;
      }
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 36px;
    line-height: 36px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.39);
    border-radius: 18px 18px 0px 0px ;
    font-family: Arial;
    font-size: 16px;
    letter-spacing: 1px;
    span{
      cursor:pointer;
    }
  }
  .login-code-img {
    height: 38px;
  }
}
</style>
