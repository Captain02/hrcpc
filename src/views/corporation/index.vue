<template>
  <div class="app-container">
    <h1 class="page-title">社团信息</h1>
    <el-row :gutter="25" class="corinfo-wrapper" v-if="form">
      <el-form label-width="100px" size="small">
        <el-col :span="9">
          <el-card>
            <div slot="header">
              <span>基本信息</span>
            </div>
            <el-form-item label="社团名称：">
              <el-input v-model="form.corname" placeholder="" />
            </el-form-item>
            <el-form-item label="社团负责人：">
              <el-select
                v-model="form.leadusername"
                filterable
                remote
                class="full-width"
                clearable
                placeholder="请输入学号"
                :remote-method="remoteMethod"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.username"
                  :label="item.name"
                  :value="item.username">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="领导老师：">
              <el-input v-model="form.cortercher" placeholder="" />
            </el-form-item>
            <el-form-item label="工作地点：">
              <el-input v-model="form.corworkspace" placeholder="" />
            </el-form-item>
            <el-form-item label="所属学院：">
              <el-select v-model="form.corcollege" placeholder="所属院系" class="full-width">
                <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="社团规模：">
              <el-input v-model="form.corscale" placeholder="" />
            </el-form-item>
            <el-form-item label-width="0">
              <el-button class="full-width" type="primary" @click="handleSave">保存</el-button>
            </el-form-item>
          </el-card>
          <el-card style="margin-top:20px;">
            <div slot="header">
              <span>社团二维码</span>
            </div>
            <el-image 
              class="view-wrapper"
              :src="form.filefile" 
              object-fit="contain"
              >
            </el-image>
          </el-card>
        </el-col>
        <el-col :span="15">
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>海报图片</span>
              <div class="action-btn">
                <el-upload
                  :action="`${$constants.BASE_API}corporation/updateCorBanner`"
                  :show-file-list="false"
                  :before-upload="beforeBanerUpload"
                  :data="{corid}"
                  name="file"
                  :on-success="handleSuccessBanner"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
            <el-image 
              class="view-wrapper"
              :src="form.bannerfile" 
              object-fit="contain"
              >
            </el-image>
          </el-card>
          <el-card style="margin-top:20px;">
            <div slot="header" class="clearfix card-header">
              <span>宣传视频</span>
              <div class="action-btn">
                <el-upload 
                  :action="`${$constants.BASE_API}corporation/updateCorVideo`"
                  :before-upload="beforeVideoUpload"
                  :show-file-list="false"
                  :data="{corid}"
                  name="file"
                  :on-success="handleSuccessVideo"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
            <div class="view-wrapper">
              <video :src="form.videofile" controls="controls"></video>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card style="margin-top:20px;">
            <div slot="header">
              <span>社团简介</span>
            </div>
            <!-- <mce-editor v-model="form.descs" :url="`${$constants.BASE_API}comm/upload`" @on-upload-success="handleSuccessDescs"></mce-editor> -->
            <tinymce v-model="form.descs" />
          </el-card>
        </el-col>
      </el-form> 
    </el-row>
  </div>
</template>
<script>
import { getCorporation as getCorporationApi, update as updateApi, getUserByUserName as getUserByUserNameApi } from '@/api/corporation'
import { getCollegeInfo as getCollegeInfoApi} from '@/api/comm'
import { mapState } from 'vuex'
import MceEditor from '_c/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
import Tinymce from '_c/Tinymce'
export default {
  name: 'corporation-info',
  components: {
    Tinymce,
    MceEditor
  },
  data() {
    return {
      form: null,
      userOptions: [],
      collegeOptions: []
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    remoteMethod(username) {
      if(username) {
        getUserByUserNameApi(username).then((res) => {
          console.log(res)
          let { data } = res
          this.userOptions = this.initOptions(data)
        })
      }
    },
    initOptions(list) {
      return list.map((item) => {
        return {
          name: item.name,
          username: item.username
        }
      })
    },
    beforeBanerUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeVideoUpload(file) {
      const isMP4 = file.type === 'video/mp4'
      const isLt200M = file.size / 1024 /1024 < 200

      if(!isMP4) {
        this.$message.error('上传视频只能是 MP4 格式!')
      }

      if(!isLt200M) {
        this.$message.error('上传视频大小不能超过 200MB!')
      }
      return isMP4 && isLt200M
    },
    handleSuccessBanner(response, file, fileList) {
      console.log(response)
      this.form.bannerfile = response.filePath
    },
    handleSuccessVideo(response, file, fileList) {
      console.log(response)
      this.form.videofile = response.filePath
    },
    handleSuccessDescs(arr) {
      console.log(arr)
    },
    getCorInfo() {
      getCorporationApi().then((result) => {
        console.log(result)
        let data = result.data[0]
        this.form = data
        this.userOptions = this.initOptions([{
          name: data.leadingname, username: data.leadusername
        }])
        /*{
          id: Number,
          corname: String,        社团名
          corleading: id,         负责人id
          leadingname: String,    负责人姓名
          leadusername: String,   负责人学号
          cortercher: String,     领导老师
          corscale: String,       社团规模
          corworkspace: String,   工作地点
          corcollege: id,     所属院系
          descs: String,          简介
          createtime: String,     创建时间
          bannerfile: String,     海报图片
          filefile: String,       社团二维码
          videofile: String       视频
        }*/
      }).catch(err => console.log(err))
    },
    handleSave() {
      console.log(this.form)
      updateApi(this.form.corname, this.form.leadusername, this.form.cortercher, this.form.corworkspace, this.form.corcollege, this.form.corscale, this.form.descs).then((res) => {
        console.log(res)
        this.$message.success('保存成功')
      })
      
    }
  },
  mounted() {
    this.getCorInfo()
    getCollegeInfoApi(1, null).then((result) => {
      let { data: list } = result
      this.collegeOptions = list.map((item) => {
        return { id: item.id, value: item.id, label: item.value }
      })
    })
  }
}
</script>
<style lang="less" scoped>
.corinfo-wrapper {
  margin-top: 25px;
  .action-btn {
    float: right;
    margin: 0;
    padding: 0;
  }
  .card-header {
    line-height: 32px;
  }
  .view-wrapper {
    height: 360px;
    text-align: center;
    /deep/img {
      height: 100%;
      width: auto;
    }
    video {
      height: 100%;
    } 
  }
}
</style>
