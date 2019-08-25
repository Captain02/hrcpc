<template>
  <div class="container" v-if="activity">
    <div class="card-panel">
      <div class="card-header">
        活动信息
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-item clearfix">
            <div class="label">活动名称：</div>
            <div class="text">{{activity.actname}}</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">活动负责人：</div>
            <div class="text">{{activity.actleading ? activity.actleading.name : '暂无'}}</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">发布部门：</div>
            <div class="text">{{activity.deptName}}</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">创建时间：</div>
            <div class="text">{{parseTime(activity.createtime, '{y}-{m}-{d}')}}</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">活动时间：</div>
            <div class="text">{{parseTime(activity.actstarttame, '{y}-{m}-{d}')}}  -   {{parseTime(activity.actendtime, '{y}-{m}-{d}')}}</div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">活动流程：</div>
            <div class="text">
              <el-steps space="20%" :active="countActives(activity.processnodes)" finish-status="success">
              <el-step v-for="node in activity.processnodes" :key="node.proid" >
                <span slot="title">{{node.processnode}}</span>
              </el-step>
            </el-steps>
            </div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">面向人群：</div>
            <div class="text">
              {{crowd}}
            </div>
          </div>
          <div class="card-content-item clearfix">
            <div class="label">附件文件：</div>
            <div class="text">
              <el-link target="_blank" v-if="activity.enclosure" :href="activity.enclosure.filepath" :underline="false">{{activity.enclosure.name}}</el-link>
              <span v-else>暂无附件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-header">
        活动简介
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          {{activity.profile || '暂无简介'}}
        </div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-header">
        活动海报
      </div>
      <div class="card-media">
        <el-image v-if="activity.image" :src="activity.image.filepath"></el-image>
        <div v-else>暂无图片</div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-header">
        活动视频
      </div>
      <div class="card-media">
        <video v-if="activity.video" :src="activity.video.filepath" controls="controls"></video>
        <div v-else>暂无视频</div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-header">
        活动详情
      </div>
      <div class="card-content">
        <div class="card-content-inner" v-html="activity.actdetails || '暂无内容'"></div>
      </div>
    </div>
    <el-button type="primary" class="full-width fixed-btn" @click="handleClick">立即加入</el-button>
  </div>
</template>
<script>
import { getActivity as getActivityApi } from '@/api/activity' 
import { parseTime } from '@/utils'

export default {
  name: 'join-activity',
  data() {
    return {
      activity: null
    }
  },
  computed: {
    crowd() {
      let { crowdpeople } = this.activity
      return crowdpeople.map((item) => {
        return item.value
      }).join('，')
    }
  },
  methods: {
    parseTime,
    countActives(nodes) {
      let count = 0
      nodes.forEach((item) => {
        if(item.states){
          count++
        }
      })
      return count
    },
    initActivity(data) {
      return {
        actid: data.actid,
        actcorid: data.actcorid,
        actname: data.actname,
        actstarttame: data.actstarttame,
        actendtime: data.actendtime,
        createtime: data.createtime,
        profile: data.profile,
        actdetails: data.actdetails,
        corname: data.corname,
        actleading: data.actleading && data.actleading.length ? data.actleading[0] : null,
        crowdpeople: data.crowdpeople,
        deptName: data.name,
        processnodes: data.processnodes && data.processnodes.length ? data.processnodes : [],
        enclosure: data.enclosureFile && data.enclosureFile.length ? data.enclosureFile[0] : null,
        video: data.video && data.video.length ? data.video[0] : null,
        image: data.image && data.image.length ? data.image[0] : null
      }
    },
    getActivity() {
      let id = this.$route.query.Id
      getActivityApi(id).then((result) => {
        this.activity = this.initActivity(result.data)
      }).catch((err) => { console.log(err) });
    },
    handleClick() {

    }
  },
  mounted() {
    this.getActivity()
  }
}
</script>
<style lang="less" scoped>
.fixed-btn {
  position: fixed;
  // top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.container {
  background-color: #efeff4;
  overflow: auto;
  padding-bottom: 40px;
}
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
          /deep/.el-step__icon {
            width: 20px;
            height: 20px;
            font-size: 13px;
          }
          /deep/.el-step__title {
            line-height: 25px;
            font-size: 13px;
          }
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
</style>