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
        <el-dropdown trigger="click">
          <el-button type="info" size="mini">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="action-dropdown">
            <details-role class="el-dropdown-menu__item" :data="scope.row">
              <template v-slot:action-btn>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </details-role>
            <edit-role-info class="el-dropdown-menu__item" :data="scope.row" @on-edit-success="getRoleList">
              <template v-slot:action-btn>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </edit-role-info>
            <el-dropdown-item>
              <el-button type="text" size="small"  @click="handleEditPremit(scope.row)">修改角色权限</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" size="small" @click="handleDelete([scope.row])">删除</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>   
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getRoleList"/>
  </div>
</template>
<script>
import { getRoles as getRolesApi, deleteRoles as deleteRolesApi } from '@/api/role'
import { parseTime } from '@/utils'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import detailsRole from './modules/details'
import addRole from './modules/add'
import editRoleInfo from './modules/edit-info'
export default {
  name: 'role',
  components: {
    STable,
    Pagination,
    detailsRole,
    addRole,
    editRoleInfo,
  },
  data() {
    return {
      listQuery: {
        roleName: '',
        currPage: 1,
        pageSize: 10,
      },

      selectedItems:[],
      roleList: [],               // 角色列表
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
            align: "center"
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
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    getRoleList() {
      getRolesApi(this.listQuery).then((result) => {
        console.log('角色列表', result)
        let { page, data } = result
        this.total = page.totalCount
        this.roleList = data
      }).catch((err) => {console.log(err) })
    },
    handleSearch() {
      this.getRoleList()
    },
    handleEditPremit(role) {
      // console.log(role)
      this.$router.push({name: 'edit-role-premit', params:{id: role.role_id}})
    },
    deleteSelectedItems() {
      // 删除
      this.handleDelete(this.selectedItems)
    },
    handleDelete(items) {
      // 删除
      let ids = []
      items.forEach((item) => {
        ids.push(item.role_id)
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
.action-dropdown {
  .el-dropdown-menu__item {
    text-align: center;
  }
}

</style>

