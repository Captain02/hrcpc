<template>
  <div>
    <template v-for="item in subComment">
      <comments-item :key="item.repliesid" :comment="item"></comments-item>
      <sub-comments v-if="item.child.length" :key="`sub_${item.repliesid}`" :subComment="item.child" ></sub-comments>
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
}
</script>