<template>
  <div>
    <template v-for="item in subComment">
      <comments-item :key="item.repliesid" :comment="item" @cancel-comment-like="handleCancelLike" @add-comment-like="handleAddLike"></comments-item>
      <sub-comments v-if="item.child.length" :key="`sub_${item.repliesid}`" :subComment="item.child" @cancel-comment-like="handleCancelLike" @add-comment-like="handleAddLike" ></sub-comments>
    </template>
  </div>
</template>
<script>
import CommentsItem from './CommentsItem'
export default {
  name: 'SubComments',
  components: {
    CommentsItem
  },
  props: {
    subComment: {
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
      // console.log('Sub', commentid, status)
      this.$emit('cancel-comment-like', commentid, status)
    },
    handleAddLike(commentid, status) {
      // console.log('Sub', commentid, status)
      this.$emit('add-comment-like', commentid, status)
    }
  }
}
</script>