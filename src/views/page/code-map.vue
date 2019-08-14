<template>
  <div class="mobile-container">
    <div class="card-panel">
      <div class="card-header">
        社团基本信息
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-item clearfix">
            <div class="label">社团名称：</div>
            <div class="text">红帽子</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">社团负责人：</div>
            <div class="text">赵国真</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">领导老师：</div>
            <div class="text">陈德山</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">工作地点：</div>
            <div class="text"></div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">所属学院：</div>
            <div class="text">信息管理学院</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">面向人群：</div>
            <div class="text">信息管理学院</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">社团规模：</div>
            <div class="text">500人</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-header">
        海报图片
      </div>
      <div class="card-media">
        <el-image src="123"></el-image>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-header">
        宣传视频
      </div>
      <div class="card-media">
        <video src="132" controls="controls"></video>
      </div>
    </div>
    <!-- <div class="add-wrapper" @click="handleClick">
      <div class="add-icon-area">
        <icon-svg icon-class="add"></icon-svg>
      </div>
      <div class="add-text-area">
        <span>立即加入</span>
      </div>

      <p>type：{{$route.query.type}}</p>
      <p>id：{{$route.query.Id}}</p>
    </div> -->
  </div>
</template>
<script>
import { codeMap as codeMapApi, getCorporationInfo as getCorporationInfoApi } from '@/api/comm'
export default {
  name: 'code-map',
  data() {
    return {
      corporationInfo: null
    }
  },
  methods: {
    handleClick() {
      let id = this.$route.query.Id
      let type = this.$route.query.type
      window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a89e726a1bf0142&redirect_uri=https%3A%2F%2Fwww.btzmpro.com%2FHBO%2Fwechart%2FOAuth&response_type=code&scope=snsapi_base&state=${id},${type},${deptid},${corid}#wechat_redirect`)
    },
    getCorporationInfo() {
      getCorporationInfoApi().then((result) => {
        console.log(result)
        this.corporationInfo = result.data[0]

      }).catch((err) => { console.log(err) })
    }
  },
  mounted() {
    this.getCorporationInfo()
  }
}
</script>
<style lang="less" scoped>
.card-panel {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  margin: 10px;
  border-radius: 2px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 2px rgba(0,0,0,.3);
  line-height: 21px;
  color: #000;
  .card-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 39px;
    padding: 10px 15px;
    &::after {
      content: '';
      position: absolute;
      top: auto;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #c8c7cc;
    }
  }
  .card-content {
    font-size: 14px;
    position: relative;
    .card-content-inner {
      position: relative;
      padding: 15px;
      .card-content-item {
        margin-top: 10px;
        .label {
          width: 35%;
          float: left;
          color: #848484;
        }
        .text {
          width: 65%;
          float: left;
        }
      }
     
    }
  }
  .card-media {
    height: 150px;
    width: 340px;
    video {
      width: 100%;
      height: 100%;
    }
  }
}

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
