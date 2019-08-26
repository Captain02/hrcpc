<template>
  <div class="info-card-wrap" v-if="corporation">
    <div class="info-card-panel">
      <div class="info-card-header">
        社团基本信息
      </div>
      <div class="info-card-content">
        <div class="info-card-content-inner">
          <div class="info-card-content-item clearfix">
            <div class="label">社团名称：</div>
            <div class="text">{{corporation.corname}}</div>
          </div>
          <div class="info-card-content-item clearfix">
            <div class="label">社团负责人：</div>
            <div class="text">{{corporation.leadingname}}</div>
          </div>
          <div class="info-card-content-item clearfix">
            <div class="label">领导老师：</div>
            <div class="text">{{corporation.cortercher}}</div>
          </div>
          <div class="info-card-content-item clearfix">
            <div class="label">工作地点：</div>
            <div class="text">{{corporation.corworkspace}}</div>
          </div>
          <div class="info-card-content-item clearfix">
            <div class="label">所属学院：</div>
            <div class="text">{{corporation.corcollegename}}</div>
          </div>
          <div class="info-card-content-item clearfix">
            <div class="label">面向人群：</div>
            <div class="text">{{crowd}}</div>
          </div>
          <div class="info-card-content-item clearfix">
            <div class="label">社团规模：</div>
            <div class="text">{{corporation.corscale}}人</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-card-panel">
      <div class="info-card-header">
        海报图片
      </div>
      <div class="info-card-media">
        <el-image :src="corporation.bannerfile"></el-image>
      </div>
    </div>
    <div class="info-card-panel">
      <div class="info-card-header">
        宣传视频
      </div>
      <div class="info-card-media">
        <video :src="corporation.videofile" controls="controls"></video>
      </div>
    </div>
    <div class="info-card-panel">
      <div class="info-card-header">
        社团简介
      </div>
      <div class="info-card-content">
        <div class="info-card-content-inner" v-html="corporation.descs || '暂无简介'"></div>
      </div>
    </div>
    <el-button type="primary" class="full-width fixed-btn" @click="handleClick">立即加入</el-button>
  </div>
</template>
<script>
import { codeMap as codeMapApi, getCorporationInfo as getCorporationInfoApi, getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
export default {
  name: 'join',
  data() {
    return {
      corporation: null,
      collegeMap: {}
    }
  },
  computed: {
    crowd() {
      const { corcrowd } = this.corporation
      if(!corcrowd.length){
        return '全校'
      }else{
        return corcrowd.map((item) => {
          return this.collegeMap[item+'']
        }).join('，')
      }
    }
  },
  methods: {
    handleClick() {
      let id = this.$route.query.Id
      let type = this.$route.query.type
      /**
       * type1 = 申请加入社团
       * type3 = 申请加入活动
       */
      window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a89e726a1bf0142&redirect_uri=${this.$constants.WECHAT_API}&response_type=code&scope=snsapi_base&state=${id},${type},null,null#wechat_redirect`)
    },
    getCorporationInfo() {
      let id = this.$route.query.Id
      getCorporationInfoApi(id).then((result) => {
        console.log(result)
        this.corporation = result.data[0]

      }).catch((err) => { console.log(err) })
    },
    getCollegeList() {
      getCollegeInfoApi(1, null).then((result) => {
        let { data: list } = result
        list.forEach((item) => {
          this.collegeMap[item.id] = item.value
        })
      }).catch((err) => { })
    }
  },
  mounted() {
    this.getCollegeList()
    this.getCorporationInfo()
  }
}
</script>
