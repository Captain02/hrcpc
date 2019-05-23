<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
      <el-dialog
        title="修改成员角色"
        :visible.sync="dialogFormVisible"
        width="530px"
        :append-to-body="true"
      >
        <el-form
          v-if="user"
          :model="user"
          label-width="70px"
          class="form-wrapper"
          ref="userForm" 
          size="small"
          :hide-required-asterisk="true"
        >
          <el-form-item prop="roles" label="角色：">
            <el-select v-model="user.roles" multiple placeholder="请选择角色">
              <el-option v-for="role in roles" :key="role.role_id" :label="role.role_name"
      :value="role.role_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editUser">保存</el-button> 
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUser as getUserApi } from '@/api/user'
import { getRoles as getRolesApi } from '@/api/role'
import { mapState } from 'vuex'
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
      roles: []             // 全部角色列表
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    handleEdit() {
      let userId = this.data.user_id
      Promise.all([getRolesApi(this.corid), getUserApi(userId, this.corid)]).then((result) => {
        let [ rolesData, userData ] = result
        this.roles = rolesData.data.map((role) => {
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
        console.log(this.user, this.roles)
      })
    },
    editUser() {

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
}
</style>
