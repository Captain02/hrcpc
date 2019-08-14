<template>
  <div class="mobile-container">
    <div class="result-view">
      <div class="result-icon">
        <icon-svg v-if="isSuccess" icon-class="success" class-name="success"></icon-svg>
        <icon-svg v-else icon-class="error" class-name="error"></icon-svg>
      </div>
      <div class="result-text">
        <span>{{message}}</span>
      </div>
      <div class="result-desc">
        {{description}}
      </div>
      <div class="result-action" v-if="isSuccess">
        <el-image :src="qqqun"></el-image>
      </div>
    </div>
  </div>
</template>
<script>
import qqqun from '@/assets/img/qqqun.png'
export default {
  name: 'result',
  data() {
    return {
      qqqun,
      code: this.$route.query.code,
      corid: this.$route.query.corid,
      openid: this.$route.query.openid,
      type: this.$route.query.type
    }
  },
  computed: {
    isJoined() {
      return +this.code === 505
    },
    isSuccess() {
      return +this.code === 0
    },
    message() {
      return +this.code === 0 ? '加入成功' : '加入失败'
    },
    description() {
      return +this.code === 0 ? '您已加入成功，长按下方二维码可加入相关QQ群进行交流。' : '加入失败，您已加入无需再次加入。'
    }
  },
  methods: {
  },
  mounted() {
    // 如果没有加入成功并且没有重复加入
    if(!this.isSuccess && !this.isJoined){
      this.$router.replace({
        path: '/register',
        query: {
          code: this.code,
          corid: this.corid,
          openid: this.openid,
          type: this.type
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.result-view {
  margin-top: 2rem;
  text-align: center;
  .result-icon {
    font-size: 6rem;
    .success {
      color: #67C23A;
    }
    .error {
      color: #F76260;
    }
  }
  .result-text {
    font-size: 2.3rem;
    margin: 1rem 0;
  }
  .result-desc {
    font-size: 14px;
    color: #999;
    line-height: 22px;
  }
  .result-action {
    margin-top: 2rem;
  }
}

</style>
