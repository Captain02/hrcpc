<template>
  <div>
    
  </div>
</template>
<script>
import { getNoticesInHome as getNoticesInHomeApi } from '@/api/notices'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    getNotices() {
      getNoticesInHomeApi()
    }
  }
}
</script>