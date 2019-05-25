<template>
  <div>
    <div @click="handleAdd">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="添加新角色"
      :visible.sync="dialogFormVisible"
      width="550px"
      :append-to-body="true"
    >
      <el-form
        :model="role"
        label-width="100px"
        class="form-wrapper"
        :rules="rules"
        ref="roleForm" 
        size="small"
        :hide-required-asterisk="true"
      >
        <el-form-item prop="roleName" label="角色名称：">
          <el-input v-model="role.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注信息：">
          <el-input v-model="role.remark" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRole">添加</el-button> 
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addRole as addRoleApi } from '@/api/role'
import { mapState } from 'vuex'
export default {
  name: 'add-role',
  data() {
    return {
      dialogFormVisible: false,
      role: {
        roleName: '',
        remark: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    }),
  },
  methods: {
    resetForm() {
      this.role = {
        roleName: '',
        remark: ''
      }
    },
    handleAdd() {
      this.resetForm()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
      })
    },
    addRole() {
      this.$refs['roleForm'].validate((valid) => {
        if(!valid){
          this.$message.error('请添加相关项目！')
          return 
        }
        addRoleApi(this.corid, this.role).then((result) => {
          this.$message.success('添加成功!')
          this.dialogFormVisible = false
          this.$emit('on-add-success')
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