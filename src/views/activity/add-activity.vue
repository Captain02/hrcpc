<template>
  <div class="app-container">
    <h1 class="page-title">添加社团活动</h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="activity" label-width="100px" :rules="rules" size="small" ref="activityForm" :hide-required-asterisk="true">
        <el-form-item prop="actName" label="活动名称：">
          <el-input v-model="activity.actName" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动简介：">
          <el-input v-model="activity.profile" type="textarea"  maxlength="200" :rows="6"
  show-word-limit placeholder="活动简介"></el-input>
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
            :limit="1"
            action="http://140.143.201.244:8081/HBO/sys/activity/uploudActivitiBananer"
            :data="{type: 0}"
            name="file"
            :show-file-list="false"
            :on-success="(res, file) => {this.handleUpdateSuccess(res, file, 'image')}"
            :before-upload="beforeImageUpload"
          >
          <el-button type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
          <div class="images-view" v-if="imageFile">
            <div class="image-wrapper">
              <el-image
              :src="imageFile.filePath"
              fit="scale-down"></el-image>
              <div class="image-text-area" :title="imageFile.fileName" @click="deleteImage">
                <p class="image-text">{{imageFile.fileName}}</p><icon-svg class-name="image-delicon" icon-class="close"></icon-svg>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="视频上传：" >
          <!-- {type: 0}上传图片、{type: 1}上传视频 -->
          <el-upload
            :limit="1"
            action="http://140.143.201.244:8081/HBO/sys/activity/uploudActivitiBananer"
            :data="{type: 1}"
            name="file"
            :on-remove="deleteVideo"
            :on-success="(res, file) => {this.handleUpdateSuccess(res, file, 'video')}"
            :before-upload="beforeVideoUpload"
          >
          <el-button type="primary" >上传视频</el-button>
          <div slot="tip" class="el-upload__tip">请上传MP4、MPEG、WMV格式或AVI格式文件，且不超过200M</div>
          </el-upload>
          <div class="video-view" v-if="videoFile">
            <video-player :video-source="videoFile.filePath" :video-type="videoFile.type"></video-player>
          </div>
        </el-form-item>
        <el-form-item label="附件上传：">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false">
            <el-button slot="trigger" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
        
        <el-form-item prop="desc" label="活动详情：">
          <mce-editor v-model="activity.actdetails" ></mce-editor>
        </el-form-item>
        <el-form-item class="">
          <el-col :offset="5">
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      {{activity}}
    </el-card>
  </div>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import { getUsersByName as getUsersByNameApi, deleteFile as deleteFileApi, addActivity as addActivityApi } from '@/api/activity'
import MceEditor from '_c/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
import VideoPlayer from '_c/VideoPlayer'
export default {
  name: 'add-activity',
  components: {
    MceEditor,
    VideoPlayer
  },
  data() {
    return {
      activity: {
        actName: '',              // 活动名称
        actLeader: '',            // 活动负责人
        timer: '',
        actStartTime: '',         // 活动开始时间
        actEndTime: '',           // 活动结束时间
        images: '',               // 上传图片后获取的id
        videoid: '',              // 上传视频后获取的id
        croWdPeople: [],          // 活动面向人群
        profile: '',              // 活动简介
        enclosure: '',              // 附件数据
        actdetails: '',                 // 活动详情
        processNodes: [],         // 活动流程
      },
      processState: '',              // 输入的流程信息
      imageFile: null,                 // 上传的图片海报
      videoFile: null,                // 上传的视频文件
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
      let typeWhiteList = ['image/jpeg', 'image/png']
      const isJPG = typeWhiteList.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式或PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeVideoUpload(file) {
      let typeWhiteList = ['video/mp4', 'video/avi', 'video/mpeg', 'video/x-ms-wmv']
      const isType = typeWhiteList.includes(file.type)
      const isSize = file.size / 1024 / 1024 < 200

      if (!isType) {
        this.$message.error('上传视频只能是 MP4、MPEG、WMV格式或AVI格式!')
      }
      if (!isSize) {
        this.$message.error('上传视频大小不能超过 200MB!')
      }
      return isType && isSize
      return false
    },
    handleUpdateSuccess(res, file, type) {
      if(res.code !== 0){
        this.$message.error('上传失败，请重新上传!')
        return
      }
      let { data } = res
      if(type === 'image'){
        this.imageFile = {
          fileName: data.fileName, 
          filePath: data.filePath, 
          id: data.id
        }
        this.activity.images = data.id
      }else if(type === 'video'){
        this.videoFile = {
          fileName: data.fileName, 
          filePath: data.filePath, 
          id: data.id,
          type: file.raw.type
        }
        this.activity.videoid = data.id
      }
      
    },
    deleteImage(event) {
      let tag = event.target || event.srcElement
      let tagName = tag.tagName.toLowerCase()
      if(tagName === 'svg' || tagName === 'use'){
        deleteFileApi(this.imageFile.id, this.imageFile.filePath).then((result) => {
          this.imageFile = null
          this.activity.images = ''
        })
      }
    },
    deleteVideo() {
      deleteFileApi(this.videoFile.id, this.videoFile.filePath).then((result) => {
        this.videoFile = null
        this.activity.videoid = ''
      })
    },
    handleSearch(val) {
      getUsersByNameApi(val).then((result) => {
        let { data } = result
        this.usersOptions = data.map((item) => {
          return { user_id: item.user_id, name: item.name, username: item.username }
        })
      })
    },
    handleAdd() {
      let [startTime, endTime] = this.activity.timer 
      addActivityApi(this.activity.actName, this.activity.actLeader, startTime, endTime, this.activity.images, this.activity.videoid, this.activity.croWdPeople, this.activity.profile, this.activity.enclosure, this.activity.actdetails, this.activity.processNodes).then((result) => {
        console.log(result)
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
        .image-delicon {
          width: 20%;
        }
      }
    }
  }
  .video-view {
    margin-top: 10px;
    width: 500px;
  }
}
</style>
