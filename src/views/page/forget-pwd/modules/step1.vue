<template>
  <div class="step1">
    <el-form :model="form" ref="form" :rules="rules" label-width="70px" size="medium" :hide-required-asterisk="true" class="reset-form">
      <el-form-item label="学号：" prop="username">
        <el-input v-model="form.username" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item label="验证码：" prop="captcha">
        <el-input v-model="form.captcha" style="width: 60%;" placeholder="验证码"></el-input>
        <div class="captcha-wrapper" @click="getCaptchaSrc">
          <img :src="captchaSrc" alt="验证码">
        </div>
          
      </el-form-item>
      <el-form-item>
        <el-button class="next-btn full-width" type="primary" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserByUsername as getUserByUsernameApi, getCaptcha as getCaptchaApi } from '@/api/forgetpwd'
export default {
  name: 'step1',
  props: {
    email: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      form: {
        username: '',
        captcha: '',
        key: '',
      },
      captchaSrc: '',
      rules: {
        username: [
          { required: true, message: '请填写学号!', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请输入正确的学号', trigger: ['blur', 'change'] }
        ],
        captcha: [
          { required: true, message: '请填写验证码!', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    handleNext() {
      this.$refs['form'].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目!')
          return
        }
        getUserByUsernameApi(this.form.username, this.form.key, this.form.captcha).then((result) => {
          let { data } = result
          this.$emit('update:email', data.email)
          this.$emit('update:mobile', data.mobile)
          this.$emit('update:username', data.username)
          this.$emit('next-step')
        }).catch((err) => { })
      })
    },
    getCaptchaSrc() {
      getCaptchaApi().then((result) => {
        console.log(result)
        let { data } = result
        this.captchaSrc = `data:image/png;base64,${data.img}`
        this.form.key = data.key
      }).catch((err) => { })
    }
  },
  mounted() {
    this.getCaptchaSrc()
  }
}
</script>
<style lang="less" scoped>
.step1 {
  width: 400px;
  margin: 55px auto;
  padding-right: 40px; 
  .captcha-wrapper {
    width: 38%;
    display: inline-block;
    // height: 38px;
    // float: right;
    img{
      width: 100%;
      cursor: pointer;
      vertical-align:middle
    }
  }
}
  
</style>
