<template>
  <el-upload
    :action="action"
    :data="data"
    :name="name"
    v-bind="$attrs"
    v-on="$listeners"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
  >
  <slot>
    <el-button type="primary">立即上传</el-button>
  </slot>
  <slot name="tip"></slot>
  </el-upload>
</template>
<script>
export default {
  name: 'UploadPicture',
  props: {
    type: {
      type: String,
      default: 'image'
    },
    action: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.$emit('on-success', response, file, fileList)
    },
    handleRemove(file, fileList) {
      this.$emit('on-remove', file, fileList)
    },
    beforeUpload(file) {
      if(this.type === 'image') {
        return this.beforeUploadImage(file)
      }else if(this.type === 'video') {
        return this.beforeUploadVideo(file)
      }
    },
    beforeUploadImage(file) {
      let typeWhiteList = ['image/jpeg', 'image/png']
      const isJPG = typeWhiteList.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式或 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    beforeUploadVideo(file) {
      let typeWhiteList = ['video/mp4']
      const isType = typeWhiteList.includes(file.type)
      const isSize = file.size / 1024 / 1024 < 200

      if (!isType) {
        this.$message.error('上传视频只能是 MP4格式!')
        return false
      }
      if (!isSize) {
        this.$message.error('上传视频大小不能超过 200MB!')
        return false
      }
      return true
    }
  },

}
</script>