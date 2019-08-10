<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="发布公告"
      :visible.sync="dialogVisible"
      width="650px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >

    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'add-notice',
  data() {
    return {
      dialogVisible: false,
      form: {
        notictop: '',
        
      }
    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>