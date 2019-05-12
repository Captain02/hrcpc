<template>
  <div class="app-container">
    <h1 class="page-title"> 修改成员信息 </h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="user" label-width="100px" :rules="rules" ref="userForm" :hide-required-asterisk="true">
        <el-form-item prop="fileId" label="上传头像：">
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
        </el-form-item>
        <el-form-item prop="username" label="姓名：">
          <el-input v-model="user.username" placeholder="请输入姓名"></el-input>
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
            <el-button type="primary" @click="updateUser">保存</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <!-- {{user}} -->
    </el-card>
  </div>
</template>
<script>
import { getUser as getUserApi, updateUser as updateUserApi, getCollegeInfo as getCollegeInfoApi } from '@/api/user'
import { mapState } from 'vuex'
import MceEditor from '@/components/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'edit-user',
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
        userId: null,
        fileId: '',
        username: '',           // 成员名
        sex: '男',              // 性别
        studentId: '',          // 学号
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
        username: [
          { required: true, message: '请输入姓名！', trigger: 'blur' },
        ],
        studentId: [
          { required: true, message: '请输入学号！', trigger: 'blur' },
        ],
        collegeInfo: [
          { validator: validateCollegeInfo, trigger: 'change' }
        ]
      },
      avatar: null,
      imagename: '',
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
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      if(res.data.code !== 0){
        this.$message.error('上传失败，请重新上传!')
        return
      }
      this.avatar = URL.createObjectURL(file.raw)
      this.imagename = res.data.imagename
      this.user.fileId = res.data.id
    },
    beforeAvatarUpload(file) {
      let typeWhiteList = ['image/jpeg', 'image/png']
      const isJPG = typeWhiteList.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    deleteAvatar() {
      // 删除头像
    },
    handleItemChange(val) {
      this.typeId = null
      this.parentValue = val[0]
      // 判断如果有children说明已经获取了，就不用再次获取
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
    updateUser() {
      // 添加成员
      this.$refs['userForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        let userId = this.user.userId,
            username = this.user.username,
            gender = this.user.sex,
            persionnum = this.user.studentId,
            email = this.user.email,
            mobile = this.user.mobile,
            wechart = this.user.wechart,
            QQ = this.user.QQ,
            descs = this.user.descs,
            [college, collegetie] = this.computedCollege
        updateUserApi( this.corid, userId, username, gender, persionnum, email, mobile, wechart, QQ, descs, college, collegetie).then((result) => {
          this.$message.success('修改成功')
          setTimeout(() => {
            this.$router.replace({name: 'user'})
          }, 1500)
        }).catch((err) => {
          console.log(err)
        })
      })
      
    },
    setUserDate(user) {
      this.user.userId = user.userId
      this.user.fileId = user.fileId
      this.user.username = user.username
      this.user.sex = user.gender
      this.user.studentId = user.persionnum
      this.user.collegeInfo = [user.college, user.collegetie]
      this.user.email = user.email
      this.user.mobile = user.mobile
      this.user.wechart = user.wechart
      this.user.QQ = user.QQ
      this.user.descs = user.descs
    }
  },
  mounted() {
    let id = this.$route.params.id
    Promise.all([getCollegeInfoApi(this.typeId, this.parentValue), getUserApi(id)]).then((result) => {
      // console.log(result)
      let [collegeRes, userRes] = result
      let { data: list } = collegeRes
      let user  = Object.assign({}, userRes.user) 
      this.options = list.map((item) => {
        // 查找parentId
        if(item.value === user.college){
          // 将college对应的学院设置成id
          user.college = item.id
          this.parentValue = item.id
        }
        return {id: item.id, label: item.value, value: item.id, children: []}
      })
      if(this.parentValue){
        getCollegeInfoApi(null, this.parentValue).then((res => {
          let { data } = res
          this.options.some((item) => {
            if(item.id === this.parentValue){
              item.children = data.map((child) => {
                if(child.value === user.collegetie){
                  // 将collegetie对应的系别设置成id
                  user.collegetie = child.id
                }
                return { id: child.id, label: child.value, value: child.id }
              })
              return true
            }
          })
          // 设置用户信息
          this.setUserDate(user)
        }))
      }
      
    }).catch((err) => {})
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
