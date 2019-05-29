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
      let id = this.$route.query.Id
      window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a89e726a1bf0142&redirect_uri=http%3A%2F%2Fwww.yuezhonghao.cn%2FHBO%2Fwechart%2FOAuth&response_type=code&scope=snsapi_base&state=${id}#wechat_redirect`)
    }
  }
}
</script>