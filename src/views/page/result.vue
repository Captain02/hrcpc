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
        <el-button type="success">加入QQ群</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result',
  data() {
    return {
      code: this.$route.query.code,
      corid: this.$route.query.corid,
      openid: this.$route.query.openid
    }
  },
  computed: {
    isSuccess() {
      return +this.code === 0
    },
    message() {
      return +this.code === 0 ? '参与成功' : '参与失败'
    },
    description() {
      return +this.code === 0 ? '您已参与成功，点击下方按钮可加入相关QQ群进行交流。' : '参与失败，稍后将跳转至相关页面'
    }
  },
  methods: {
  },
  mounted() {
    if(!this.isSuccess){
      // setTimeout(() => {
      //   this.$router.replace({
      //     path: 'login'
      //   })
      // }, 3000)
    }
  }
}
</script>

<style scoped lang="less">
.result-view {
  margin-top: 6rem;
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
    margin: 2rem 0 1.3rem;
  }
  .result-desc {
    font-size: 14px;
    color: #999;
    line-height: 22px;
  }
  .result-action {
    margin-top: 3rem;
    .el-button--success {
      width: 100%;
    }
  }
}

</style>
