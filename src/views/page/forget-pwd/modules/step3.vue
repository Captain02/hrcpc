<template>
  <div class="step3">
    <el-form :model="form" ref="form" :rules="rules" size="medium" :hide-required-asterisk="true" label-width="100px">
      <el-form-item label="新密码：" prop="password">
        <el-input type="password" v-model="form.password" placeholder="输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" placeholder="再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="full-width" @click="handleFinish">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'step3',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.form.password !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateConfirmPassword= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        confirmPassword: ''
      },
      rules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleFinish() {
      this.$refs['form'].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目!')
          return
        }
        this.$emit('next-step')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.step3 {
  width: 400px;
  margin: 55px auto;
  padding-right: 40px; 
}
</style>
