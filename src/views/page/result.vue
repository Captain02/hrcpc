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
        <template v-if="qrcodes.length">
          <s-qrcode v-for="item in qrcodes" :key="item.id" :url="item.path" style="width: 100%; height: 100%; margin-bottom: 15px;" />
        </template>
        <div v-else>
          暂无上传二维码
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCorporationQRCode as getCorporationQRCodeApi } from '@/api/corporation'
import { getQQFileCode as getQQFileCodeApi } from '@/api/activity'
import SQrcode from '_c/SQRCode'
export default {
  name: 'result',
  components: {
    SQrcode
  },
  data() {
    return {
      qrcodes: [],
      code: this.$route.query.code,
      corid: this.$route.query.corid,       // 加入活动的时候是活动id加入社团的时候是社团id
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
    joinCorporation() {
      return +this.type === 1
    },
    joinActivity() {
      return +this.type === 3
    },
    message() {
      return this.isSuccess && this.joinCorporation ? '加入成功' : this.isSuccess && this.joinActivity ? '参与成功' : this.isJoined && this.joinCorporation ? '加入失败' : '参与失败'
    },
    description() {
      return this.isSuccess ? '您已加入成功，长按下方二维码可加入相关QQ群进行交流。' : '加入失败，您已加入无需再次加入。'
    }
  },
  methods: {
    getCorQRCode() {
      if(this.joinCorporation){
        getCorporationQRCodeApi(this.corid).then((result) => {
          // console.log(result)
          this.qrcodes = result.data
        }).catch((err) => { console.log(err) })
      } else if(this.joinActivity){
        getQQFileCodeApi(this.corid).then((result) => {
          let { data } = result
          data && (this.qrcodes = [
            {
              id: data.qqfile,
              path: data.qqfilepath
            }
          ])
        })
      }
      
    }
  },
  mounted() {
    // 如果没有加入成功并且没有重复加入
    // if(!this.isSuccess && !this.isJoined){
    //   this.$router.replace({
    //     path: '/register',
    //     query: {
    //       code: this.code,
    //       corid: this.corid,
    //       openid: this.openid,
    //       type: this.type
    //     }
    //   })
    // }
    if(this.isSuccess) {
      this.getCorQRCode()
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
