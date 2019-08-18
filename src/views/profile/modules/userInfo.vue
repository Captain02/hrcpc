<template>
  <div class="user-wrapper">
    <h1 class="title">基本信息</h1>
    <el-form :model="user" label-width="100px" ref="userForm" :rules="rules" :hide-required-asterisk="true" label-position="left" size="small">
      <el-row :gutter="25">
        <el-col :span="12" style="border-right: 1px soild #e8e8e8;">
          <el-form-item label="学号：">
            <span>{{user.username}}</span>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="user.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="user.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="院系：" prop="college">
            <el-select v-model="user.college" placeholder="学院" class="full-width" @change="handleChange">
              <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业：" prop="collegetie">
            <el-select v-model="user.collegetie" placeholder="专业" class="full-width">
              <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model.trim="user.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="微信：" prop="wechart">
            <el-input v-model.trim="user.wechart" placeholder="微信"></el-input>
          </el-form-item>
          <el-form-item label="QQ：" prop="qq">
            <el-input v-model.trim="user.QQ" placeholder="QQ"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model.trim="user.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="加入时间：">
            <span>{{user.create_time}}</span>
          </el-form-item>
          <el-form-item label="所在部门：">
            <span>{{user.depts && user.depts.length ? user.depts[0].name : '无'}}</span>
          </el-form-item>
          <el-form-item label="拥有角色：">
            <template v-if="user.roles && user.roles.length">
              <el-tag style="margin-right: 15px; margin-bottom: 10px; font-size: 12px;" v-for="role in user.roles" size="small" :key="role.role_id">{{role.role_name}}</el-tag>
            </template>
            <template v-else>
              <span>无</span>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item prop="filepath" label-width="30px">
            <s-avatar :url="user.filepath" size="large" class="avatar" />
            <el-upload
              class="upload-btn"
              :action="`${$constants.BASE_API}user/chatHead`"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :data="{userId}"
              name="file"
              :on-success="uploadSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label-width="30px">
            <el-button @click="handleSave" class="full-width">保存修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="个人描述：">
            <Tinymce v-model="user.descs" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getUser as getUserApi, updateUserInfo as updateUserInfoApi } from '@/api/user'
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import { mapState } from 'vuex'
import Tinymce from '_c/Tinymce'
import SAvatar from '_c/SAvatar'
export default {
  name: 'user-info',
  components: {
    Tinymce,
    SAvatar
  },
  data() {
    return {
      user: {
        // user_id: 1
        // username: '201631000015',
        // name: '李嘉诚',
        // gender: '男',
        // college: 1,
        // collegetie: 1,
        // mobile: '13156335481',
        // wechart: 'w5656566',
        // QQ: '8692323565',
        // email: '66961565@qq.com',
        // depts: [{name: '事业部'}],
        // roles: [
        //   {role_id: 2,
        //   role_name: "超级管理员"},{role_id: 3,
        //   role_name: "编辑"},{role_id: 4,
        //   role_name: "扫地僧"},
        // ],
        // create_time: '2019-1-5',
        // descs: '<p>哈哈哈</p>',
        // filepath: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        // fileid: 7
      },
      collegeOptions: [],
      collegetieOptions: [],
      rules: {
        name: [
          { required: true, message: '请填写姓名!', trigger: 'blur' }
        ],
        username: [
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
        QQ: [
          { pattern: /^[1-9][0-9]{4,10}$/, message: '请输入正确的QQ号', trigger: ['blur', 'change'] }
        ],
        wechart: [
          { required: true, message: '请填写微信号', trigger: 'blur' },
          { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,  message: '请输入正确的微信号', trigger: ['blur', 'change'] }
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
  computed: {
    ...mapState({
      corid: (state) => state.user.corid,
      userId: (state) => state.user.userId
    })
  },
  methods: {
    handleChange(checkId) {
      this.user.collegetie = ''
      this.getCollegetieOptions(checkId)
    },
    getCollegetieOptions(id) {
      getCollegeInfoApi(null, id).then((result) => {
        let { data } = result
        this.collegetieOptions = this.formatCollegeData(data)
      })
    },
    formatCollegeData(list) {
      return list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    },
    findCollegeId(list, name) {
      let res = []
      list.some((item) => {
        if(item.label === name){
          res = item.id
          return true
        }
      })
      return res
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
    beforeUpload(file) {
      let types = ['image/jpeg', 'image/png']
      const isJPG = types.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    uploadSuccess(response) {
      // console.log(response)
      let { data } = response
      this.user.filepath = data.url
      this.user.fileid = data.id
    },
    handleSave() {
      this.$refs['userForm'].validate((valid) => {
        if(!valid) {
          this.$message.error('请填写相关项目')
          return
        }
        let collegeName = this.findCollegeName(this.collegeOptions, this.user.college)
        let collegetieName = this.findCollegeName(this.collegetieOptions, this.user.collegetie)

        updateUserInfoApi(this.user.user_id, this.user.name, this.user.gender, collegeName, collegetieName, this.user.mobile, this.user.wechart, this.user.QQ, this.user.email, this.user.descs, this.user.fileid).then((res) => {
          // console.log(res)
          this.$store.dispatch('GetUserInfo').then(() => {
            this.$message.success('修改成功!')
          })
        }).catch((err) => { console.log(err) })
      })
    }
  },
  mounted() {
    Promise.all([getCollegeInfoApi(1, null), getUserApi(this.userId)]).then((result) => {
      console.log(result)
      this.collegeOptions = this.formatCollegeData(result[0].data)

      this.user = result[1].data
      this.user.college = this.findCollegeId(this.collegeOptions, this.user.college)
      
      getCollegeInfoApi(null, this.user.college).then((result) => {
        let { data } = result
        this.collegetieOptions = this.formatCollegeData(data)
        // 将专业名称转换为相应的id
        this.user.collegetie = this.findCollegeId(this.collegetieOptions, this.user.collegetie)
      })
    }).catch((err) => console.log(err))
  }
}
</script>
<style lang="less" scoped>
.user-wrapper {
  padding: 8px 40px;
  .title {
    line-height: 23px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: rgba(0,0,0,.85);
    // margin: 0;
  }
  .avatar {
    display: inline-block;
    vertical-align: bottom;
  }
  .upload-btn {
    display: inline-block;
    margin-left: 30px;
  }
}
</style>