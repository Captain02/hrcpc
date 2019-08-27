<template>
  <el-card class="form-wrapper" shadow="never">
    <el-form :model="activity" label-width="100px" :rules="rules" size="small" ref="activityForm" :hide-required-asterisk="true">
      <el-form-item prop="actName" label="活动名称：">
        <el-input v-model="activity.actName" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="发布部门：">
        <tree-select v-model="activity.pubDeptId" :clearable="false" :options="deptOptions" :normalizer="normalizer" placeholder="发布部门"></tree-select>
      </el-form-item>
      <el-form-item label="活动简介：">
        <el-input v-model="activity.profile" type="textarea"  maxlength="200" :rows="6" show-word-limit placeholder="活动简介"></el-input>
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
          <el-option v-for="user in usersOptions" :key="user.userId" :label="user.name" :value="user.userId">
            <span style="float: left">{{ user.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ user.userName }}</span>
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
        <el-tooltip content='不选择则面向人群默认为"全校"' placement="top-start">
          <el-select v-model="activity.croWdPeople" placeholder="全校" multiple clearable class="full-width">
            <el-option v-for="college in collegeOptions" :key="college.id" :label="college.value" :value="college.id"></el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="活动流程：" prop="processNodes">
        <div class="card-wrapper">
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
        </div>
        
      </el-form-item>
      <el-form-item label="图片上传：" >
        <!-- {type: 0}上传图片、{type: 1}上传视频 -->
        <div class="card-wrapper">
          <upload
            v-slot:tip
            :limit="1"
            name="file"
            :show-file-list="false"
            :data="{type: 0}"
            :file-list="imageFile"
            :on-exceed="handleExceed"
            :action="`${$constants.BASE_API}activity/uploudActivitiBananer`"
            @on-success="(res, file) => {this.handleUpdateSuccess(res, file, 'image')}"
          >
            <div class="el-upload__tip">只能上传一个jpg/png文件，且不超过2M。建议分辨率750像素*400像素</div>
          </upload>
          <div class="image-view" v-if="imageFile&&imageFile.length">
              <el-image
              :src="imageFile[0].url"
              fit="scale-down"></el-image>
              <div class="image-text-area" :title="imageFile[0].name" @click="deleteImage">
                <p class="image-text">{{imageFile[0].name}}</p><icon-svg class-name="image-delicon" icon-class="close"></icon-svg>
              </div>
            </div>
        </div>
      </el-form-item>
      <el-form-item label="视频上传：" >
        <!-- {type: 0}上传图片、{type: 1}上传视频  {type: 2}上传附件-->
        <div class="card-wrapper">
          <upload
            v-slot:tip
            :limit="1"
            type="video"
            :action="`${$constants.BASE_API}activity/uploudActivitiBananer`"
            :data="{type: 1}"
            name="file"
            :file-list="videoFile"
            :on-exceed="handleExceed"
            @on-remove="deleteVideo"
            @on-success="(res, file) => {this.handleUpdateSuccess(res, file, 'video')}"
          >
            <div class="el-upload__tip">只能上传一个MP4文件，且不超过200M</div>
          </upload>
          <div class="video-view" v-if="videoFile && videoFile.length">
            <video-player :video-source="videoFile[0].url"></video-player>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="附件上传：">
        <div class="card-wrapper">
          <upload
            v-slot:tip
            :limit="1"
            type="file"
            :action="`${$constants.BASE_API}activity/uploudActivitiBananer`"
            :data="{type: 2}"
            name="file"
            :file-list="enclosureFile"
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            @on-remove="deleteEnclosure"
            @on-success="(res, file) => {this.handleUpdateSuccess(res, file, 'file')}"
            >
            <div slot="tip" class="el-upload__tip">只能上传一个zip文件，且不超过20M</div>
          </upload>
        </div>
      </el-form-item>
      
      <el-form-item prop="desc" label="活动详情：">
        <Tinymce v-model="activity.actdetails" />
      </el-form-item>
      <el-form-item class="">
        <el-col :offset="5">
          <el-button type="primary" @click="handleSubmit" >{{isAdd ? '添加' : '保存'}}</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <!-- {{activity}} -->
  </el-card>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi, getDepts as getDeptsApi } from '@/api/comm'
import { getUsersByName as getUsersByNameApi, deleteFile as deleteFileApi, getActivity as getActivityApi, addActivity as addActivityApi, updateActivity as updateActivityApi } from '@/api/activity'
import { transferData2Tree } from '@/utils'
import Upload from '_c/Upload'
import Tinymce from '_c/Tinymce'
import VideoPlayer from '_c/VideoPlayer'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'activity-form',
  components: {
    Upload,
    Tinymce,
    VideoPlayer,
    TreeSelect
  },
  props: {
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activity: {
        actName: '',              // 活动名称
        pubDeptId: '',              // 发布部门
        actLeader: '',            // 活动负责人
        timer: '',
        // actStartTime: '',         // 活动开始时间
        // actEndTime: '',           // 活动结束时间
        imageId: '',               // 上传图片后获取的id
        videoId: '',              // 上传视频后获取的id
        croWdPeople: [],          // 活动面向人群
        profile: '',              // 活动简介
        enclosure: '',              // 附件数据
        actdetails: '',                 // 活动详情
        processNodes: [],         // 活动流程
      },
      rules: {
        actName: [
          { required: true, message: '请输入活动名称' }
        ],
        actLeader: [
          { required: true, message: '请选择活动负责人' }
        ],
        timer: [
          { required: true, message: '请设置活动时间' }
        ],
        processNodes: [
          { required: true, message: '请设置活动流程' }
        ]
      },
      processState: '',              // 输入的流程信息
      imageFile: [],                 // 上传的图片海报
      videoFile: [],                // 上传的视频文件
      enclosureFile: [],            // 上传的附件
      usersOptions: [],             // 活动负责人选项
      collegeOptions: [],           // 面向人群选项,
      deptOptions: [],              // 发布部门选项
      normalizer(node) {
        return {
          id: node.dept_id,
          label: node.name
        }
      },
    }
  },
  methods: {
    /** 公共 **/
    handleExceed() {
      this.$message('暂时只能上传一个文件')
    },
    handlePreview(file) {
      // console.log(file)
      window.open(file.url)
    },
    addProcess() {
      this.activity.processNodes.push(this.processState)
      this.processState = ''
    },
    deleteProcess(index) {
      this.activity.processNodes.splice(index, 1)
    },
    handleUpdateSuccess(res, file, type) {
      let { data } = res
      if(type === 'image'){
        this.imageFile.splice(0, 1, {
          id: data.id,
          url: data.filePath,
          name: data.fileName
        })
        this.activity.imageId = data.id
      }else if(type === 'video'){
        this.videoFile.splice(0, 1, {
          id: data.id,
          url: data.filePath,
          name: data.fileName
        })
        this.activity.videoId = data.id
      }else {
        this.enclosureFile.splice(0, 1, {
          id: data.id,
          url: data.filePath,
          name: data.fileName
        })
        this.activity.enclosure = data.id
      }
      
    },
    deleteImage(event) {
      // console.log(event)
      let tag = event.target || event.srcElement
      let tagName = tag.tagName.toLowerCase()
      if(tagName === 'svg' || tagName === 'use'){
        let [image] = this.imageFile.splice(0)
        deleteFileApi(image.id, image.url).then((result) => {
          // this.imageFile = null
          this.activity.imageId = ''
        })
      }
    },
    deleteVideo(file, fileList) {
      // beforeUpload若返回了false会触发on-remove钩子函数
      if(this.videoFile && this.videoFile.length){
        let [video] = this.videoFile.splice(0)
        deleteFileApi(video.id, video.url).then((result) => {
          // this.videoFile = null
          this.activity.videoId = ''
        })
      }
    },
    deleteEnclosure() {
      if(this.enclosureFile && this.enclosureFile.length) {
        let [enclosure] = this.enclosureFile.splice(0)
        deleteFileApi(enclosure.id, enclosure.url).then((result) => {
          // this.enclosureFile = null
          this.activity.enclosure = ''
        })
      }
    },
    handleSearch(val) {
      getUsersByNameApi(val).then((result) => {
        let { data } = result
        this.usersOptions = data.map((item) => {
          return { userId: item.user_id, name: item.name, userName: item.username }
        })
      })
    },
    getData() {
       Promise.all([getCollegeInfoApi(1, null), getDeptsApi()]).then((result) => {
        let [ colleges, depts ] = result
        this.collegeOptions = colleges.data.map((item) => {
          return { id: item.id, value: item.value }
        })
        depts.data.unshift({ name: '本社团', dept_id: '', parent_id: 0 })
        this.deptOptions = transferData2Tree(0, depts.data, 'parent_id', 'dept_id', 'children')

        if(!this.isAdd){    // 修改活动
          this.getActivity()
        }
      })
    },
    /** 修改 **/
    getActivity() {
      let id = this.$route.params.id
      getActivityApi(id).then((result) => {
        console.log(result)
        this.initActivityAndOptions(result.data)
      }).catch((err) => { console.log(err) })
    },
    initActivityAndOptions(data) {
      let actLeader = data.actleading && data.actleading.length && {
        userId: data.actleading[0].user_id,
        userName: data.actleading[0].username,
        name: data.actleading[0].name,
      }
      let croWdPeople = data.crowdpeople && data.crowdpeople.length ? data.crowdpeople.map((item) => {
        return item.id
      }) : []
      let image = data.image && data.image.length ? data.image.map((item) => {
        return {
          id: item.id,
          url: item.filepath,
          name: item.filename
        }
      }) : []
      let video = data.video && data.video.length ? data.video.map((item) => {
        return {
          id: item.id,
          url: item.filepath,
          name: item.filename
        }
      }) : []
      let enclosure = data.enclosureFile && data.enclosureFile.length ? data.enclosureFile.map((item) => {
        return {
          id: item.id,
          url: item.filepath,
          name: item.filename
        }
      }) : []
      let processNodes  = data.processnodes && data.processnodes.length ? data.processnodes.map((item) => {
        return item.processnode
      }) : []

      this.usersOptions.push(actLeader)
      this.imageFile.splice(0, this.imageFile.length, ...image)
      this.videoFile.splice(0, this.videoFile.length, ...video)
      this.enclosureFile.splice(0, this.enclosureFile.length, ...enclosure)

      this.activity = {
        actid: data.actid,
        actName: data.actname,
        pubDeptId: data.deptid || '',
        actLeader: actLeader.userId,
        timer: [data.actstarttame, data.actendtime],
        imageId: data.images || '',
        videoId: data.videoid || '',
        croWdPeople,
        profile: data.profile,
        enclosure: data.enclosure || '',
        actdetails: data.actdetails,
        processNodes
      }
    },

    /** 提交 **/
    handleSubmit() {
      this.$refs['activityForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        let [startTime, endTime] = this.activity.timer 
        if(this.isAdd) {
          addActivityApi(this.activity.actName, this.activity.pubDeptId, this.activity.actLeader, startTime, endTime, this.activity.imageId, this.activity.videoId, this.activity.croWdPeople, this.activity.profile, this.activity.enclosure, this.activity.actdetails, this.activity.processNodes).then((result) => {
            console.log(result)
            this.$emit('on-add-success')
          }).catch((err) => console.log(err))
        }else{
          updateActivityApi(this.activity.actid, this.activity.actName, this.activity.pubDeptId, this.activity.actLeader, startTime, endTime, this.activity.imageId, this.activity.videoId, this.activity.croWdPeople, this.activity.profile, this.activity.enclosure, this.activity.actdetails, this.activity.processNodes).then((result) => {
            console.log(result)
            this.$emit('on-edit-success')
          }).catch((err) => console.log(err))
        }
        
      })
    },
    
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.card-wrapper{
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  box-shadow: rgb(204, 204, 204) 0px 1px 0px;
  /deep/.el-upload {
    text-align: left;
  }
}
.form-wrapper {
  margin-top: 30px;
  padding: 0 40px 0 20px;
  .el-date-editor {
    width: 50%;
  }
  .activity-process-wrapper {
    min-height: 65px;
  }
  .image-view {
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

  .video-view {
    margin-top: 10px;
    width: 500px;
  }
}
</style>