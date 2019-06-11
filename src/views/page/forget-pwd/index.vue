<template>
  <div class="site-wrapper">
    <div class="site-content">
      <h1 class="site-title">修改登录密码</h1>
      <div class="list-steps">
        <el-steps :active="step" align-center finish-status="success">
          <el-step title="输入学号"></el-step>
          <el-step title="验证"></el-step>
          <el-step title="重置密码"></el-step>
        </el-steps>
      </div>
      <div class="step-wrapper">
        <step1 v-if="step === 0" @next-step="next" :email.sync="email" :mobile.sync="mobile" :username.sync="username"></step1>
        <step2 v-if="step === 1" @next-step="next" :email="email" :mobile="mobile" :username="username" ></step2>
        <step3 v-if="step === 2" @next-step="finish" :username="username"></step3>
        <div class="step-finish" v-if="step === 3">
          <div class="icon-wrapper">
            <icon-svg icon-class="success"></icon-svg>
          </div>
          <div class="finish-title">
            操作成功
          </div>
          <div class="finish-description">
            稍后将自动跳转至登录页面
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import Step1 from './modules/step1'
import Step2 from './modules/step2'
import Step3 from './modules/step3'
export default {
  name: 'forget-pwd',
  components: {
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      step: 0,
      email: '',
      mobile: '',
      username: '',
    }
  },
  methods: {
    next(data) {
      this.step++
    },
    finish() {
      this.next()
      // setTimeout(() => {
      //   this.$router.replace({
      //     path: '/login'
      //   })
      // }, 3000)
    }
  }
}
</script>
<style lang="less" scoped>
.site-wrapper {
  overflow: hidden;
  .site-content {
    margin-top: 50px;
    .site-title {
      font-size: 20px;
      text-align: center;
      padding: 15px 0;
      font-weight: bold;
      margin-bottom: 45px;
    }
    .list-steps {
      width: 800px;
      margin: 0 auto;
    }
    .step-wrapper {
      /deep/ .el-form-item .el-form-item__label{
        color: #333;
      }
      .step-finish {
        width: 450px;
        margin: 55px auto;
        text-align: center;
        .icon-wrapper {
          font-size: 75px;
          color: #52c41a;
        }
        .finish-title {
          margin: 20px 0;
          font-size: 24px;
        }
        .finish-description {
          line-height: 20px;
          color: rgba(0,0,0,.45);
        }
      }
    }
  }
}
</style>
