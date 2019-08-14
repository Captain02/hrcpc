<template>
  <div>
    <div @click="showCodeMap">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="社团二维码"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="430px"
      :close-on-click-modal="false"
    >
      <s-qrcode :url="src" style="margin: 0 auto;" />
    </el-dialog>
  </div>
</template>
<script>
import { getCorporation as getCorporationApi } from '@/api/corporation'
import SQrcode from '_c/SQRCode'
export default {
  name: 'code-map',
  components: {
    SQrcode
  },
  data() {
    return {
      dialogFormVisible: false,
      src: null
    }
  },
  methods: {
    showCodeMap() {
      if(this.src === null){
        getCorporationApi().then((result) => {
          let data = result.data[0]
          this.dialogFormVisible = true
          this.src = data.filefile
        }).catch((err) => {  })
      }else{
        this.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.code-map-wrapper {
  height: 350px;
  padding: 0 20px;
}
</style>
