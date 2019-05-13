<template>
  <div class="app-container">
    depart
  </div>
</template>
<script>
import { getDeparts as getDepartsApi } from '@/api/depart'
export default {
  name: 'depart',
  data() {
    return {
      departList: []
    }
  },
  methods: {
    getDepartList() {
      getDepartsApi().then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getDepartList()
  }
}
</script>