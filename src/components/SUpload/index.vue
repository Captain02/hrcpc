<template>
  <div class="upload-wrapper">
    <upload
      :action="action"
      :file-list="files"
      :data="data"
      :name="name"
      @on-remove="handleRemove"
      @on-success="uploadSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </upload>
    <s-qrcode :url="url || ''" style="margin: 15px auto 0;" />    
  </div>
</template>
<script>
import Upload from '_c/Upload'
import SQrcode from '_c/SQRCode'
export default {
  name: 'SUpload',
  components: {
    Upload,
    SQrcode
  },
  props: {
    action: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      default: []
    },
    data: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: '',
      files: []
    }
  },
  watch: {
    fileList(newVal) {
      this.files = [...newVal]
      this.url = newVal.length ? newVal[0].url : ''
      // console.log(newVal)
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('remove', file, fileList)
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList)
      if(response.code !== 0) {
        this.$message.error('上传失败')
        return
      }
      this.$emit('success', response)
    }
  }
}
</script>
<style lang="less" scoped>
.upload-wrapper {
  .upload-img-wrap {
    height: 360px;
    padding: 20px 20px 0;
  }
}
</style>
