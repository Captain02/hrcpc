<template>
  <div class="app-container">
    <h1 class="page-title">添加社团活动</h1>
    <activity-form @on-add-success="handleSuccess" />
  </div>
</template>
<script>
import activityForm from './eForm'
export default {
  name: 'add-activity',
  components: {
    activityForm
  },
  methods: {
    handleSuccess() {
      this.$message.success('添加成功')
      setTimeout(() => {
        this.$router.push({
          name: 'activity-list'
        })
      }, 1500)
      
    }
  }
}
</script>
