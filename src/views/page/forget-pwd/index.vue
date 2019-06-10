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
        <step1 v-if="step === 0" @next-step="next" :email.sync="email" :mobile.sync="mobile"></step1>
        <step2 v-if="step === 1" @next-step="next" :email="email" :mobile="mobile"></step2>
        <step3 v-if="step === 2" @next-step="finish"></step3>
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
      mobile: ''
    }
  },
  methods: {
    next(data) {
      this.step++
    },
    finish() {

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
    // .step-wrapper {
    //   width: 400px;
    //   margin: 55px auto;
    //   padding-right: 40px; 
    // }
  }
}
</style>
