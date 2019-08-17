<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="添加成员"
      :visible.sync="dialogVisible"
      width="400px"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <el-form :model="user" :inline="true" ref="userForm" :rules="rules" :hide-required-asterisk="true" size="small" label-width="60px">
        <el-form-item label="学号" prop="username">
          <el-input v-model="user.username" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'add-user',
  data() {
    return {
      dialogVisible: false,
      user: {
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { pattern: /^\d{12}$/,  message: '请输入正确的学号', trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs['userForm'].resetFields()
    },
    handleClick() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>

</style>