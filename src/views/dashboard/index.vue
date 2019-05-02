<template>
  <div class="app-container">
    app
    <el-input v-model="msg"></el-input>
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data() {
    return {
      msg: ''
    }
  },
}
</script>