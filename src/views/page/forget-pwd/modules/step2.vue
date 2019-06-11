<template>
  <div class="step2">
    <el-form :model="form" :rules="rules" ref="form" size="medium">
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-select v-model="option">
              <el-option value="email" label="邮箱"></el-option>
              <el-option value="mobile" label="手机号"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-input :value="value" disabled></el-input>
          </el-col>
          </el-row>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="10">
          <el-col :span="13">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <el-button class="full-width" :loading="loading" @click="handleSendCode">{{ !loading ? btnText : sendingText }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="full-width" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getVerCode as getVerCodeApi, checkVerCode as checkVerCodeApi } from '@/api/forgetpwd'
export default {
  name: 'step2',
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
      option: 'email',
      form: {
        code: ''
      },
      token: '',
      loading: false,
      timeNumber: 60,
      btnText: '获取验证码',
      rules: {
        code: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    value() {
      return this[this.option]
    },
    sendingText() {
      return `${this.timeNumber}秒后重新获取`
    }
  },
  methods: {
    handleSendCode() {
      this.loading = true
      this.timeNumber = 10
      let timerId = setInterval(() => {
        if(this.timeNumber === 0){
          clearInterval(timerId)
          this.loading = false
        }else{
          this.timeNumber--
        }
      }, 1000)
      let type = this.option === 'email' ? 0 : 1
      getVerCodeApi(this.username, type, this.value).then((result) => {
        console.log(result)
        let { data } = result
        this.token = data.token
      }).catch((err) => { })
    },
    handleNext() {
      this.$refs['form'].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目!')
          return
        }
        checkVerCodeApi(this.username, this.token, this.form.code).then((result) => {
          console.log(result)
          this.$emit('next-step')
        }).catch((err) => {})    
      })
    }
  }
}
</script>
<style lang="less" scoped>
.step2 {
  width: 360px;
  margin: 55px auto;
}
</style>
