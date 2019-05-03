<template>
  <div class="app-container">
    addUser
    <el-input v-model="msg"></el-input>
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'addUser',
  data() {
    return {
      msg: ''
    }
  },
}
</script>