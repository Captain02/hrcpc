<template>
  <el-card class="notice-card">
    <div slot="header">
      <span>公告</span>
      <el-button type="text" size="small" style="float: right;padding: 0;" >更多</el-button>
    </div>
    <ul class="notice-list">
      <li class="notice-item">通知德州学院一男子竟在宿舍做出这种事... <span class="date">2019-7-15</span> </li>
      <li class="notice-item">大头儿子的爸爸竟然是小头爸爸... <span class="date">2019-6-30</span> </li>
      <li class="notice-item">穿山甲到底说了什么<span class="date">2019-6-25</span> </li>
    </ul>
  </el-card>
</template>
<script>
import { getNoticesInHome as getNoticesInHomeApi } from '@/api/notices'
import { mapState } from 'vuex'
export default {
  name: 'notice-card',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.userName
    })
  },
  methods: {
    getNotices() {
      getNoticesInHomeApi(this.username, 1, 5).then((result) => {
        console.log(result)
      }).catch((err) => { console.log(err) })
    }    
  },
  mounted() {
    this.getNotices()
  }
}
</script>
<style lang="less" scoped>
.notice-list {
  .notice-item {
    line-height: 25px;
    font-size: 13px;
    .date {
      float: right;
      color: #909399;
    }
  }
}
</style>
