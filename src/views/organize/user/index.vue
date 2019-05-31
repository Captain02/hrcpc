<template>
  <div class="app-container">
    <h1 class="page-title"> 社团成员 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" size="small"></el-input>
      <el-input class="filter-item" v-model="listQuery.username" placeholder="请输入学号" style="width: 200px;" size="small"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="() => this.$router.push({name: 'add-user'})">添加新成员</el-button>
      <el-button class="filter-item filter-right-btn" type="danger" size="small" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
      <el-dropdown trigger="click" style="float: right;">
        <el-button type="primary" size="small">更改显示列</el-button>
        <el-dropdown-menu slot="dropdown">
          <template v-for="column in columns">
            <el-checkbox v-if="!column.hiddenInCheck" :value="!column.hidden" @change="handleChange($event, column)" class="el-dropdown-menu__item dropdown-check" :key="column.attrs.prop">{{column.attrs.label}}</el-checkbox>
          </template>
          
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <s-table :data="userList" :columns="columns" @selection-change="handleSelectionChange" size="medium">
      <template v-slot:avatar="{scope}">
        <div class="table-avatar">
          <el-image :src="scope.row.filepath" alt="头像" >
            <div slot="error" class="image-slot">
              <icon-svg icon-class="img-load-fail"></icon-svg>
            </div>
          </el-image>
        </div>
      </template>
      <template v-slot:action="{scope}">
        <el-dropdown trigger="click">
          <el-button type="info" size="mini">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="action-dropdown">
            <details-user :data="scope.row" class="el-dropdown-menu__item">
              <template v-slot:action-btn>
                <el-button type="text" size="small" >查看 </el-button>
              </template>
            </details-user>
                        
            <edit-user-info :data="scope.row" class="el-dropdown-menu__item" @on-edit-success="getUserList">
              <template v-slot:action-btn>
                <el-button type="text" size="small" >编辑 </el-button>
              </template>
            </edit-user-info>
            <edit-user-role :data="scope.row" class="el-dropdown-menu__item" >
              <template v-slot:action-btn>
                <el-button type="text" size="small" >分配角色 </el-button>
              </template>
            </edit-user-role>
            <edit-user-depart :data="scope.row" class="el-dropdown-menu__item" >
              <template v-slot:action-btn>
                <el-button type="text" size="small" >分配部门 </el-button>
              </template>
            </edit-user-depart>
            <el-dropdown-item>
              <el-button type="text" size="small" @click="handleDelete([scope.row])">删除</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.page" :size.sync="listQuery.size" @on-page-change="getUserList" />
  </div>
</template>
<script>
import {getUsers as getUsersApi, deleteUsers as deleteUsersApi } from '@/api/user'
import { columns } from './modules/dada'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import detailsUser from './modules/details'
import editUserInfo from './modules/edit-info'
import editUserRole from './modules/edit-role'
import editUserDepart from './modules/edit-depart'

export default {
  name: 'user',
  components: {
    STable,
    Pagination,
    detailsUser,
    editUserInfo,
    editUserRole,
    editUserDepart
  },
  data () {
    return {
      listQuery: {
        name: '',
        username: '',
        page: 1,
        size: 10,
      },
      selectedItems:[],
      userList: [],
      total: 0,
      columns
    }
  },
  computed: {
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    getUserList() {
      getUsersApi(this.listQuery).then((result) => {
        // console.log(result)
        let { page, data } = result
        this.total = page.totalCount
        this.userList = data
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSearch() {
      this.getUserList()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
      // console.log(val)
    },
    deleteSelectedItems() {
      this.handleDelete(this.selectedItems)
    },
    handleDelete(items) {
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
        deleteUsersApi(ids).then((result) => {
          this.$message.success('删除成功')
          this.getUserList()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {})
    },
    handleChange(value, column) {
      column.hidden = !value
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>
<style lang="less" scoped>
.action-dropdown {
  .el-dropdown-menu__item {
    text-align: center;
  }
}

</style>

