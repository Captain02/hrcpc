<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="修改角色"
      :visible.sync="dialogFormVisible"
      width="550px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="role"
        :model="role"
        label-width="100px"
        class="form-wrapper"
        :rules="rules"
        ref="roleForm" 
        size="small"
        :hide-required-asterisk="true"
      >
        <el-form-item prop="role_name" label="角色名称：">
          <el-input v-model="role.role_name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注信息：">
          <el-input v-model="role.remark" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editRole">保存</el-button> 
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRole as getRoleApi, updateRole as updateRoleApi } from '@/api/role'
import cloneDeep from 'clonedeep'
export default {
  name: 'edit-role-info',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      role: null,
      rules: {
        role_name: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    handleEdit() {
      this.role = cloneDeep(this.data)
      this.dialogFormVisible = true
    },
    editRole() {
      this.$refs['roleForm'].validate((valid) => {
        if(!valid){
          this.$message.error('请填写相关项目！')
          return 
        }
        updateRoleApi(this.role.role_id, this.role.role_name, this.role.remark).then((result) => {
          this.$message.success('修改成功!')
          this.dialogFormVisible = false
          this.$emit('on-edit-success')
        }).catch((err) => { })
      })
    }
  }
}
</script>
<style lang="less" scoped>
 .form-wrapper{
  padding: 0 40px 0 20px;
}
</style>