<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="活动二维码"
      width="430px"
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
      <s-upload action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" @success="uploadSuccess" @remove="handleRemove" />
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
    handleRemove(file, fileList) {
      this.fileList = []
    },
    getQRCode() {
      setTimeout(() => {
        this.fileList = [
          {name: 'food.jpeg', url: 'http://www.btzmpro.com:82/file/QrCode/Corporation/1559357297.png'}
        ]
      }, 100)
    }
  }
}
</script>