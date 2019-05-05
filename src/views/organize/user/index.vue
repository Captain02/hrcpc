<template>
  <div class="app-container">
    <h1 class="page-title"> 社团成员 </h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.username" placeholder="请输入成员名字" style="width: 200px;" size="medium"></el-input>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="() => this.$router.replace({path: '/user/add'})">添加新成员</el-button>
    </div>
    <m-table :data="userList" :columns="columns" @selection-change="handleSelectionChange">
      <template slot="action" slot-scope="{scope}">
        <router-link class="el-button el-button--text el-button--small" :to="{name: 'userDetails', params:{id: scope.$index}}">查看</router-link>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </m-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.page" :size.sync="listQuery.limit" @on-page-change="getUserList" />
  </div>
</template>
<script>
import MTable from '_c/MTable'
import Pagination from '_c/Pagination'
import { getUsers as getUsersApi } from '@/api/user'
export default {
  name: 'user',
  components: {
    MTable,
    Pagination
  },
  data () {
    return {
      listQuery: {
        username: '',
        page: 1,
        limit: 10,
      },
      userList: [],
      total: 0,
      columns: [
        {
          attrs: {
            type: 'selection',
            // width: '55'
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
            label: '联系方式',
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'deptName',
            label: '社团名称',
            align: "center"
          }
        },
        {
          attrs: {
            prop: 'createTime',
            label: '加入时间',
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
  methods: {
    getUserList() {
      getUsersApi(this.listQuery).then((result) => {
        // console.log(result)
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
      console.log(val)
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>
<style>
.page-title {
  padding: 15px 0;
  font-size: 18px;
  color: #464c5b;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}
</style>
