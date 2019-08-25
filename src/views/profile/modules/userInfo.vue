<template>
  <div class="user-wrapper">
    <!-- <h1 class="title">基本信息</h1> -->
    <el-form :model="user" label-width="100px" ref="userForm" :rules="rules" :hide-required-asterisk="true" label-position="left" size="small">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>基本信息</span>
            </div>
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
            <el-form-item label="QQ：" prop="QQ">
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
            <el-form-item label-width="0">
              <el-button @click="handleSave" type="primary" class="full-width">保存修改</el-button>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>修改头像</span>
              <div class="action-btn">

                <upload
                  :action="`${$constants.BASE_API}user/chatHead`"
                  :show-file-list="false"
                  :data="{userId}"
                  name="file"
                  @on-success="uploadSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </upload>
              </div>
            </div>
            <el-form-item prop="filepath" label-width="0">
              <s-avatar :url="user.filepath || avatar" size="large" class="avatar" />
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="24">
          <el-card>
            <div slot="header">
              <span>个人描述</span>
            </div>
            <el-form-item label-width="0">
              <Tinymce v-model="user.descs" />
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {  updateUser as updateUserApi } from '@/api/user'
import mixins from '@/views/organize/user/mixins'
import { mapState, mapMutations } from 'vuex'
import Upload from '_c/Upload'
import Tinymce from '_c/Tinymce'
import SAvatar from '_c/SAvatar'
export default {
  name: 'user-info',
  components: {
    Upload,
    Tinymce,
    SAvatar
  },
  mixins: [mixins],
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
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid,
      userId: (state) => state.user.userId,
      avatar: (state) => state.user.avatar
    })
  },
  methods: {
    ...mapMutations(['SET_AVATAR']),
    uploadSuccess(response) {
      // console.log(response)
      let { data } = response
      this.user.filepath = data.url
      this.user.fileid = data.id
      this.SET_AVATAR(data.url)
    },
    handleSave() {
      this.$refs['userForm'].validate((valid) => {
        if(!valid) {
          this.$message.error('请填写相关项目')
          return
        }
        let collegeName = this.findCollegeName(this.collegeOptions, this.user.college)
        let collegetieName = this.findCollegeName(this.collegetieOptions, this.user.collegetie)

        updateUserApi(this.user.user_id, this.user.name, this.user.gender, collegeName, collegetieName, this.user.mobile, this.user.wechart, this.user.QQ, this.user.email, this.user.descs, this.user.fileid).then((res) => {
          // console.log(res)
          this.$store.dispatch('GetUserInfo').then(() => {
            this.$message.success('修改成功!')
          })
        }).catch((err) => { console.log(err) })
      })
    }
  },
  mounted() {
    this.getUserAndCollegeInfo()
  }
}
</script>
<style lang="less" scoped>
.user-wrapper {
  padding: 8px 40px;
  .action-btn {
    float: right;
    margin: 0;
    padding: 0;
  }
  .card-header {
    line-height: 32px;
  }
  .avatar {
    margin: 0 auto;
  }
}
</style>