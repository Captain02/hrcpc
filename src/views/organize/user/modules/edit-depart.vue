<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
      <el-dialog
        title="修改成员部门"
        :visible.sync="dialogFormVisible"
        width="530px"
        :append-to-body="true"
        :close-on-click-modal="false"
      >
        <el-form
          v-if="user"
          :model="user"
          label-width="70px"
          class="form-wrapper"
          ref="userForm" 
          size="small"
          :rules="rules"
          :hide-required-asterisk="true"
        >
          <el-form-item prop="depart" label="部门：">
            <tree-select v-model="user.depart" :options="departs" :clearable="false" :normalizer="normalizer" placeholder="请选择部门"></tree-select>
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
import { getUser as getUserApi, updateUserDepart as updateUserDepartApi } from '@/api/user'
import { getDeparts as getDepartsApi } from '@/api/depart'
import { transferData2Tree } from '@/utils'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'edit-user-depart',
  components: { TreeSelect },
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
      departs: [],             // 全部部门,
      normalizer(node) {
        return {
          id: node.dept_id,
          label: node.name
        }
      },
      rules: {
        depart: [
          { required: true, message: '请选择部门！' }
        ]
      }
    }
  },
  methods: {
    handleEdit() {
      let userId = this.data.user_id
      Promise.all([getDepartsApi(), getUserApi(userId)]).then((result) => {
        let [ departsData, userData ] = result
        this.departs = transferData2Tree(0, departsData.data, 'parent_id', 'dept_id', 'children')
        this.user = {
          userId: userData.data.user_id,
          depart: userData.data.depts.length ? userData.data.depts[0].dept_id : null
        }
        this.dialogFormVisible = true
        // console.log(this.user, this.departs)
      })
    },
    editUser() {
      this.$refs['userForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        updateUserDepartApi(this.user.userId, this.user.depart).then((result) => {
          // console.log(result)
          this.$message.success('修改成功!')
          this.dialogFormVisible = false
          this.$emit('on-edit-success')
        })
      })
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
