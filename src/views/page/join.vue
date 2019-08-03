<template>
  <div class="mobile-container">
    <h1 class="join-message">加入失败，您尚未注册，请填写相关信息进行注册，注册成功后可在百团争鸣小程序中查看更多详情</h1>
    <el-form class="join-form" :model="user" :rules="rules" ref="userForm" size="small">
      <el-form-item prop="username">
        <el-input :value="user.username" @input="handleInput" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model.trim="user.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="gender">
        <el-radio-group v-model="user.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
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
      <el-form-item prop="qq">
        <el-input v-model.trim="user.qq" placeholder="请输入QQ号"></el-input>
      </el-form-item>
      <el-form-item prop="descs">
        <el-input v-model.trim="user.descs" type="textarea" placeholder="自我描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="full-width" type="primary" @click="handleClick" >提交</el-button>
      </el-form-item>
    </el-form> 
    {{user}}
  </div>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi, join as joinApi, hasRegister as hasRegisterApi } from '@/api/comm'
import { debounce } from '@/utils'
import mixins from '@/views/organize/user/mixins'
export default {
  name: 'join',
  mixins: [mixins],
  data() {
    return {
      // code: this.$route.query.code,
      corid: this.$route.query.corid,
      openid: this.$route.query.openid,
      type: this.$route.query.type,
      user: {
        name: '',
        gender: '男',
        username: '',
        college: '',
        collegetie: '',
        email: '',
        mobile: '',
        wechart: '',
        qq: '',
        password: '',
        descs: ''
      },
    }
  },
  methods: {
    handleInput(val) {
      this.user.username = val
      this.handleSearch(val)
    },
    handleSearch: debounce(function (username) {
      this.$refs['userForm'].validateField('username', (errorMessage) => {
        if(!errorMessage){
          hasRegisterApi(username).then((result) => {
            console.log(result)
          }).catch((err) => {})
        }
      })
    }, 1000),
    handleClick() {
      this.$refs['userForm'].validate((valid) => {
         if (valid) {
          let collegeName = this.findCollegeName(this.collegeOptions, this.user.college)
          let collegetieName = this.findCollegeName(this.collegetieOptions, this.user.collegetie)
          joinApi(this.corid, this.openid, this.user.username, this.user.name, this.user.gender, this.user.password, collegeName, collegetieName, this.user.email, this.user.mobile, this.user.wechart, this.user.qq, this.user.descs).then((result) => {
            // console.log(result)
            this.$router.replace({
              path: '/result',
              query: {
                code: 0,
                corid: this.corid,
                openid: this.openid,
                type: this.type
              }
            })
          }).catch((err) => { console.log(err) })
        }        
      })
    },
  }
}
</script>

<style lang="less" scoped>
.join-message {
  margin-top: 3em;
  // text-align: center;
  line-height: 25px;
  color: #ff4d4f;
}
.join-form {
  margin-top: 1em;
  .el-form-item--small {
    margin-bottom: 1em;
  }
}
</style>
<style lang="less">
.err504-message {
  min-width: 300px;
}
</style>
