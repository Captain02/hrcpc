<template>
  <el-card :body-style="{padding: '10px'}">
    <div slot="header">
      <span>社团新闻</span>
      <el-button type="text" size="small" style="float: right;padding: 0;" @click="() => this.$router.push({name: 'news-list'})">更多</el-button>
    </div>
    <s-table :data="list" size="small" :columns="columns">
      <template v-slot:avatar="{scope}">
        <div class="table-avatar">
          <el-image :src="scope.row.avatar" alt="头像" >
            <div slot="error" class="image-slot">
              <icon-svg icon-class="img-load-fail"></icon-svg>
            </div>
          </el-image>
        </div>
      </template>
    </s-table>
  </el-card>
</template>
<script>
import { getNews as getNewsApi } from '@/api/news'
import { parseTime } from '@/utils'
import STable from '_c/STable'
export default {
  name: 'news-card',
  components: {
    STable
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
            prop: 'title',
            label: '新闻标题',
            formatter: (row, column, cellValue, index) => {
              return cellValue.length >= 35 ? cellValue.substring(0, 36) : cellValue
            }
          }
        },
        {
          attrs: {
            prop: 'publishUser',
            label: '发布人',
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
  methods: {
    initList(list) {
      return list.map((item) => {
        return {
          avatar: item.releaseuser && item.releaseuser.length ? item.releaseuser[0].filepath : '',
          title: item.title,
          publishUser: item.releaseuser && item.releaseuser.length ? item.releaseuser[0].name : '',
          createtime: item.createtime
        }
      })
    },
    getNewsList() {
      getNewsApi().then((result) => {
        // console.log(result)
        let { data } = result
        this.list = this.initList(data)
      }).catch((err) => { })
    },
  },
  mounted() {
    this.getNewsList()
  }
}
</script>
