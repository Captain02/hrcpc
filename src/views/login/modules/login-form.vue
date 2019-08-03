<template>
  <el-form size="small" :model="loginForm" :rules="dataRule" ref="loginForm" @keyup.enter.native="handleSubmit()" status-icon>
    <el-form-item prop="userName">
      <el-input :value="loginForm.userName" @input="handleInput" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="team">
      <el-select v-model="loginForm.team" class="full-width" placeholder="请选择所属社团" clearable no-data-text="未检测到您所加入的社团">
        <el-option v-for="team in teamOptions" :label="team.corname" :key="team.id" :value="team.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn full-width" type="primary" @click="handleSubmit()">登录</el-button>
      <el-link :underline="false" style="float: right; font-size: 13px;" href="#/forget-pwd">忘记密码？</el-link>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserInCors as getUserInCorsApi } from '@/api/login'
import { debounce } from '@/utils'
export default {
  name: 'login-form',
  data() {
    return {
      loginForm: {
        userName: '',
        password: '',
        team: ''
      },
      teamOptions: [],
      dataRule: {
        userName: [
          { required: true, message: '学号不能为空', trigger: 'blur' }
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
          this.$message.success('登录成功!')
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
    handleSearch: debounce(function (username) {
      getUserInCorsApi(username).then((result) => {
        console.log(result)
        let { data } = result
        this.teamOptions = data
      }).catch((err) => {})
    }, 1000),
    handleInput(val) {
      this.loginForm.userName = val
      this.handleSearch(val)
    }
  }
}
</script>
<style lang="less" scoped>
.login-btn {
  margin-top: 15px;
}
</style>
