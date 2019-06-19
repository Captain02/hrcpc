<template>
  <div class="comment-list">
    <div class="empty" v-if="!list.length">无评论</div>
    <template v-else >
      <template v-for="item in list">
        <comments-item :key="item.repliesid" :comment="item" @cancel-comment-like="handleCancelLike" @add-comment-like="handleAddLike">
          <sub-comments slot="sub-commrnts-list" v-if="item.child.length" :sub-comment="item.child" :key="item.repliesid" class="sub-comment-lsit" @cancel-comment-like="handleCancelLike" @add-comment-like="handleAddLike"></sub-comments>
        </comments-item>
      </template>
    </template>
  </div>
</template>
<script>
import CommentsItem from './CommentsItem'
import SubComments from './SubComments'
export default {
  name: 'SComments',
  components: {
    CommentsItem,
    SubComments
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleCancelLike(commentid, status) {
      console.log('SComm', commentid, status)
      this.$emit('cancel-comment-like', commentid, status)
    },
    handleAddLike(commentid, status) {
      console.log('SComm', commentid, status)
      this.$emit('add-comment-like', commentid, status)
    }
  }
}
</script>
<style lang="less" scoped>
.comment-list {
  .empty{ 
    line-height: 22px;
    color: #8a9aa9;
    text-align: center;
  }
  // .comment-item {
  //   margin-bottom: 15px;
  //   .comment-content {
  //     display: flex;
  //     .user-avatar {
  //       width: 40px;
  //       height: 40px;
  //       border-radius: 10px;
  //       overflow: hidden;
  //       margin-right: 15px;
  //     }
  //     .comment-area {
  //       flex: 1 0;
  //       .comment-meta {
  //         display: flex;
  //         line-height: 20px;
  //         .user-college {
  //           color: #8a9aa9;
  //           margin-left: 10px;
  //         }
  //       }
  //       .content {
  //         color: #505050;
  //         font-size: 13px;
  //         margin-top: 8px;
  //         line-height: 20px;
  //         word-wrap: break-word;
  //         white-space: pre-wrap;
  //         word-break: break-all;
  //       }
  //       .comment-action {
  //         display: flex;
  //         margin: 12px 0;
  //         font-size: 13px;
  //         .time, .delete {
  //           color: #8a9aa9;
  //         }
  //         .actions {
  //           flex: 0 0 auto;
  //           display: flex;
  //           justify-content: space-between;
  //           margin-left: auto;
  //           color: #8a9aa9;
  //           user-select: none;
  //           min-width: 100px;
  //           .like-wrapper, .reply-wrapper {
  //             cursor: pointer;
  //             transition: color .4s;
  //             &:hover {
  //               color: #2c3e50;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  .sub-comment-lsit {
    padding: 10px;
    background-color: #fafbfc;
    border-radius: 5px;
  }
}
</style>
