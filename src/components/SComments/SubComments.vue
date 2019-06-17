<template>
  <div>
    <div class="comment-item" v-if="!comment.child">
      
    </div>
    <sub-commtnes v-else></sub-commtnes>
  </div>
</template>
<script>
export default {
  name: 'SubComments',
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      
    }
  },
}
</script>