<template>
  <div>
    <div @click="handleAdd">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="添加新角色"
      :visible.sync="dialogFormVisible"
      width="700px"
      :append-to-body="true"
    >
      <el-row>
        <el-col :span="8">
          <h2 class="title">请选择所属部门</h2>
          <!-- <el-tree
            :default-expand-all="true"
            :data="computDeparts"
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleClick"
            node-key="dept_id"
          ></el-tree> -->
        </el-col>
        <el-col :span="16">
          <el-form
           :model="role"
           label-width="100px"
           :rules="rules"
           ref="roleForm" 
           :hide-required-asterisk="true"
          >
            <el-form-item prop="roleName" label="角色名称：">
              <el-input v-model="role.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item prop="deptName" label="隶属于：">
              <strong class="text-label">{{role.deptName}}</strong> 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addRole">添加</el-button> 
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addRole as addRoleApi } from '@/api/role'
import cloneDeep from 'clonedeep'
import { mapState } from 'vuex';
export default {
  name: 'add-role',
  props: {
    // departsTree: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      dialogFormVisible: false,
      defaultProps: {
        label: 'name'
      },
      role: {
        roleName: '',
        deptId: null,
        deptName: ''
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
    computDeparts() {
      return cloneDeep(this.departsTree)
    }
  },
  methods: {
    resetForm() {
      this.role = {
        roleName: '',
        deptId: null,
        deptName: ''
      }
    },
    handleAdd() {
      this.resetForm()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
      })
    },
    handleClick(data) {
      this.role.deptId = data.dept_id
      this.role.deptName = data.name
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
  .title{
    font-size: 15px;
    color: #333;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .text-label {
    font-weight: bold;
  }
</style>