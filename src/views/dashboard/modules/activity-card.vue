<template>
  <el-card :body-style="{padding: '10px'}">
    <div slot="header">
      <span>社团活动</span>
      <el-button type="text" size="small" style="float: right;padding: 0;" @click="() => this.$router.push({name: 'activity-list'})">更多</el-button>
    </div>
    <s-table :data="list" size="small" :columns="columns">
      <template v-slot:avatar="{scope}">
        <s-avatar :url="scope.row.avatar" alt="头像" />
      </template>
    </s-table>
  </el-card>
</template>
<script>
import { getActivitys as getActivitysApi } from '@/api/activity'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import STable from '_c/STable'
import SAvatar from '_c/SAvatar'
export default {
  name: 'activity-card',
  components: {
    STable,
    SAvatar
  },
  data() {
    return {
      list: [],
      columns: [
        {
          slot: 'avatar',
          attrs: {
            prop: 'avatar',
            width: '100',
            label: '头像'
          }
        },
        {
          attrs: {
            prop: 'actname',
            label: '活动名称',
            formatter: (row, column, cellValue, index) => {
              return cellValue.length >= 35 ? cellValue.substring(0, 36) : cellValue
            }
          }
        },
        {
          attrs: {
            prop: 'corname',
            label: '社团名称',
            align: "center",
            width: '100'
          }
        },
        {
          attrs: {
            prop: 'createtime',
            label: '发布时间',
            align: 'center',
            width: '150',
            formatter: (row, column, cellValue, index) => parseTime(cellValue, '{y}-{m}-{d}')
          }
        },
      ]
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    initList(list) {
      return list.map((item) => {
        return {
          avatar: item.actlead && item.actlead.length && item.actlead[0].filepath ? item.actlead[0].filepath : '',
          actname: item.actname,
          corname: item.corname,
          createtime: item.createtime
        }
      })
    },
    getActivityList() {
      getActivitysApi(this.corid).then((result) => {
        let { data } = result
        // console.log(result)
        this.list = this.initList(data)
      }).catch((err) => { })
    }
  },
  mounted() {
    this.getActivityList()
  }
}
</script>
