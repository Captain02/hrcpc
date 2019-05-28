<template>
  <div>
    <div @click="showCodeMap">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="社团二维码"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="450px"
      :close-on-click-modal="false"
    >
      <div class="code-map-wrapper">
        <el-image :src="src"></el-image>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'code-map',
  data() {
    return {
      dialogFormVisible: false,
      src: null
    }
  },
  methods: {
    showCodeMap() {
      this.dialogFormVisible = true
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
