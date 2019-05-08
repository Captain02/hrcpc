<template>
  <div class="app-container">
    <h1 class="page-title"> 社团成员 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.username" placeholder="请输入成员名字" style="width: 200px;" size="medium"></el-input>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="() => this.$router.replace({path: '/organize/add-user'})">添加新成员</el-button>
      <el-button class="filter-item fliter-delete-btn" type="danger" size="medium" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button>
    </div>
    <s-table :data="userList" :columns="columns" @selection-change="handleSelectionChange">
      <template slot="action" slot-scope="{scope}">
        <router-link class="el-button el-button--text el-button--small" :to="{name: 'user-details', params:{id: scope.$index}}">查看</router-link>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.page" :size.sync="listQuery.limit" @on-page-change="getUserList" />
  </div>
</template>
<script>
import { getUsers as getUsersApi, deleteUsers as deleteUsersApi } from '@/api/user'
import { parseTime } from '@/utils'
import STable from '_c/STable'
import Pagination from '_c/Pagination'

export default {
  name: 'user',
  components: {
    STable,
    Pagination
  },
  data () {
    return {
      listQuery: {
        username: '',
        page: 1,
        limit: 10,
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
            prop: 'deptName',
            label: '所在部门',
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
            prop: 'createTime',
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
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    getUserList() {
      getUsersApi(this.listQuery).then((result) => {
        console.log(result)
        let { page } = result
        this.total = page.totalCount
        this.userList = page.list
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

    },
  },
  mounted() {
    this.getUserList()
  }
}
</script>
<style scoped>
</style>
<style>
.page-title {
  padding: 15px 0;
  font-size: 17px;
  color: #464c5b;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}
.fliter-delete-btn {
  float: right;
  margin-right: 25px;
}
</style>
