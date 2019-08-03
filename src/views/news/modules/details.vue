<template>
  <div class="article-wrapper">
    <div class="article" v-if="news">
      <h1 class="article-title">{{news.title}}</h1>
      <div class="article-meta">
        <span class="meta">{{news.corname}}  ·  {{news.publishDept ? news.publishDept.name : ''}}</span>
        <span class="author">发布人：{{news.publishUser ? news.publishUser.name : ''}}</span>
        <span class="date">发布时间：{{news.createtime}}</span>
      </div>
      <div class="article-content">
        <div class="textarea-wrapper" v-html="news.content"></div>
      </div>
      <div class="article-action">
        <div class="actions">
          <div class="like-wrapper" title="点赞" @click="handleLike">
            <icon-svg :icon-class="like.icon"></icon-svg>
            <span class="count">{{news.news_like.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="comments-wrapper">
      <h1 class="comments-title">评论</h1>
      <reply class="reply-box" @on-reply="(content) => { this.handleReply(0, this.news.id, content, 0) }"></reply>
      <s-comments :list="comments" @cancel-comment-like="handleCancelCommentLike" @add-comment-like="handleAddCommentLike" @on-reply="handleReply"></s-comments>
    </div>
  </div>
</template>
<script>
import { getNewsByid as getNewsByidApi, changeLike as changeLikeApi, addComment as addCommentApi, getComments as getCommentsApi, changeCommentLike as changeCommentLikeApi  } from '@/api/news'
import { mapState } from 'vuex'
import SComments from '_c/SComments'
import Reply from '_c/SComments/Reply'

export default {
  name: 'details-news',
  components: {
    SComments,
    Reply
  },
  data() {
    return {
      news: null,
      comments: []
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
    like() {
      let flag = this.news.likePeople.some((item) => {
        return item === this.userId
      })
      return flag ?  { icon: 'full-like', status: true} : { icon: 'like', status: false }
    }
  },
  methods: {
    getNews() {
      let id = this.$route.params.id
      getNewsByidApi(id).then((result) => {
        let { data } = result
        console.log(result)
        this.getComments(data.id)
        this.news = this.initNewsData(data)
      }).catch((err) => { })
    },
    getComments(newsId) {
      getCommentsApi(newsId).then((result) => {
        console.log(result)
        let { data } = result
        this.comments = this.initCommentsData(data)
        // console.log(this.comments)
      })
    },
    initCommentsData(data) {
      return data.map((item) => {
        let data = {
          repliesid: item.id,
          createtime: item.createtime,
          parentid: item.parentid,
          topicid: item.topicid,                        // 在这指新闻的id
          repliespeople: item.RepliceUser && item.RepliceUser.length ? item.RepliceUser[0] : {},
          likePeopleIds: item.likeuser,              // 为这条评论点赞的人
          likeNumber: item.likenum[0],                    // 点赞的人数
          repliedpeople: item.ReplicedUser && item.ReplicedUser.length ? item.ReplicedUser[0] : {},
          repliescontent: item.repliescontent,            // 评论的内容
          child: item.getNewsReplice.length ? this.initCommentsData(item.getNewsReplice) : []
        }
        return data
      })
    },
    initNewsData(data) {
      return {
        corid: data.corid,
        corname: data.corname,
        id: data.id,
        title: data.title,
        content: data.content,
        createtime: data.createtime,
        publishDept: data.deptInfo && data.deptInfo.length ? data.deptInfo[0] : null,
        publishUser: data.releaseuser && data.releaseuser.length ? data.releaseuser[0] : null,
        likePeople: data.likePeople,
        news_like: data.news_like && data.news_like.length ? data.news_like[0] : null,
        news_replies: data.news_replies && data.news_replies.length ? data.news_replies[0] : null
      }
    },
    handleLike() {
      let status = this.like.status ? false : true
      changeLikeApi(Number(status), this.userId, this.news.id).then((result) => {
        console.log(result)
        if(status) {
          this.addliked()
        } else {
          this.cancelLiked()
        }
      })
    },
    addliked() {
      this.news.likePeople.push(this.userId)
      this.news.news_like.num++
    },
    cancelLiked() {
      let index = this.news.likePeople.findIndex((item) => {
        return item === this.userId
      })
      this.news.likePeople.splice(index, 1)
      this.news.news_like.num--
    },
    handleReply(parentid, topicid, content, repliesuserid) {
      // console.log(parentid, topicid, content, repliesuserid)
      addCommentApi(this.userId, parentid, topicid, content, repliesuserid).then((result) => {
        console.log(result)
        this.getComments(this.news.id)
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
  },
  mounted() {
    this.getNews()
  }
}
</script>
<style lang="less" scoped>
</style>

