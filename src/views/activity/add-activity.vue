<template>
  <div class="app-container">
    <h1 class="page-title">添加社团活动</h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="activity" label-width="100px" :rules="rules" size="small" ref="activityForm" :hide-required-asterisk="true">
        <el-form-item prop="name" label="活动名称：">
          <el-input v-model="activity.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item prop="actLeader" label="活动负责人：">
          <el-select
            v-model="activity.actLeader"
            placeholder="活动负责人"
            class="half-width"
            clearable
            filterable
            remote
            :remote-method="handleSearch"
          >
            <el-option v-for="user in usersOptions" :key="user.user_id" :label="user.name" :value="user.user_id">
              <span style="float: left">{{ user.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ user.username }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="timer" label="活动时间：">
          <el-date-picker
            v-model="activity.timer"
            class="half-width"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="croWdPeople" label="面向人群：">
          <el-select v-model="activity.croWdPeople" placeholder="面向人群" multiple clearable class="full-width">
            <el-option v-for="college in collegeOptinos" :key="college.id" :label="college.value" :value="college.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动流程：">
          
          <div class="activity-process-wrapper">
            <el-steps :active="activity.processNodes.length" space="10%">
              <el-step v-for="(state, index) in activity.processNodes" :key="index">
                <el-button slot="title" @click="deleteProcess(index)" type="text">{{state}}</el-button>
              </el-step>
            </el-steps>
          </div>
          <el-popover
            placement="bottom-start"
            title="流程名称"
            width="300"
            trigger="click">
            <el-row :gutter="10">
              <el-col :span="19"><el-input v-model="processState"></el-input></el-col>
              <el-col :span="5"><el-button @click="addProcess">确定</el-button></el-col>
            </el-row>
            <el-button slot="reference" type="primary" icon="el-icon-plus" circle></el-button>
          </el-popover>
          
        </el-form-item>
        <el-form-item label="图片上传：" >
          <!-- {type: 0}上传图片、{type: 1}上传视频 -->
          <el-upload
            action="http://140.143.201.244:8081/HBO/sys/activity/uploudActivitiBananer"
            :data="{type: 0}"
            name="file"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
          >
          <el-button type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
          <div class="images-view" v-show="imageFiles.length">
            <div class="image-wrapper" v-for="(image, index) in imageFiles" :key="index">
              <el-image
              :src="image.filePath"
              fit="scale-down"></el-image>
              <div class="image-text-area" :title="image.fileName">
                <p class="image-text">{{image.fileName}}</p>
                <icon-svg class-name="image-delicon" icon-class="close"></icon-svg>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="附件上传：">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
    
            :file-list="enclosureList"
            :auto-upload="false">
            <el-button slot="trigger" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动简介：">
          <el-input v-model="activity.profile" type="textarea"  maxlength="200" :rows="6"
  show-word-limit placeholder="活动简介"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="活动详情：">
          <mce-editor v-model="activity.descs" ></mce-editor>
        </el-form-item>
        <!-- <el-form-item prop="collegetie" label="专业：">
          <el-select v-model="user.collegetie" placeholder="请选择专业" class="full-width">
            <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
          <el-input v-model="user.email" type="email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号：">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="wechart" label="微信：">
          <el-input v-model="user.wechart" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item prop="qq" label="QQ：">
          <el-input v-model="user.qq" placeholder="请输入QQ号"></el-input>
        </el-form-item>
        <el-form-item prop="descs" label="自我描述：">
          <mce-editor v-model="user.descs" ></mce-editor>
        </el-form-item>
        
        <el-form-item class="">
          <el-col :offset="5">
            <el-button type="primary" @click="addUser">添加</el-button>
          </el-col>
        </el-form-item> -->
      </el-form>
      <p>{{imageFiles}}</p>
      {{activity}}
    </el-card>
  </div>
</template>
<script>
import { getUsers as getUsersApi } from '@/api/user'
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import MceEditor from '@/components/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'add-activity',
  components: {
    MceEditor
  },
  data() {
    return {
      activity: {
        actName: '',              // 活动名称
        actLeader: '',            // 活动负责人
        timer: '',
        actStartTime: '',         // 活动开始时间
        actEndTime: '',           // 活动结束时间
        croWdPeople: [],          // 活动面向人群
        profile: '',              // 活动简介
        desc: '',                 // 活动详情
        processNodes: [],         // 活动流程

      },
      enclosureList: [],               // 附件文件
      processState: '',              // 输入的流程信息
      imageFiles: [],
      usersOptions: [],             // 活动负责人选项
      collegeOptinos: [],           // 面向人群选项
      rules: {}
    }
  },
  methods: {
    addProcess() {
      this.activity.processNodes.push(this.processState)
      this.processState = ''
    },
    deleteProcess(index) {
      this.activity.processNodes.splice(index, 1)
    },
    beforeImageUpload(file) {
      console.log('file', file)
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
    handleImageSuccess(res, file) {
      console.log(res, file)
      if(res.code !== 0){
        this.$message.error('上传失败，请重新上传!')
        return
      }
      let { data } = res
      this.imageFiles.push({ fileName: data.fileName, filePath: data.filePath, id: data.id })
      
    },
    handleSearch(val) {
      getUsersApi({name: val, page: 1, size: 9999, username: ''}).then((result) => {
        let { data } = result
        this.usersOptions = data.map((item) => {
          return { user_id: item.user_id, name: item.name, username: item.username }
        })
      })
    },
    getCollegeList() {
      getCollegeInfoApi(1, null).then((result) => {
        let { data } = result
        this.collegeOptinos = data.map((item) => {
          return { id: item.id, value: item.value }
        })
      })
    }
  },
  mounted() {
    this.getCollegeList()
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  margin-top: 30px;
  padding: 0 40px 0 20px;
  .el-date-editor {
    width: 50%;
  }
  .activity-process-wrapper {
    min-height: 65px;
  }
  .images-view {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .image-wrapper {
      position: relative;
      display: inline-block;
      width: 120px;
      height: 100px;
      margin-right: 10px;
      overflow: hidden;
      &:hover .image-text-area{
        bottom: 0;
      }
      .image-text-area {
        position: absolute;
        width: 100%;
        bottom: -25px;
        cursor: pointer;
        transition: all .3s;
        line-height: 20px;
        background: rgba(0, 0, 0, .3);
        color: #fff;
       
        .image-text {
          width: 80%;
          overflow: hidden;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
 
}
</style>
