<template>
  <div class="app-container">
    <h1 class="page-title">修改活动信息</h1>
    <activity-form :isAdd="false" @on-edit-success="handleSuccess" />
  </div>
</template>
<script>
import activityForm from './eForm'
export default {
  name: 'edit-activity',
  components: {
    activityForm
  },
  methods: {
    handleSuccess() {
      this.$message.success('修改成功')
      this.$router.push({
        name: 'activity-list'
      })
    }
  }
}
</script>