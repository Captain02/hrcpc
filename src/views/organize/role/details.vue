<template>
  <div>
    <div @click="handleDetails">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="角色信息"
      :visible.sync="dialogFormVisible"
      width="700px"
      :append-to-body="true"
    >
      <template v-if="role">
        <el-row class="details-row">
          <el-col :span="3"><span>角色名：</span> </el-col>
          <el-col :span="9">{{role.role_name}}</el-col>
          <el-col :span="3"><span>创建时间：</span> </el-col>
          <el-col :span="9">{{role.create_time}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>拥有权限：</span> </el-col>
          <el-col :span="21">
            <el-tag v-for="menu in role.menu_list" :key="menu.menu_id" size="mini" style="margin:0 10px 10px 0">{{menu.title}}</el-tag>
          </el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>备注信息：</span> </el-col>
          <el-col :span="21">{{role.remark}}</el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getRole as getRoleApi } from '@/api/role'
export default {
  name: 'details-role',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      role: null
    }
  },
  methods: {
    handleDetails() {
      let id = this.data.role_id
      getRoleApi(id).then((result) => {
        this.role = result.data 
        this.dialogFormVisible = true
      }).catch((err) => { })
    }
  }
}
</script>
<style lang="less" scoped>
.details-row {
  font-size: 13px;
  padding: 15px;
  span {
    font-size: 14px;
    color: #909399;
  }
}
</style>
