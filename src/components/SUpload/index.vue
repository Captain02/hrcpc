<template>
  <div class="upload-wrapper">
    <el-upload
      :action="action"
      :file-list="files"
      :data="data"
      :name="name"
      :on-remove="handleRemove"
      :before-upload="beforUpload"
      :on-success="uploadSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <slot name="tip"></slot>
    </el-upload>
    <s-qrcode :url="url || ''" style="margin: 15px auto 0;" />    
  </div>
</template>
<script>
import SQrcode from '_c/SQRCode'
export default {
  name: 'SUpload',
  components: {
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
      this.$emit('success', response)
    },
    beforUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
