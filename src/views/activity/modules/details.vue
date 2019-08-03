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
      <h1 class="comments-title">评论</h1>
      <reply class="reply-box" @on-reply="(content) => { this.handleReply(0, this.activity.actid, content, 0) }"></reply>
      <s-comments :list="comments" @cancel-comment-like="handleCancelCommentLike" @add-comment-like="handleAddCommentLike" @on-reply="handleReply"></s-comments>
    </div>
  </div>
</template>
<script>
import { getActivity as getActivityApi, getComments as getCommentsApi , changeLike as changeLikeApi, changeCollect as changeCollectApi, changeCommentLike as changeCommentLikeApi, addComment as addCommentApi } from '@/api/activity'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import VideoPlayer from '_c/VideoPlayer'
import SComments from '_c/SComments'
import Reply from '_c/SComments/Reply'
export default {
  name: 'details-activity',
  components: {
    VideoPlayer,
    SComments,
    Reply
  },
  data() {
    return {
      activity: null,
      comments: []
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
    initActivityData(data) {
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
        // 获取评论
        this.getComments(data.actid)
        this.activity = this.initActivityData(data)
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
    },
    getComments(actid) {
      getCommentsApi(actid).then((result) => {
        console.log(result)
        let { data } = result
        this.comments = this.initCommentsData(data)
        console.log(this.comments)
      })
    },
    initCommentsData(data) {
      return data.map((item) => {
        let data = {
          repliesid: item.repliesid,
          createtime: item.createtime,
          parentid: item.parentid,
          topicid: item.topicid,                        // 在这指活动的id
          repliespeople: item.repliespeople && item.repliespeople.length ? item.repliespeople[0] : {},
          likePeopleIds: item.likePeopleIds,              // 为这条评论点赞的人
          likeNumber: item.likeNumber[0],                    // 点赞的人数
          repliedpeople: item.repliedpeople && item.repliedpeople.length ? item.repliedpeople[0] : {},
          repliescontent: item.repliescontent,            // 评论的内容
          child: item.child.length ? this.initCommentsData(item.child) : []
        }
        return data
      })
    },
    handleCancelCommentLike(commentid, status) {
      // console.log(commentid, status)
      changeCommentLikeApi(this.userId, commentid, Number(status)).then((result) => {
        let comment = this.getCommentByid(this.comments, commentid)
        let index = comment.likePeopleIds.findIndex((item) => {
          return item === this.userId
        })
        comment.likePeopleIds.splice(index, 1)
        comment.likeNumber--
      })
    },
    handleAddCommentLike(commentid, status) {
      // console.log(commentid, status)
      changeCommentLikeApi(this.userId, commentid, Number(status)).then((result) => {
        let comment = this.getCommentByid(this.comments, commentid)
        comment.likePeopleIds.push(this.userId)
        comment.likeNumber++
      })
    },
    getCommentByid(list, id) {
      let comment = null
      function handle(list, id){
        list.some((item) => {
          if(item.repliesid === id){
            comment = item
            return true
          }
          if(item.child.length){
            handle(item.child, id)
          }
        })
      }
      handle(list, id)
      return comment
    },
    handleReply(parentid, topicid, content, repliesuserid) {
      // console.log(parentid, topicid, content, repliesuserid)
      addCommentApi(this.userId, parentid, topicid, content, repliesuserid).then((result) => {
        console.log(result)
        this.getComments(this.activity.actid)
      })
    }
  },
  mounted() {
    this.getActivity()
    
  }
}
</script>
<style lang="less" scoped>


</style>
