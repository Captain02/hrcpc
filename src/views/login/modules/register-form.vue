<template>
  <el-form size="small" :model="registerForm" :rules="rules"  ref="registerForm" >
    <el-form-item prop="name">
      <el-input v-model.trim="registerForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="gender">
      <el-radio-group v-model="registerForm.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="username">
      <el-input :value="registerForm.username" @input="handleInput" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="registerForm.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPwd">
      <el-input v-model="registerForm.confirmPwd" placeholder="确认密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="college">
      <el-select v-model="registerForm.college" placeholder="院系" class="full-width" @change="handleChange">
        <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="collegetie">
      <el-select v-model="registerForm.collegetie" placeholder="专业" class="full-width">
        <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model="registerForm.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="wechart">
      <el-input v-model="registerForm.wechart" placeholder="微信"></el-input>
    </el-form-item>
    <el-form-item prop="qq">
      <el-input v-model="registerForm.qq" placeholder="QQ"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="full-width" type="primary" @click="handleSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi, hasRegister as hasRegisterApi } from '@/api/comm'
import { register as registerApi } from '@/api/login'
import { debounce } from '@/utils'

export default {
  name: 'register-form',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写密码'))
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.registerForm.validateField('confirmPwd')
        }
        callback()
      }
    }
    const validateConfirmPassword= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次填写密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
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
      },
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请填写学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请填写正确的学号', trigger: ['blur', 'change'] }
        ],
        college: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        collegetie: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请填写正确的手机号', trigger: ['blur', 'change'] }
        ],
        wechart: [
          { required: true, message: '请填写微信号', trigger: 'blur' },
          { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,  message: '请填写正确的微信号', trigger: ['blur', 'change'] }
        ],
        qq: [
          { required: true, message: '请填写QQ号', trigger: 'blur' },
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请填写正确的QQ号', trigger: ['blur', 'change'] }
        ],
      },
      collegeOptions: [],
      collegetieOptions: []
    }
  },
  methods: {
    handleInput(val) {
      this.registerForm.username = val
      this.handleSearch(val)
    },
    handleSearch: debounce(function(username) {
      this.$refs['registerForm'].validateField('username', (errorMessage) => {
        if(!errorMessage){
          hasRegisterApi(username).then((result) => {
            console.log(result)
          }).catch((err) => {})
        }
      })
    }, 1000),
    handleChange(checkId) {
      this.registerForm.collegetie = ''
      this.getCollegetieOptions(checkId)
    },
    getCollegetieOptions(id) {
      getCollegeInfoApi(null, id).then((result) => {
        let { data: list } = result
        this.collegetieOptions = list.map((item) => {
          return { id: item.id, value: item.id, label: item.value }
        })
      })
    },
    findCollegeName(list, id) {
      let res = ''
      list.some((item) => {
        if(item.id === id){
          res = item.label
          return true
        }
      })
      return res
    },
    handleSubmit() {
      this.$refs['registerForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }

        let collegeName = this.findCollegeName(this.collegeOptions, this.registerForm.college)
        let collegetieName = this.findCollegeName(this.collegetieOptions, this.registerForm.collegetie)

        registerApi( this.registerForm.name, this.registerForm.username, this.registerForm.gender, this.registerForm.password, this.registerForm.mobile, this.registerForm.wechart, this.registerForm.qq, collegeName, collegetieName).then((result) => {
          console.log(result)
          this.$message.success('注册成功')
          this.$refs['registerForm'].resetFields()
          this.$emit('success')
          
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  mounted() {
    getCollegeInfoApi(1, null).then((result) => {
      let { data: list } = result
      this.collegeOptions = list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    })
  },
}
</script>