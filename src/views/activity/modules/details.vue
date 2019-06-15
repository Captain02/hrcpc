<template>
  <div class="app-container">
    <div class="article" v-if="actvity">
      <h1 class="article-title">{{actvity.actname}}</h1>
      <div class="article-meta">
        <span class="meta">{{actvity.corname}}  ·  {{actvity.deptInfo ? actvity.deptInfo.name : ''}}</span>
        <span class="author">活动负责人：{{actvity.actleading ? actvity.actleading.name : ''}}</span>
        <span class="date">创建时间：{{actvity.createtime}}</span>
      </div>
      <div class="article-content" v-html="actvity.actdetails">
      </div>
      <div class="article-action">
        <div class="actions">
          <div class="like-wrapper" title="点赞">
            <icon-svg :icon-class="like.icon"></icon-svg>
            <span class="count">{{actvity.bbs_like.num}}</span>
          </div>
          <div class="collect-wrapper" title="收藏">
            <icon-svg :icon-class="collect.icon"></icon-svg>
            <span class="count">{{actvity.bbs_collection.num}}</span>
          </div>
        </div>
        <div class="message">
          <div class="text">面向人群：
            <span v-for="item in actvity.crowdpeople" :key="item.id">{{item.value}}、</span>
          </div>
          <div class="date">活动时间：{{parseTime(actvity.actstarttame, '{y}-{m}-{d}')}}
            -
            {{parseTime(actvity.actendtime, '{y}-{m}-{d}')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getActivity as getActivityApi } from '@/api/activity'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
export default {
  name: 'details-activity',
  data() {
    return {
      actvity: null
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
    like() {
      let flag = this.actvity.likePeople.some((item) => {
        return item === this.userId
      })
      return flag ?  { icon: 'full-like', status: true} : { icon: 'like', status: false }
    },
    collect() {
      let flag = this.actvity.collectionPeople.some((item) => {
        return item === this.userId
      })
      return flag ? { icon: 'full-collect', status: true } : { icon: 'collect', status: false }
    }
  },
  methods: {
    parseTime,
    initData(data) {
      return {
        actid: data.actid,
        actcorid: data.actcorid,
        actname: data.actname,
        actstarttame: data.actstarttame,
        actendtime: data.actendtime,
        createtime: data.createtime,
        profile: data.profile,
        actdetails: data.actdetails,
        // corname: data.corname,
        corname: '红帽子',
        actleading: data.actleading && data.actleading.length ? data.actleading[0] : null,
        likePeople: data.likePeople,
        collectionPeople: data.collectionPeople,
        crowdpeople: data.crowdpeople,
        bbs_like: data.bbs_like && data.bbs_like.length ? data.bbs_like[0] : null,
        bbs_collection: data.bbs_collection &&  data.bbs_collection.length ? data.bbs_collection[0] : null,
        deptInfo: data.deptInfo && data.deptInfo.length ? data.deptInfo[0] : null,
        processnodes: data.processnodes && data.processnodes.length ? data.processnodes : [],
        video: data.video && data.video.length ? data.video[0] : null,
        image: data.image && data.image.length ? data.image[0] : null
      }
    },
    getActivity() {
      getActivityApi(this.$route.params.id).then((result) => {
        console.log(result)
        let { data } = result
        this.actvity = this.initData(data)
      }).catch((err) => { })
    }
  },
  mounted() {
    this.getActivity()
  }
}
</script>
<style lang="less" scoped>
.article {
  width: 650px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  overflow: hidden;
  // box-shadow: 
  .article-title {
    text-align: center;
    font-size: 22px;
    font-weight:bold;
    padding: 15px 0;
  }
  .article-meta {
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
    color: rgba(0, 0, 0, .45);
    span {
      margin-right: 23px;
    }
  }
  .article-content{
    margin: 25px 0 15px;
  }
  .article-action {
    display: flex;
    align-items: flex-end;
    .actions {
      min-width: 100px;
      display: flex;
      .like-wrapper, .collect-wrapper {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #EBEEF5;
        color: rgba(0, 0, 0, .5);
        border-radius: 4px;
        margin-right: 10px;
        transition: color .4s;
        cursor: pointer;
        &:hover {
          color: #2c3e50;
        }
      }
    }
    .message {
      width: 300px;
      margin-left: auto;
      line-height: 20px;
      font-size: 13px;
      color: rgba(0, 0, 0, .5);
    }
  }
}
</style>
