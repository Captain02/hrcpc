<template>
  <div class="app-container">
    <h1 class="page-title">新闻列表</h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.title" placeholder="请输入标题" style="width: 200px;" size="small"></el-input>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="() => this.$router.push({name: 'add-news'})">添加新闻</el-button>
      <!-- <el-button class="filter-item filter-right-btn" type="danger" size="small" icon="el-icon-delete" :disabled="!selectedItemsCount" @click="deleteSelectedItems">删除</el-button> -->
    </div>
    <s-table :data="newsList" :columns="columns" size="medium">
      <template v-slot:action="{scope}">
        <el-button type="text" size="small" @click="handleDetails(scope.row.id)">查看</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getNewsList" />
  </div>
</template>
<script>
import { getNews as getNewsApi, deleteNews as deleteNewsApi } from '@/api/news'
import { parseTime } from '@/utils'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
export default {
  name: 'news-list',
  components: {
    STable,
    Pagination
  },
  data() {
    return {
      columns: [
        {
          attrs: {
            prop: 'title',
            label: '新闻标题',
            sortable: true,
          }
        },
        {
          attrs: {
            prop: 'publishUser',
            label: '发布人',
            align: "center",
            sortable: true,
          }
        },
        {
          attrs: {
            prop: 'publishDept',
            label: '发布部门',
            align: "center",
            sortable: true,
          }
        },
        {
          attrs: {
            prop: 'createtime',
            label: '发布时间',
            align: 'center',
            sortable: true,
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
      ],
      listQuery: {
        title: '',
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      newsList: [],
      selectedItems: []
    }
  },
  computed: {
    selectedItemsCount() {
      return this.selectedItems.length
    }
  },
  methods: {
    initData(list) {
      return list.map((item) => {
        return {
          id: item.id,
          corid: item.corid,
          corname: item.corname,
          title: item.title,
          content: item.content,
          createtime: item.createtime,
          publishDept: item.deptInfo && item.deptInfo.length ? item.deptInfo[0].name : '',
          publishUser: item.releaseuser && item.releaseuser.length ? item.releaseuser[0].name : '',
          likePeople: item.likePeople,
          likenum: item.likenum && item.likenum.length ? item.likenum[0] : null,
          news_like: item.news_like && item.news_like.length ? item.news_like[0] : null,
          replicenum: item.replicenum && item.replicenum.length ? item.replicenum[0] : null
        }
      })
    },
    getNewsList() {
      getNewsApi(this.listQuery.title, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        let { data, page } = result
        // console.log(data)
        this.newsList = this.initData(data)
        console.log(this.newsList)
        this.total = page.totalCount
      }).catch((err) => {  })
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    handleEdit(id) {
      this.$router.push({
        name: 'edit-news',
        params: {
          id
        }
      })
    },
    handleDetails(id) {
      this.$router.push({
        name: 'details-news',
        params: {
          id
        }
      })
    },
    handleDelete(id) {
      // 删除
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNewsApi(id).then((result) => {
          this.$message.success('删除成功')
          this.getNewsList()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {})
    },
    handleSearch() {
      this.getNewsList()
    }
  },
  mounted() {
    this.getNewsList()
  }
}
</script>
<style lang="less" scoped>

</style>
