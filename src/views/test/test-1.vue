<template>
  <div class="app-container">
    test-1
    <el-input v-model="msg"></el-input>
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'test-1',
  data() {
    return {
      msg: ''
    }
  },
}
</script>