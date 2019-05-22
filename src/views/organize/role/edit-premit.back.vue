<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="修改角色权限"
      :visible.sync="dialogFormVisible"
      width="800px"
      class="role-dialog"
      :append-to-body="true"
    >
      <el-collapse v-for="(premit, key) in premitData" :key="key">
        <el-collapse-item>
          <template slot="title">{{key}}</template>
          <el-checkbox v-for="item in premit" :key="item.menuId">{{item.title}}</el-checkbox>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>
<script>
import { getRolePremit as getRolePremitApi} from '@/api/role'
import { mapState } from 'vuex'
export default {
  name: 'edit-role-premit',
  props: {
    data: {
      type: Object,
      required: true
    },
    premitData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      roleOwnPremit: [],          // 该角色所拥有的权限
      role: null,                 // 角色基本信息
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    handleClick() {
      let id = this.data.role_id
      // 修改：获取角色信息加获取角色权限信息
      getRolePremitApi(id).then((result) => {
        this.dialogFormVisible = true
        console.log('获取单个角色的权限', result)
        let { data } = result
        this.roleOwnPremit = data
        
      })
    }
  },
}
</script>
<style lang="less" scoped>


</style>

<style lang="less">

.role-dialog {
  .el-dialog {
    min-height: 400px;
  }
  .el-collapse {
    margin-bottom: 25px;
    border: none;
    .el-collapse-item__header {
      background-color: #f5f5f5;
      padding: 0 25px;
      border-radius: 5px 5px 0 0;
      border-bottom: none;
    }
    .el-collapse-item__wrap {
      border-radius: 0 0 5px 5px;
      border: 1px solid #EBEEF5;
      border-top: none;
      .el-collapse-item__content {
        padding: 15px 25px;
      }
    }
  }
  
}

</style>
