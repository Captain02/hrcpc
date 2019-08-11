<template>
  <div class="app-container">
    <el-row :gutter="25">
      <el-col :span="9">
        <user-card class="card-panel" />
        <notices-card class="card-panel" />
        <calenderCard class="card-panel" />
      </el-col>
      <el-col :span="15">
        <news-card class="card-panel" />
        <activity-card class="card-panel" />
        <imgs-card />
      </el-col>
    </el-row>
    <!-- <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <curriculum-card></curriculum-card>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import userCard from './modules/user-card'
import noticesCard from './modules/notices-card'
import calenderCard from './modules/calender-card'
import newsCard from './modules/news-card'
import activityCard from './modules/activity-card'
import imgsCard from './modules/imgs-card'

export default {
  name: 'dashboard',
  components: {
    userCard,
    noticesCard,
    calenderCard,
    newsCard,
    activityCard,
    imgsCard
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.user-avatar {
  min-height: 60px;
}
.card-panel {
  margin-bottom: 20px;
}
</style>
<style>
.el-table--small td, .el-table--small th {
    padding: 5px 0;
  }
</style>

