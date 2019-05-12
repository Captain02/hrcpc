<template>
  <div class="app-container">
    {{$route.params.id}}
  </div>
</template>
<script>
import { getUser as getUserApi } from '@/api/user'
export default {
  name: 'details-user',
  data() {
    return {
      
    }
  },
}
</script>