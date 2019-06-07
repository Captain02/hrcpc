<template>
  <div class="list-wrapper">
    <list-item></list-item>
  </div>
</template>
<script>
import ListItem from './ListItem'
export default {
  name: 'SList',
  components: {
    ListItem
  },
  data() {
    return {
      isActive: false
    }
  }
}
</script>