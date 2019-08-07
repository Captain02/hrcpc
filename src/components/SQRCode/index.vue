<template>
  <div class="qrcode-wrapper">
    <el-image :src="url" v-bind="$attrs">
      <div slot="error" class="image-slot">
        暂无图片
      </div>
    </el-image>
  </div>
</template>
<script>
export default {
  name: 'SQRCode',
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.qrcode-wrapper {
  width: 360px;
  height: 360px;
  overflow: hidden;
}
</style>
