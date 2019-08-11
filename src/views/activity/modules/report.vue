<template>
  <div class="app-container">
    <h1 class="page-title">{{actName}}活动报名统计</h1>
    <el-tabs v-model="activeTab" @tab-click="handleClickTab">
      <el-tab-pane label="表格统计" name="table">
        <table-panel :data="tableData">
          <template v-slot:filter-btn>
            <el-input class="filter-item" v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" size="small"></el-input>
            <el-input class="filter-item" v-model="listQuery.username" placeholder="请输入学号" style="width: 200px;" size="small"></el-input>
            <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <publish-notice class="filter-item" :users="tableData" v-slot:action-btn>
              <el-button type="primary" size="small">发布公告</el-button>
            </publish-notice>
          </template>
          <template v-slot:pagination>
            <pagination  v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getTableData" />
          </template>
        </table-panel>
      </el-tab-pane>
      <el-tab-pane label="图表统计" name="charts" :lazy="true">
        <charts-panel :data="chartsData"></charts-panel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getActivity as getActivityApi, getUsersByActId as getUsersByActIdApi, getActCharts as getActChartsApi } from '@/api/activity'
import tablePanel from './table-panel'
import chartsPanel from './charts-panel'
import PublishNotice from '_c/PublishNotice'
import Pagination from '_c/Pagination'
import { mapState } from 'vuex'
export default {
  name: 'activity-report',
  components: {
    tablePanel,
    chartsPanel,
    PublishNotice,
    Pagination
  },
  data() {
    return {
      listQuery: {
        name: '',
        username: '',
        currPage: 1,
        pageSize: 10
        
      },
      actId: this.$route.params.id,
      actName: '',
      activeTab: 'table',
      dataMap: {
        table: 'getTableData',
        charts: 'getChartsData'
      },
      total: 0,
      tableData: [],
      chartsData: {}
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    getActivity() {
      getActivityApi(this.actId).then((result) => {
        // console.log(result)
        let { data } = result
        this.actName = data.actname
      }).catch((err) => { })
    },
    getTableData() {
      getUsersByActIdApi(this.actId, this.listQuery.name, this.listQuery.username, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        console.log(result)
        let { data, page } = result
        this.tableData = data
        this.total = page.totalCount
      }).catch((err) => {})
    },
    getChartsData() {
      getActChartsApi(this.actId).then((result) => {
        console.log(result)
        // let { data } = result
        this.chartsData = {
          groupCollege: result.groupCollege,
          groupGender: result.groupGender,
          groupPersonNum: result.groupPersonNum,
          groupcollegetie: result.groupcollegetie
        }
      }).catch((err) => {})
    },
    handleSearch() {
      this.getTableData()
    },
    handleClickTab(tab, event) {
      this[this.dataMap[this.activeTab]]()
    }
  },
  mounted() {
    this.getActivity()
    this[this.dataMap[this.activeTab]]()
  },

}
</script>