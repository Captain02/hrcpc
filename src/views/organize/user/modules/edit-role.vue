<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
      <el-dialog
        title="修改成员角色"
        :visible.sync="dialogFormVisible"
        width="550px"
        :append-to-body="true"
      >
        <el-form
          v-if="user"
          :model="user"
          label-width="70px"
          class="form-wrapper"
          size="small"
        >
          <el-form-item label="角色：">
             <el-checkbox-group v-model="user.roles">
               <template v-for="(role, index) in roleList" >
                 <el-checkbox :key="role.role_id" :label="role.role_id"  @change="handleChange($event, role)">{{role.role_name}}</el-checkbox>
                <el-divider v-if="(index + 1) % 3 === 0" :key="index"></el-divider>
               </template>
             </el-checkbox-group>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUser as getUserApi, updateUserRole as updateUserRoleApi } from '@/api/user'
import { getRoles as getRolesApi } from '@/api/role'
export default {
  name: 'edit-user-role',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      user: null,
      roleList: []             // 全部角色列表
    }
  },
  methods: {
    handleEdit() {
      let userId = this.data.user_id
      Promise.all([getRolesApi(), getUserApi(userId)]).then((result) => {
        let [ rolesData, userData ] = result
        this.roleList = rolesData.data.map((role) => {
          return { role_id: role.role_id, role_name: role.role_name }
        })
        let userRoles = userData.data.roles.map((role) => {
          return role.role_id
        })
        this.user = {
          userId: userData.data.user_id,
          roles: userRoles
        }
        this.dialogFormVisible = true
        console.log(this.user, this.roleList)
      })
    },
    handleChange(status, role) {
      console.log(status, role)
      updateUserRoleApi(status, this.user.userId, role.role_id).then((result) => {
        console.log(result)
         this.$message.success('设置成功!')
      }).catch((err) => {})
    }
  }
}
</script>
<style lang="less" scoped>
.form-wrapper{
  padding: 0 40px 0 20px;
  .el-select {
    width: 100%;
  }
  .el-divider--horizontal {
    margin: 3px 0;
  }
}
</style>
