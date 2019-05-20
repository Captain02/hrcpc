<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="修改角色权限"
      :visible.sync="dialogFormVisible"
      width="700px"
      :append-to-body="true"
    >

    </el-dialog>
  </div>
</template>
<script>
import { getRolePremit as getRolePremitApi, getPremits as getPremitsApi } from '@/api/role'
import { transferData2Tree } from '@/utils'
import { mapState } from 'vuex'
export default {
  name: 'edit-role-premit',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      premitList: [],             // 权限列表
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
    getPremitList() {
      getPremitsApi(this.corid).then((result) => {
        let { data } = result
        this.premitList = transferData2Tree(0, data, 'parentId', 'menuId', 'children')
        console.log(this.premitList)
      }).catch((err) => { })
    },
    handleClick() {
      let id = this.data.role_id
      // 修改：获取角色信息加获取角色权限信息
      getRolePremitApi(id).then((result) => {
        let { data } = result
        this.roleOwnPremit = data
      })
    }
  },
  mounted() {
    this.getPremitList()
  }
}
</script>