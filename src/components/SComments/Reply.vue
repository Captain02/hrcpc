<template>
  <div class="reply-wrapper">
    <div class="input-box">
      <el-input size="medium" v-model="content" :placeholder="placeholder"></el-input>
    </div>
    <div class="action-box">
      <el-button size="medium" type="primary" :disabled="!content.length" class="reply-btn" @click="handleReply">评论</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Reply',
  props: {
    placeholder: {
      type: String,
      default: '输入评论...'
    }
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    handleReply() {
      this.$emit('on-reply', this.content)
      this.content = ''
    }
  }
}
</script>
<style lang="less" scoped>
.reply-wrapper {
  background-color: #fafbfc;
  padding: 12px 15px;
  margin: 15px 0;
  .action-box {
    margin-top: 10px;
    .reply-btn {
      display: block;
      margin-left: auto;
    }
  }
}
</style>
