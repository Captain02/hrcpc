<template>
  <div class="mobile-container">
    <el-form class="join-form" :model="user" :rules="rules" ref="userForm" size="small">
      <el-form-item prop="name">
        <el-input v-model.trim="user.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="gender">
        <el-radio-group v-model="user.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item prop="persionnum">
        <el-input v-model.trim="user.persionnum" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" type="password" placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item prop="college">
        <el-select v-model="user.college" placeholder="请选择院系" class="full-width" @change="handleChange">
          <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="collegetie">
        <el-select v-model="user.collegetie" placeholder="请选择专业" class="full-width">
          <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model.trim="user.email" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model.trim="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="wechart">
        <el-input v-model.trim="user.wechart" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item prop="QQ">
        <el-input v-model.trim="user.qq" placeholder="请输入QQ号"></el-input>
      </el-form-item>
      <el-form-item prop="descs">
        <el-input v-model.trim="user.descs" type="textarea" placeholder="自我描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="full-width" type="primary" >提交</el-button>
      </el-form-item>
      <!-- {{user}} -->
    </el-form> 
  </div>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
export default {
  name: 'join',
  data() {
    return {
      user: {
        corid: this.$route.query.corid,
        openid: this.$route.query.corid,
        name: '',
        gender: '男',
        persionnum: '',
        college: '',
        collegetie: '',
        email: '',
        mobile: '',
        wechart: '',
        qq: '',
        password: '',
        descs: ''
      },
      collegeOptions: [],
      collegetieOptions: [],
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        persionnum: [
          { required: true, message: '请填写学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请输入正确的学号', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        wechart: [
          { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,  message: '请输入正确的微信号', trigger: ['blur', 'change'] }
        ],
        qq: [
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请输入正确的QQ号', trigger: ['blur', 'change'] }
        ],
        college: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        collegetie: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleChange(checkId) {
      this.user.collegetie = ''
      this.getCollegetieOptions(checkId)
    },
    getCollegetieOptions(id) {
      getCollegeInfoApi(null, id).then((result) => {
        let { data: list } = result
        this.collegetieOptions = list.map((item) => {
          return { id: item.id, value: item.id, label: item.value }
        })
      })
    }
  },
  mounted() {
    getCollegeInfoApi(1, null).then((result) => {
      // console.log(result)
      let { data: list } = result
      this.collegeOptions = list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    })
  }
}
</script>
<style lang="less" scoped>
.join-form {
  margin-top: 3em;
  .el-form-item--small {
    margin-bottom: 1em;
  }
}
</style>
