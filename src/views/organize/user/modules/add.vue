<template>
  <div class="app-container">
    <h1 class="page-title"> 添加新成员 </h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="user" label-width="120px" :rules="rules" ref="userForm" :hide-required-asterisk="true">
        <el-form-item label="默认头像：">
          <div class="avatar-area">
            <img src="/file/persionDefaultHeadPicture/20190517155219man.png" alt="默认头像男" v-if="user.sex === '男'">
            <img src="/file/persionDefaultHeadPicture/20190517155056woman.png" alt="默认头像女" v-else>
          </div>
        </el-form-item>
        <el-form-item prop="username" label="用户名(学号)：">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别：">
          <el-radio-group v-model="user.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="persionnum" label="学号：">
          <el-input v-model="user.persionnum" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="college" label="院系：">
          <el-select v-model="user.college" placeholder="请选择院系" class="full-width" @change="handleChange">
            <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="collegetie" label="专业：">
          <el-select v-model="user.collegetie" placeholder="请选择专业" class="full-width">
            <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
          <el-input v-model="user.email" type="email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号：">
          <el-input v-model="user.mobile" type="number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="wechart" label="微信：">
          <el-input v-model="user.wechart" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item prop="qq" label="QQ：">
          <el-input v-model="user.qq" type="number" placeholder="请输入QQ号"></el-input>
        </el-form-item>
        <el-form-item prop="descs" label="自我描述：">
          <mce-editor v-model="user.descs" ></mce-editor>
        </el-form-item>
        
        <el-form-item class="">
          <el-col :offset="5">
            <el-button type="primary" @click="addUser">添加</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <!-- {{user}} -->
    </el-card>
  </div>
</template>
<script>
import { addUser as addUserApi } from '@/api/user'
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import MceEditor from '@/components/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'add-user',
  components: {
    MceEditor
  },
  data() {
    return {
      user: {
        name: '',               // 成员姓名
        username: '',           // 用户名
        gender: '男',              // 性别
        persionnum: '',          // 学号
        password: '',
        college: '',            // 所在学院
        collegetie: '',         // 所在专业
        email: '',              // 邮箱
        mobile: '',             // 手机号
        wechart: '',            // 微信
        qq: '',                 // qq
        descs: ''               // 简介
      },
      rules: {
        name: [
          { required: true, message: '请填写姓名!', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
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
        qq: [
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请输入正确的QQ号', trigger: ['blur', 'change'] }
        ],
        college: [
          { required: true, message: '请选择院系', trigger: 'change' }
        ],
        collegetie: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      },
      collegeOptions: [],
      collegetieOptions: [],
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
    },
    // handleItemChange(val) {
    //   this.typeId = null
    //   this.parentValue = val[0]
    //   if(!this.options.find((item) => item.id === this.parentValue && item.children.length)){
    //      getCollegeInfoApi(this.typeId, this.parentValue).then((result) => {
    //       // console.log(result)
    //       let { data: list } = result
    //       this.options.some((item) => {
    //         if(item.id === this.parentValue){
    //           item.children = list.map((child) => {
    //             return { id: child.id, label: child.value, value: child.id }
    //           })
    //           return true
    //         }
    //       })
    //     })
    //   }
    // },
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
    addUser() {
      // 添加成员
      this.$refs['userForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        let collegeName = this.findCollegeName(this.collegeOptions, this.user.college)
        let collegetieName = this.findCollegeName(this.collegetieOptions, this.user.collegetie)
        
        addUserApi( this.user.name, this.user.username, this.user.gender, this.user.persionnum, this.user.password, this.user.email, this.user.mobile, this.user.wechart, this.user.qq, this.user.descs, collegeName, collegetieName).then((result) => {
          this.$message.success('添加成功')
          setTimeout(() => {
            this.$router.replace({name: 'user'})
          }, 1500)
        }).catch((err) => {
          console.log(err)
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
.form-wrapper {
  // width: 800px;
  margin-top: 30px;
  padding: 0 40px 0 20px;
}
</style>
