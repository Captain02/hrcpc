<template>
  <div class="app-container">
    Id: {{$route.query.Id}}
    <el-button @click="handleClick">提交</el-button>
  </div>
</template>
<script>
import { codeMap as codeMapApi } from '@/api/comm'
export default {
  name: 'code-map',
  methods: {
    handleClick() {
      codeMapApi(this.$route.query.Id).then((result) => {
        console.log(result)
      }).catch((err) => { })
    }
  }
}
</script>