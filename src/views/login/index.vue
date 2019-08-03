<template>
  <div class="site-wrapper">
    <div class="site-content">
      <div class="brand-info">
        <h2 class="brand-title">德州学院社团管理系统</h2>
        <p class="brand-desc">renren-fast-vue基于vue、element-ui构建开发，实现renren-fast后台管理前端功能，提供一套更优的前端解决方案。</p>
      </div>
      <div class="tabs-wrapper">
        <el-tabs v-model="activeTab" :stretch="true">
          <el-tab-pane label="登录" name="login">
            <login-form/>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register" :lazy="true">
            <register-form  @success="handleSuccess"/>
          </el-tab-pane>
          <el-tab-pane label="社团申请" name="apply" :lazy="true">
            <apply-form @success="handleSuccess" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from './modules/login-form'
import registerForm from './modules/register-form'
import applyForm from './modules/apply-form'
export default {
  name: 'login',
  components: {
    loginForm,
    registerForm,
    applyForm
  },
  data () {
    return {
      activeTab: 'login'
    }
  },
  methods: {
    handleSuccess() {
      this.activeTab = 'login'
    }
  }
}
</script>

<style lang="less" scoped>
  .site-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, .6);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/img/login_bg.jpg);
      background-size: cover;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-title {
      margin:  0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-desc {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .tabs-wrapper {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      // padding: 150px 60px 180px;
      padding: 50px 60px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
    }
    // .login-title {
    //   font-weight: bold;
    //   margin: 15px 0;
    //   font-size: 16px;
    // }
    // .login-btn {
    //   width: 100%;
    //   margin-top: 15px;
    // }
  }
</style>
