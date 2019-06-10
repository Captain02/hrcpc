<template>
  <div class="step1">
    <el-form :model="form" ref="form1" :rules="rules" label-width="60px" size="medium" :hide-required-asterisk="true" class="reset-form">
      <el-form-item prop="username">
        <span slot="label">学号：</span>
        <el-input v-model="form.username" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="next-btn full-width" type="primary" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserByUsername as getUserByUsernameApi } from '@/api/forgetpwd'
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
    }
  },
  data() {
    return {
      form: {
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写学号!', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请输入正确的学号', trigger: ['blur', 'change'] }
        ],
      },
    }
  },
  methods: {
    handleNext() {
      this.$refs['form1'].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目!')
          return
        }
        getUserByUsernameApi(this.form.username).then((result) => {
          let { data } = result
          this.$emit('update:email', data.email)
          this.$emit('update:mobile', data.mobile)
          this.$emit('next-step')
        }).catch((err) => { })
      })
    },
  }
}
</script>
<style lang="less" scoped>
.step1 {
  width: 450px;
  margin: 55px auto;
  padding-right: 40px; 
  .reset-form {
    .el-form-item{
      span{
        color: #333;
      }
    }
  }
}
  
</style>
