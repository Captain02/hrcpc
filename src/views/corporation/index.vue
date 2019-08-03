<template>
  <div class="app-container">
    <h1 class="page-title">社团信息</h1>
    <el-row :gutter="25" class="corinfo-wrapper" v-if="form">
      <el-form label-width="100px" size="small">
        <el-col :span="9">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <el-form-item label="社团名称：">
              <el-input v-model="form.corname" placeholder="" />
            </el-form-item>
            <el-form-item label="社团负责人：">
              <el-input v-model="form.corleading" placeholder="" />
            </el-form-item>
            <el-form-item label="领导老师：">
              <el-input v-model="form.cortercher" placeholder="" />
            </el-form-item>
            <el-form-item label="工作地点：">
              <el-input v-model="form.corworkspace" placeholder="" />
            </el-form-item>
            <el-form-item label="所属学院：">
              <el-input v-model="form.corcollege" placeholder="" />
            </el-form-item>
            <el-form-item label="社团规模：">
              <el-input v-model="form.corscale" placeholder="" />
            </el-form-item>
            <el-form-item label-width="0">
              <el-button class="full-width" type="primary">保存</el-button>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="15">
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>海报图片</span>
              <div class="action-btn">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :before-upload="beforeBanerUpload"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
            <el-image 
              class="view-wrapper"
              :src="form.bannerid" 
              object-fit="contain"
              >
            </el-image>
          </el-card>
          <el-card style="margin-top:20px;">
            <div slot="header" class="clearfix card-header">
              <span>宣传视频</span>
              <div class="action-btn">
                <el-upload 
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :before-upload="beforeVideoUpload"
                  :show-file-list="false"
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
      </el-form> 
    </el-row>
  </div>
</template>
<script>
import { getCorporation as getCorporationApi } from '@/api/corporation'
export default {
  name: 'corporation-info',
  data() {
    return {
      form: null
    }
  },
  methods: {
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
    getCorInfo() {
      getCorporationApi().then((result) => {
        console.log(result)
      }).catch(err => console.log(err))
      setTimeout(() => {
        this.form = {
          corname: '红帽子',
          corleading: '赵国真',
          cortercher: '陈德山',
          corworkspace: '明理楼4楼',
          corcollege: '信息管理学院',
          corscale: '50',
          descs: '小红帽',
          bannerid: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          videofile: 'https://www.w3school.com.cn/i/movie.ogg'
        }
      }, 0)
    }
  },
  mounted() {
    this.getCorInfo()
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
    height: 300px;
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
