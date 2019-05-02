<template>
  <div class="app-container">
    userGroup
    <el-input v-model="msg"></el-input>
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'userGroup',
  data() {
    return {
      msg: ''
    }
  },
}
</script>