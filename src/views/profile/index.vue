<template>
  <div class="app-container">
    <el-tabs tab-position="left" v-model="activeTab">
      <el-tab-pane label="基本信息" name="userInfo" :lazy="true">
        <user-info/>
      </el-tab-pane>
      <el-tab-pane label="通知公告" name="notice" :lazy="true">
        <notice-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import userInfo from './modules/userInfo'
import noticeList from './modules/noticeList'
export default {
  name: 'profile',
  components: {
    userInfo,
    noticeList
  },
  data() {
    return {
      activeTab: this.$route.query.name || 'userInfo'
    }
  },
}
</script>
<style lang="less" scoped>
.profile-content {
  padding: 25px;
}
</style>