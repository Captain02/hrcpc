<template>
  <el-form size="small" :model="user" :rules="rules"  ref="userForm" >
    <el-form-item prop="name">
      <el-input v-model.trim="user.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="gender">
      <el-radio-group v-model="user.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="username">
      <el-input :value="user.username" @input="handleInput" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPwd">
      <el-input v-model="user.confirmPwd" placeholder="确认密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="college">
      <el-select v-model="user.college" placeholder="院系" class="full-width" @change="handleChange">
        <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="collegetie">
      <el-select v-model="user.collegetie" placeholder="专业" class="full-width">
        <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model.trim="user.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="wechart">
      <el-input v-model.trim="user.wechart" placeholder="微信"></el-input>
    </el-form-item>
    <el-form-item prop="qq">
      <el-input v-model.trim="user.qq" placeholder="QQ"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="full-width" type="primary" @click="handleSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { hasRegister as hasRegisterApi } from '@/api/comm'
import { register as registerApi } from '@/api/login'
import mixins from '../mixins'
import { debounce } from '@/utils'

export default {
  name: 'register-form',
  mixins: [mixins],
  data() {
    return {
      user: {
        name: '',
        gender: '男',
        username: '',
        password: '',
        confirmPwd: '',
        college: '',
        collegetie: '',
        mobile: '',
        wechart: '',
        qq: ''
      }
    }
  },
  methods: {
    handleInput(val) {
      this.user.username = val
      this.handleSearch(val)
    },
    handleSearch: debounce(function(username) {
      this.$refs['userForm'].validateField('username', (errorMessage) => {
        if(!errorMessage){
          hasRegisterApi(username).then((result) => {
            console.log(result)
          }).catch((err) => {})
        }
      })
    }, 1000),
    handleSubmit() {
      this.$refs['userForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }

        let collegeName = this.findCollegeName(this.collegeOptions, this.user.college)
        let collegetieName = this.findCollegeName(this.collegetieOptions, this.user.collegetie)

        registerApi( this.user.name, this.user.username, this.user.gender, this.user.password, this.user.mobile, this.user.wechart, this.user.qq, collegeName, collegetieName).then((result) => {
          console.log(result)
          this.$message.success('注册成功')
          this.$refs['userForm'].resetFields()
          this.$emit('success')
          
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  mounted() {
    this.getCollegeOptions()
  }
}
</script>