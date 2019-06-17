<template>
  <div class="comment-list">
    <template v-for="item in list">
      <div v-if="!item.child" :key="item.repliesid" class="comment-item">
        <div class="comment-content">
          <div class="user-avatar">
            <el-image :src="item.repliespeople.filepath" alt="头像" >
              <div slot="error" class="image-slot">
                <icon-svg icon-class="img-load-fail"></icon-svg>
              </div>
            </el-image>
          </div>
          <div class="comment-area">
            <div class="comment-meta">
              <div class="user-name">赵国真</div>
              <div class="user-college">信息管理学院</div>
            </div>
            <div class="content">这个折叠可以的    都是基础   错了几道都是审题不清导致的，  然后就是自身16题相关知识有盲点     很好的基础题都是基础   错了几道都是审题不清导致的，  然后就是自身16题相关</div>
            <div class="comment-action">
              <div class="time">2小时前</div>
              <div class="delete">
                  · 删除
              </div>
              <div class="actions">
                <div class="like-wrapper" title="点赞">
                  <icon-svg icon-class="like"></icon-svg>
                  <span class="count">2</span>
                </div>
                <div class="reply-wrapper">
                  <icon-svg icon-class="comment"></icon-svg>
                   <span class="count">回复</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <sub-comments v-else :key="item.repliesid" :comment="item" class="comment-sub"></sub-comments> -->
    </template>
  </div>
</template>
<script>
import SubComments from './SubComments'
export default {
  name: 'SComments',
  components: {
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
}
</script>
<style lang="less" scoped>
.comment-list {
  .comment-item {
    margin-bottom: 16px;
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
        .comment-meta {
          display: flex;
          line-height: 20px;
          .user-college {
            color: #8a9aa9;
            margin-left: 10px;
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
      }
    }
  }
}
</style>
