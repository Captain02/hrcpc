<template>
  <div class="app-container">
    <h1 class="page-title"> 社团成员 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.username" placeholder="请输入成员名字" style="width: 200px;" size="medium"></el-input>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="() => this.$router.push({name: 'add-user'})">添加新成员</el-button>
      <el-button class="filter-item filter-delete-btn" type="danger" size="medium" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
    </div>
    <s-table :data="userList" :columns="columns" @selection-change="handleSelectionChange">
      <template v-slot:action="{scope}">
        <el-dropdown trigger="click">
          <el-button type="info" size="mini">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <user-details :data="scope.row" class="el-dropdown-menu__item" v-slot:btn-label>查看 </user-details>
            <el-dropdown-item>
              <el-button type="text" size="small" class="el-dropdown-menu__item" @click="handleEdit(scope.row.user_id)">编辑</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" size="small" class="el-dropdown-menu__item" @click="handleDelete([scope.row])">删除</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <router-link class="el-button el-button--text el-button--small" :to="{name: 'details-user', params:{id: scope.row.userId}}">查看</router-link> -->
        <!-- <el-button type="text" size="small" @click="handleDetails(scope.row)">查看</el-button> -->
       
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.page" :size.sync="listQuery.size" @on-page-change="getUserList" />
  </div>
</template>
<script>
import {getUsers as getUsersApi, deleteUsers as deleteUsersApi } from '@/api/user'
import { parseTime } from '@/utils'
import { mapState } from 'vuex'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import UserDetails from './details'

export default {
  name: 'user',
  components: {
    STable,
    Pagination,
    UserDetails
  },
  data () {
    return {
      listQuery: {
        username: '',
        page: 1,
        size: 10,
      },
      selectedItems:[],
      userList: [],
      total: 0,
      columns: [
        {
          attrs: {
            type: 'selection',
            width: '30'
          }
        },
        {
          attrs: {
            prop: 'username',
            label: '成员名',
            sortable: true,
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'email',
            label: '邮箱',
            sortable: true,
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'mobile',
            label: '手机号',
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'wechart',
            label: '微信',
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'college',
            label: '所在学院',
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'collegetie',
            label: '所在专业',
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'create_time',
            label: '加入时间',
            align: "center",
            formatter: (row, column, cellValue, index) => parseTime(cellValue, '{y}-{m}-{d}')
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
    getUserList() {
      getUsersApi(this.corid, this.listQuery).then((result) => {
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
    handleEdit(id) {
      this.$router.push({name: 'edit-user', params: { id }})
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>
