<template>
  <div class="mobile-container">
    <div class="add-wrapper" @click="handleClick">
      <div class="add-icon-area">
        <icon-svg icon-class="add"></icon-svg>
      </div>
      <div class="add-text-area">
        <span>立即加入</span>
      </div>

      <p>type：{{$route.query.type}}</p>
      <p>id：{{$route.query.Id}}</p>
    </div>
  </div>
</template>
<script>
import { codeMap as codeMapApi } from '@/api/comm'
export default {
  name: 'code-map',
  methods: {
    handleClick() {
      let id = this.$route.query.Id
      let type = this.$route.query.type
      window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a89e726a1bf0142&redirect_uri=https%3A%2F%2Fwww.btzmpro.com%2FHBO%2Fwechart%2FOAuth&response_type=code&scope=snsapi_base&state=${id},${type},${deptid},${corid}#wechat_redirect`)
    }
  }
}
</script>
<style lang="less" scoped>
.add-wrapper {
  text-align: center;
  width: 150px;
  height: 200px;
  margin: 6rem auto;
  
  .add-icon-area {
    font-size: 7rem;
    color: #10AEFF;
  }
  .add-text-area {
    margin-top: 25px;
    font-size: 1.5rem;
  }
}

</style>
