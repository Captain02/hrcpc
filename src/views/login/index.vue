<template>
  <div class="site-wrapper">
    <div class="site-content">
      <div class="brand-info">
        <h2 class="brand-title">renren-fast-vue</h2>
        <p class="brand-desc">renren-fast-vue基于vue、element-ui构建开发，实现renren-fast后台管理前端功能，提供一套更优的前端解决方案。</p>
      </div>
      <div class="login-wrapper">
        <h3 class="login-title">管理员登录</h3>
        <el-form :model="loginForm" :rules="dataRule" ref="loginForm" @keyup.enter.native="handleSubmit()" status-icon>
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="team">
            <el-select v-model="loginForm.team" placeholder="请选择所属社团" clearable>
              <el-option label="区域一" :value="1"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="handleSubmit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        userName: '',
        password: '',
        team: ''
      },
      dataRule: {
        userName: [
          { required: true, message: '帐号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        team: [
          { required: true, message: '请选择所属社团', trigger: 'change' }
        ]
      },
    }
  },
  methods: {
    // 提交表单
    handleSubmit () {
      this.$refs['loginForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        this.$store.dispatch('Login', this.loginForm).then((result) => {
          this.$message.success(result.msg)
          setTimeout(() => {
            this.$router.push({
              path: '/dashboard'
            })
          }, 1500)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
  }
}
</script>

<style lang="less">
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
    .login-wrapper {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
      .el-form-item__content .el-select {
        width: 100%;
      }
    }
    .login-title {
      font-weight: bold;
      margin: 15px 0;
      font-size: 16px;
    }
    .login-btn {
      width: 100%;
      margin-top: 15px;
    }
  }
</style>
