<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="活动二维码"
      width="450px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <!-- <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <slot name="tip"></slot>
      </el-upload> -->
      <s-upload action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" @success="uploadSuccess" />
      <!-- {{fileList}} -->
    </el-dialog>
  </div>
</template>
<script>
import SUpload from '_c/SUpload'
export default {
  name: 'qrcode-activity',
  components: {
    SUpload
  },
  data() {
    return {
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    handleClick() {
      this.dialogVisible = true
      this.getQRCode()
    },
    uploadSuccess(res) {
      console.log(res)
    },
    getQRCode() {
      setTimeout(() => {
        this.fileList = [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ]
      }, 100)
    }
  }
}
</script>