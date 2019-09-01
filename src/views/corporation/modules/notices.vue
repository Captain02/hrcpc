<template>
  <div class="app-container">
    <h1 class="page-title">通知公告</h1>
    <div class="filter-container">
      <el-input class="filter-item" v-model="listQuery.title" placeholder="通知标题" style="width: 200px;" size="small"></el-input>
      <el-input class="filter-item" v-model="listQuery.publishUser" placeholder="发布人" style="width: 200px;" size="small"></el-input>
      <el-input class="filter-item" v-model="listQuery.receiveUser" placeholder="接收人" style="width: 200px;" size="small"></el-input>
      <el-date-picker
        class="filter-item"
        style="display: inline-flex;"
        v-model="listQuery.dateTime"
        value-format="yyyy-MM-dd"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <s-table :data="noticeList" :columns="columns" size="medium">
      <template v-slot:title="{scope}">
        <details-notice v-slot:action-btn :noticid="scope.row.noticid">
          <div class="notice-title">{{scope.row.notictop}}</div>
        </details-notice>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getNoticeList" />
  </div>
</template>
<script>
import { getNotices as getNoticesApi, getNotice as getNoticeApi } from '@/api/notices'
import { parseTime } from '@/utils'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
import detailsNotice from './details-notice'
export default {
  name: 'notices',
  components: {
    STable,
    Pagination,
    detailsNotice
  },
  data() {
    return {
      noticeList: [],
      listQuery: {
        title: '',               // 标题
        publishUser: '',         // 发送人
        receiveUser: '',         // 接收人 
        dateTime: null,
        currPage: 1,
        pageSize: 10,
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      total: 0,
      columns: [
        {
          slot: 'title',
          attrs: {
            prop: 'notictop',
            label: '公告标题'
          }
        },
        {
          attrs: {
            prop: 'publishUser',
            label: '发布人',
            align: "center",
            width: 80
          }
        },
        {
          attrs: {
            prop: 'createtime',
            label: '发布时间',
            align: 'center',
            width: 120,
            sortable: true,
            formatter: (row, column, cellValue, index) => parseTime(cellValue, '{y}-{m}-{d}')
          }
        }
      ]
    }
  },
  methods: {
    getNoticeList() {
      let startTime = ''
      let endTime = ''
      if(this.listQuery.dateTime !== null){
        [startTime, endTime] = this.listQuery.dateTime
      }
      getNoticesApi(this.listQuery.title, this.listQuery.publishUser, this.listQuery.receiveUser, startTime, endTime, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        // console.log(result)
        let { data } = result
        this.noticeList = data
      }).catch((err) => { console.log(err) })
    },
    handleSearch() {
      this.getNoticeList()
    }
  },
  mounted() {
    this.getNoticeList()
  }
}
</script>
<style lang="less" scoped>
  .notice-title {
    cursor: pointer;
    color: #337ab7;
    transition: color .3s;
    &:hover {
      color: #409eff;
    }
  }
</style>