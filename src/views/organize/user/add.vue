<template>
  <div class="app-container">
    <h1 class="page-title"> 添加新成员 </h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="user" label-width="100px" :rules="rules" ref="userForm" :hide-required-asterisk="true">
        <el-form-item label="默认头像：">
          <div class="avatar-area">
            <img src="http://140.143.201.244:8081/HBO/file/persionDefaultHeadPicture/20190516000727man.png" alt="默认头像男" v-if="user.sex === '男'">
            <img src="http://140.143.201.244:8081/HBO/file/persionDefaultHeadPicture/20190516000741woman.png" alt="默认头像女" v-else>
          </div>
        </el-form-item>
        <!-- <el-form-item prop="fileId" label="上传头像：">
          <div v-if="avatar" class="avatar-view" @click="deleteAvatar">
            <img :src="avatar" alt="avatar">
            <div class="avatar-mark">
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <el-upload
            v-else
            class="avatar-uploader"
            action="http://192.168.137.182:8081/HBO/img/save"
            :data="{corid}"
            name="fileId"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，不上传则使用默认头像</div>
          </el-upload>
        </el-form-item> -->
        <el-form-item prop="username" label="用户名：">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别：">
          <el-radio-group v-model="user.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="studentId" label="学号：">
          <el-input v-model="user.studentId" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="collegeInfo" label="院系：">
          <el-cascader
            v-model="user.collegeInfo"
            class="college-cascader"
            placeholder="请选择院系信息"
            @active-item-change="handleItemChange"
            clearable
            :options="options"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
          <el-input v-model="user.email" type="email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号：">
          <el-input v-model="user.mobile" type="number" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="wechart" label="微信：">
          <el-input v-model="user.wechart" placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item prop="QQ" label="QQ：">
          <el-input v-model="user.QQ" type="number" placeholder="请输入QQ"></el-input>
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
import { addUser as addUserApi, getCollegeInfo as getCollegeInfoApi } from '@/api/user'
import { mapState } from 'vuex'
import MceEditor from '@/components/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'add-user',
  components: {
    MceEditor
  },
  data() {
    const validateCollegeInfo = (rule, value, callback) => {
      if(value.length < 2) {
        return callback(new Error('请选择完整的院系信息！'))
      }
      callback()
    }
    return {
      user: {
        // fileId: '',
        name: '',               // 成员姓名
        username: '',           // 用户名
        sex: '男',              // 性别
        studentId: '',          // 学号
        password: '',
        // college: '',            // 所在学院
        // collegetie: '',         // 所在系别
        // major: '',              // 所在专业
        collegeInfo: [],
        email: '',              // 邮箱
        mobile: '',             // 手机号
        wechart: '',            // 微信
        QQ: '',                 // qq
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
        studentId: [
          { required: true, message: '请输入学号！', trigger: 'blur' },
        ],
        collegeInfo: [
          { validator: validateCollegeInfo, trigger: 'change' }
        ]
      },
      // avatar: null,
      // avatarId: null,
      // imagename: '',
      typeId: 1,                // 为1查询所有的院系
      parentValue: null,        // 查询系别
      options: []
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    }),
    computedCollege() {
      let collegeId = this.user.collegeInfo[0]
      let majorId = this.user.collegeInfo[1]
      let res = []
      this.options.some((item) => {
        if(item.id === collegeId){
          item.children.some((child) => {
            if(child.id === majorId){
              res.push(item.label, child.label)
              return true
            }
          })
          return true
        }
      })
      return res
    }
  },
  methods: {
    // handleAvatarSuccess(res, file) {
    //   console.log(res, file)
    //   if(res.data.code !== 0){
    //     this.$message.error('上传失败，请重新上传!')
    //     return
    //   }
    //   this.avatar = URL.createObjectURL(file.raw)
    //   this.avatarId = res.data.id
    //   this.imagename = res.data.imagename
    //   this.user.fileId = res.data.url
    // },
    // beforeAvatarUpload(file) {
    //   let typeWhiteList = ['image/jpeg', 'image/png']
    //   const isJPG = typeWhiteList.includes(file.type)
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式或PNG格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // },
    // deleteAvatar() {
    //   // 删除头像
    // },
    handleItemChange(val) {
      this.typeId = null
      this.parentValue = val[0]
      if(!this.options.find((item) => item.id === this.parentValue && item.children.length)){
         getCollegeInfoApi(this.typeId, this.parentValue).then((result) => {
          // console.log(result)
          let { data: list } = result
          this.options.some((item) => {
            if(item.id === this.parentValue){
              item.children = list.map((child) => {
                return { id: child.id, label: child.value, value: child.id }
              })
              return true
            }
          })
        })
      }
    },
    addUser() {
      // 添加成员
      this.$refs['userForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        let name = this.user.name,
            username = this.user.username,
            gender = this.user.sex,
            persionnum = this.user.studentId,
            email = this.user.email,
            mobile = this.user.mobile,
            wechart = this.user.wechart,
            QQ = this.user.QQ,
            descs = this.user.descs,
            password = this.user.password,
            [college, collegetie] = this.computedCollege
        addUserApi( this.corid, name, username, gender, persionnum, password, email, mobile, wechart, QQ, descs, college, collegetie).then((result) => {
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
    getCollegeInfoApi(this.typeId, this.parentValue).then((result) => {
      // console.log(result)
      let { data: list } = result
      this.options = list.map((item) => {
        return {id: item.id, label: item.value, value: item.id, children: []}
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
.college-cascader {
  width: 100%;
}
</style>
<style lang="less">
  /** 头像上传样式 **/
  .avatar-area {
    width: 150px;
    height: 150px;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .avatar-view {
    position: relative;
    width: 150px;
    height: 150px;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    &:hover .avatar-mark{
      opacity: 1;
      color: #409EFF;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .avatar-mark {
      position:absolute;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      opacity: 0;
      background: rgba(0, 0, 0, 0.25);
      transition: all .3s;
      i {
        font-size: 25px;
        line-height: 150px;
        margin-left: 60px;
      }
    }
  }
.avatar-uploader{
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .el-upload__tip {
    margin-top: 0;
    line-height: 30px;
  }
}


</style>
