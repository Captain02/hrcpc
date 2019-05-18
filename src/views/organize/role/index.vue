<template>
  <div class="app-container">
    <h1 class="page-title"> 角色管理 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.roleName" placeholder="请输入角色名" style="width: 200px;" size="small"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <add-role class="filter-item" :departs-tree="departsList" @on-add-success="getRoleList" >
        <template v-slot:action-btn>
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">添加新角色</el-button>
        </template>
      </add-role>
      <el-button class="filter-item filter-right-btn" type="danger" size="small" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
    </div>
    <s-table :columns="columns" :data="roleList" @selection-change="handleSelectionChange" size="medium">
      <template v-slot:action="{scope}">
        <!-- <edit-role :data="scope.row" :departs-tree="departList" class="handle-btn" @on-edit-success="getRoleList" v-slot:btn-label>编辑</edit-role> -->
        <el-button type="text" size="small" @click="handleDelete([scope.row])">删除</el-button>
      </template>
    </s-table>
  </div>
</template>
<script>
import { getRoles as getRolesApi } from '@/api/role'
import { getDeparts as getDepartsApi } from "@/api/depart"
import { transferDepartToTree } from '@/utils'
import { parseTime } from '@/utils'
import { mapState } from 'vuex'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import addRole from './add'
import editRole from './edit'
export default {
  name: 'role',
  components: {
    STable,
    Pagination,
    addRole,
    editRole
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
      departsList: [],
      total: 0,
      columns: [
        {
          attrs: {
            type: 'selection',
            width: '100'
          }
        },
        {
          attrs: {
            prop: 'role_name',
            label: '角色名',
            sortable: true,
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'name:',
            label: '所属部门',
            sortable: true,
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'create_time',
            label: '创建时间',
            align: "center",
            // formatter: (row, column, cellValue, index) => parseTime(cellValue, '{y}-{m}-{d}')
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
            align: "center"
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
    },
    handleDelete() {
      // 删除
    },
    handleSelectionChange(val) {
      this.selectedItems = val
      // console.log(val)
    },
  },
  mounted() {
    this.getRoleList()
    getDepartsApi(this.corid, {currPage: 1, pageSize: 10}).then((result) => {
      let { data } = result
      this.departsList = transferDepartToTree(data)
    })
  }
}
</script>