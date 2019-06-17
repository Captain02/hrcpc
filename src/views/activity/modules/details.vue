<template>
  <div class="article-wrapper">
    <div class="article" v-if="activity">
      <h1 class="article-title">{{activity.actname}}</h1>
      <div class="article-meta">
        <span class="meta">{{activity.corname}}  ·  {{activity.deptInfo ? activity.deptInfo.name : ''}}</span>
        <span class="author">活动负责人：{{activity.actleading ? activity.actleading.name : ''}}</span>
        <span class="date">创建时间：{{activity.createtime}}</span>
      </div>
      <div class="article-content">
        <div class="image-wrapper">
          <el-image :src="activity.image ? activity.image.filepath : ''"></el-image>
        </div>
        
        <div class="textarea-wrapper" v-html="activity.actdetails"></div>
        <div class="video-wrapper">
          <video-player :video-source="activity.video ? activity.video.filepath : ''"></video-player>
        </div>
      </div>
      <div class="article-action">
        <div class="actions">
          <div class="like-wrapper" title="点赞" @click="handleLike">
            <icon-svg :icon-class="like.icon"></icon-svg>
            <span class="count">{{activity.bbs_like.num}}</span>
          </div>
          <div class="collect-wrapper" title="收藏" @click="handleCollect">
            <icon-svg :icon-class="collect.icon"></icon-svg>
            <span class="count">{{activity.bbs_collection.num}}</span>
          </div>
        </div>
        <div class="message">
          <div class="text">面向人群：
            <span v-for="item in activity.crowdpeople" :key="item.id">{{item.value}}、</span>
          </div>
          <div class="date">活动时间：{{parseTime(activity.actstarttame, '{y}-{m}-{d}')}}
            -
            {{parseTime(activity.actendtime, '{y}-{m}-{d}')}}</div>
        </div>
      </div>
    </div>
    <div class="comments-wrapper">
      <s-comments :list="comments"></s-comments>
    </div>
  </div>
</template>
<script>
import { getActivity as getActivityApi, changeLike as changeLikeApi, changeCollect as changeCollectApi } from '@/api/activity'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import VideoPlayer from '_c/VideoPlayer'
import SComments from '_c/SComments'
export default {
  name: 'details-activity',
  components: {
    VideoPlayer,
    SComments
  },
  data() {
    return {
      activity: null,
      comments: [
        {
          "repliespeople": [
            {
              "college": "历史与社会管理学院",
              "descs": "<p>卡卡卡卡</p>",
              "gender": "男",
              "filepath": "/file/persionDefaultHeadPicture/20190517155219man.png",
              "user_id": 1,
              "corid": null,
              "name": "赵国哈哈",
              "collegetie": "公管事业管理",
              "headpath": "/file/persionDefaultHeadPicture/20190517155219man.png",
              "username": "admin"
            }
          ],
          "repliesid": 2,
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
    like() {
      let flag = this.activity.likePeople.some((item) => {
        return item === this.userId
      })
      return flag ?  { icon: 'full-like', status: true} : { icon: 'like', status: false }
    },
    collect() {
      let flag = this.activity.collectionPeople.some((item) => {
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
        corname: data.corname,
        actleading: data.actleading && data.actleading.length ? data.actleading[0] : null,
        likePeople: data.likePeople,
        collectionPeople: data.collectionPeople,
        crowdpeople: data.crowdpeople,
        bbs_like: data.bbs_like && data.bbs_like.length ? data.bbs_like[0] : null,
        bbs_collection: data.bbs_collection &&  data.bbs_collection.length ? data.bbs_collection[0] : null,
        deptName: data.name,
        processnodes: data.processnodes && data.processnodes.length ? data.processnodes : [],
        video: data.video && data.video.length ? data.video[0] : null,
        image: data.image && data.image.length ? data.image[0] : null
      }
    },
    getActivity() {
      getActivityApi(this.$route.params.id).then((result) => {
        console.log(result)
        let { data } = result
        this.activity = this.initData(data)
      }).catch((err) => { })
    },
    handleLike() {
      let status = this.like.status ? false : true
      changeLikeApi(Number(status), this.userId, this.activity.actid).then((result) => {
        console.log(result)
        if(status) {
          this.addliked()
        } else {
          this.cancelLiked()
        }
      })
    },
    addliked() {
      this.activity.likePeople.push(this.userId)
      this.activity.bbs_like.num++
    },
    cancelLiked() {
      let index = this.activity.likePeople.findIndex((item) => {
        return item === this.userId
      })
      this.activity.likePeople.splice(index, 1)
      this.activity.bbs_like.num--
    },
    handleCollect() {
      let status = this.collect.status ? false : true
      changeCollectApi(Number(status), this.userId, this.activity.actid).then((result) => {
        console.log(result)
        if(status) {
          this.addCollected()
        } else {
          this.cancelCollected()
        }
      })
    },
    addCollected() {
      this.activity.collectionPeople.push(this.userId)
      this.activity.bbs_collection.num++
    },
    cancelCollected() {
      let index = this.activity.collectionPeople.findIndex((item) => {
        return item === this.userId
      })
      this.activity.collectionPeople.splice(index, 1)
      this.activity.bbs_collection.num--
    }
  },
  mounted() {
    this.getActivity()
  }
}
</script>
<style lang="less" scoped>
.article-wrapper {
  box-sizing: border-box;
  margin: 15px 15px;
  min-height: 600px;
  .comments-wrapper {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    width: 800px;
    margin: 0 auto;
    border: 1px solid #ebeef5;
    margin-top: 15px;
  }
  .article {
    box-sizing: border-box;
    background: #fff;
    width: 800px;
    margin: 0 auto;
    // padding: 20px;
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
      .image-wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
      .textarea-wrapper {
        padding: 20px;
      }
      .video-wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
    }
    .article-action {
      display: flex;
      align-items: flex-end;
      padding: 20px;
      border-top: 1px solid #ccc;
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
}

</style>
