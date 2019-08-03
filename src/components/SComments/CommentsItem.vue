<template>
  <div class="comment-item">
    <div class="comment-content">
      <div class="user-avatar">
        <el-image :src="comment.repliespeople.filepath" alt="头像" >
          <div slot="error" class="image-slot">
            <icon-svg icon-class="img-load-fail"></icon-svg>
          </div>
        </el-image>
      </div>
      <div class="comment-area">
        <div class="comment-meta">
          <div class="user-name">{{comment.repliespeople.name}}</div>
          <div class="user-college">{{comment.repliespeople.college}}</div>
        </div>
        <div class="content">
          <template v-if="comment.parentid !== 0">
            <span>回复  <span class="reply-name">{{comment.repliedpeople.name}}：</span>
            </span>
          </template>{{comment.repliescontent}}</div>
        <div class="comment-action">
          <div class="time">{{formatTime(comment.createtime)}}</div>
          <div class="delete">
              · 删除
          </div>
          <div class="actions">
            <div class="like-wrapper" title="点赞" @click="handleLike">
              <icon-svg :icon-class="like.icon"></icon-svg>
              <span class="count">{{comment.likeNumber}}</span>
            </div>
            <div class="reply-wrapper" @click.stop="handleReply">
              <icon-svg icon-class="comment"></icon-svg>
                <span class="count">回复</span>
            </div>
            
          </div>
        </div>
        <reply v-if="showReply" :placeholder="`回复${comment.repliespeople.name}...`" @click.native.stop="handleReply" @on-reply="onReply"></reply>
        <slot name="sub-commrnts-list"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { formatTime } from '@/utils'
import { mapState } from 'vuex'
import Reply from './Reply'
export default {
  name: 'CommentsItem',
  components: {
    Reply
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showReply: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId
    }),
    like() {
      let flag = this.comment.likePeopleIds.some((item) => {
        return item === this.userId
      })
      return flag ?  { icon: 'full-like', status: true} : { icon: 'like', status: false }
    }
  },
  methods: {
    formatTime,
    handleLike() {
      let eventName = this.like.status ? 'cancel-comment-like' : 'add-comment-like'
      // console.log(eventName, this.like.status)
      this.$emit(eventName, this.comment.repliesid, !this.like.status)
    },
    handleReply(e) {
      this.showReply = true
      
    },
    hideReply(e) {
      this.showReply = false
    },
    onReply(content){
      this.$emit('on-reply', this.comment.repliesid, this.comment.topicid, content, this.comment.repliespeople.user_id)
      this.hideReply()
    }
  },
  mounted() {
    document.addEventListener('click', this.hideReply, false)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideReply, false)
  }
}
</script>
<style lang="less" scoped>
.comment-item {
  margin-bottom: 15px;
  .comment-content {
    display: flex;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 16px;
    }
    .comment-area {
      flex: 1 0;
      border-bottom: 1px solid #f1f1f1;
      .comment-meta {
        display: flex;
        line-height: 20px;
        .user-college {
          color: #8a9aa9;
          margin-left: 10px;
          font-size: 13px;
        }
      }
      .content {
        color: #505050;
        font-size: 13px;
        margin-top: 8px;
        line-height: 20px;
        word-wrap: break-word;
        white-space: pre-wrap;
        word-break: break-all;
        .reply-name {
          color: #406599;
          // font-weight: bold
        }
      }
      .comment-action {
        display: flex;
        margin: 12px 0;
        font-size: 13px;
        .time, .delete {
          color: #8a9aa9;
        }
        .actions {
          flex: 0 0 auto;
          display: flex;
          justify-content: space-between;
          margin-left: auto;
          color: #8a9aa9;
          user-select: none;
          min-width: 100px;
          .like-wrapper, .reply-wrapper {
            cursor: pointer;
            transition: color .4s;
            &:hover {
              color: #2c3e50;
            }
          }
        }
      }

      .sub-comment {
        padding: 10px;
        background-color: #fafbfc;
        border-radius: 5px;
      }
    }
  }
}
</style>
