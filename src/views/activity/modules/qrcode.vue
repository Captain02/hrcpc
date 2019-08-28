<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="活动二维码"
      width="860px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-row class="wrapper" :gutter="18" >
        <el-col :span="12">
          <el-card>
            <div slot="header" class="card-header">
              <span>扫码加入活动</span>
            </div>
            <s-qr-code :url="QRCode" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>扫码加入活动相关qq群</span>
              <div class="action-btn" v-if="corporationId === corid">
                <upload
                  :limit="1"
                  name="qqCodeFile"
                  :show-file-list="false"
                  :data="{actId: this.activityId, corId: this.corporationId}"
                  :action="`${$constants.BASE_API}activity/uploadqqcodeFile`"
                  @on-success="uploadSuccess"
                  style="margin-bottom: 10px;"
                >
                  <el-button size="small" type="primary">立即上传</el-button>
                </upload>
              </div>
            </div>
            <s-qr-code :url="QQQRCode" />
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SQrCode from '_c/SQRCode'
import Upload from '_c/Upload'

export default {
  name: 'qrcode-activity',
  components: {
    SQrCode,
    Upload
  },
  props: {
    activityId: {
      type: Number,
      required: true
    },
    corporationId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      QRCode: '',
      QQQRCode: ''
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    handleClick() {
      this.dialogVisible = true
      this.getQRCode()
    },
    uploadSuccess(res) {
      console.log(res)
      this.QQQRCode = res.path
    },
    getQRCode() {
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  .action-btn {
    float: right;
    margin: 0;
    padding: 0;
  }
  .card-header {
    line-height: 32px;
  }
}
.title {
  line-height: 25px;
}
</style>