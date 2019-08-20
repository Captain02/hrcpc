<template>
  <el-card class="notice-card">
    <div slot="header">
      <span>我的消息</span>
      <el-button type="text" size="small" style="float: right;padding: 0;" @click="handleClick">更多</el-button>
    </div>
    <ul class="notice-list">
      <div class="empty" v-if="!noticeList.length">暂无内容</div>
      <li class="notice-item" v-for="item in noticeList" :key="item.createtime" :title="item.notictop">
        <span class="text">{{item.notictop}}</span>
        <span class="date">{{parseTime(item.createtime, '{y}-{m}-{d}')}}</span> </li>
    </ul>
  </el-card>
</template>
<script>
import { getNoticesInHome as getNoticesInHomeApi } from '@/api/notices'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
export default {
  name: 'notice-card',
  data() {
    return {
      noticeList: []
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.userName
    })
  },
  methods: {
    parseTime,
    getNotices() {
      getNoticesInHomeApi(this.username, 1, 5).then((result) => {
        console.log(result)
        this.noticeList = result.data
      }).catch((err) => { console.log(err) })
    },
    handleClick() {
      this.$router.push({
        path: 'profile/index',
        query: { name: 'notice' }
      })
    }  
  },
  mounted() {
    this.getNotices()
  }
}
</script>
<style lang="less" scoped>
.notice-list {
  .empty {
    line-height: 22px;
    text-align: center;
    color: #909399;
    font-size: 13px;
  }
  .notice-item {
    line-height: 25px;
    font-size: 13px;
    .text {
      display: inline-block;
      width: 330px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .date {
      float: right;
      color: #909399;
    }
  }
}
</style>
