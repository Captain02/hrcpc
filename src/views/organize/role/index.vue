<template>
  <div class="app-container">
    <h1 class="page-title"> 角色管理 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.roleName" placeholder="请输入角色名" style="width: 200px;" size="small"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <add-role class="filter-item" @on-add-success="getRoleList" >
        <template v-slot:action-btn>
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">添加新角色</el-button>
        </template>
      </add-role>
      <el-button class="filter-item filter-right-btn" type="danger" size="small" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
    </div>
    <s-table class="role-table" :columns="columns" :data="roleList" @selection-change="handleSelectionChange" size="medium">
      <template v-slot:permit="{scope}">
        <template v-for="permis in scope.row.menu_list">
          <el-tag size="medium" :key="permis.menu_id">{{permis.title}}</el-tag>
        </template>
      </template>
      <template v-slot:action="{scope}">
        <!-- <edit-role :data="scope.row" :departs-tree="departList" class="handle-btn" @on-edit-success="getRoleList" v-slot:btn-label>编辑</edit-role> -->
        <edit-role-premit class="handle-btn" :data="scope.row">
          <template v-slot:action-btn="{scope}">
            <el-button type="text" size="small">修改角色权限</el-button>
          </template>
        </edit-role-premit>
        <el-button type="text" size="small" @click="handleDelete([scope.row])">删除</el-button>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getRoleList"/>
  </div>
</template>
<script>
import { getRoles as getRolesApi, deleteRoles as deleteRolesApi } from '@/api/role'
import { parseTime } from '@/utils'
import { mapState } from 'vuex'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import addRole from './add'
import editRoleInfo from './edit-info'
import editRolePremit from './edit-premit'
export default {
  name: 'role',
  components: {
    STable,
    Pagination,
    addRole,
    editRoleInfo,
    editRolePremit
  },
  data() {
    return {
      listQuery: {
        roleName: '',
        currPage: 1,
        pageSize: 10,
      },
      selectedItems:[],
      roleList: [],
      total: 0,
      columns: [
        {
          attrs: {
            type: 'selection',
            width: '35'
          }
        },
        {
          attrs: {
            prop: 'role_name',
            label: '角色名',
            sortable: true,
            align: "center",
            width: '150'
          }
        },
        {
          attrs: {
            prop: 'create_time',
            label: '创建时间',
            width: '150',
            align: "center",
            formatter: (row, column, cellValue, index) => parseTime(cellValue, '{y}-{m}-{d}')
          }
        },
        {
          attrs: {
            prop: 'remark',
            label: '描述',
            width: '200',
            align: "center"
          }
        },
        {
          slot: 'permit',
          attrs: {
            prop: 'menu_list',
            label: '拥有权限',
            align: 'center'
          }
        },
        {
          slot: 'action',
          attrs: {
            prop: 'action',
            label: '操作',
            align: "center",
            width: '150',
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    }),
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    getRoleList() {
      getRolesApi(this.corid, this.listQuery).then((result) => {
        console.log('角色列表', result)
        let { page, data } = result
        this.total = page.totalCount
        this.roleList = data
      }).catch((err) => {console.log(err) })
    },
    handleSearch() {
      this.getRoleList()
    },
    deleteSelectedItems() {
      // 删除
      this.handleDelete(this.selectedItems)
    },
    handleDelete(items) {
      // 删除
      let ids = []
      items.forEach((item) => {
        ids.push(item.user_id)
      })
      // console.log(ids)
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRolesApi(ids).then((result) => {
          this.$message.success('删除成功')
          this.getRoleList()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {})
    },
    handleSelectionChange(val) {
      this.selectedItems = val
      // console.log(val)
    },
  },
  mounted() {
    this.getRoleList()
  }
}
</script>
<style lang="less" scoped>
.role-table{
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
