<template>
  <div>
    <s-table :data="noticeList" :columns="columns" size="medium">
      <template v-slot:title="{scope}">
        <details-notice v-slot:action-btn :data="scope.row">
          <div class="notice-title">{{scope.row.notictop}}</div>
        </details-notice>
      </template>
    </s-table>
    <pagination v-show="total>0" :total="total" :curr.sync="currPage" :size.sync="pageSize" @on-page-change="getNoticeList" />
  </div>
</template>
<script>
import { getNoticesInHome as getNoticesInHomeApi } from '@/api/notices'
import { parseTime } from '@/utils'
import detailsNotice from '../../corporation/modules/details-notice'
import STable from '_c/STable'
import Pagination from '_c/Pagination'
export default {
  components: {
    detailsNotice,
    STable,
    Pagination
  },
  data() {
    return {
      currPage: 1,
      pageSize: 10,
      total: 0,
      noticeList: [],
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
            prop: 'notictusername',
            label: '发布人',
            align: "center",
            width: 80
          }
        },
        {
          attrs: {
            prop: 'noticteduser',
            label: '接收人',
            align: "center",
            formatter: (row, column, cellValue, index) => {
              let notictedusers = ''
              cellValue.forEach(user => {
                notictedusers+=user.notictedusername + '，'
              })
              return notictedusers.substring(0, notictedusers.length - 1)
            }
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
        },
      ]
    }
  },
  methods: {
    getNoticeList() {
      getNoticesInHomeApi()
    }
  }
}
</script>