<template>
  <div class="app-container">
    <h1 class="page-title">修改活动信息</h1>
    <activity-form :isAdd="false"/>
  </div>
</template>
<script>
import activityForm from './eForm'
export default {
  name: 'edit-activity',
  components: {
    activityForm
  }
}
</script>