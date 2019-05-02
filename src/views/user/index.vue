<template>
  <div class="app-container">
    <h1 class="page-title">
      社团人员
    </h1>
    <m-table ></m-table>
  </div>
</template>
<script>
import MTable from '_c/MTable'
export default {
  name: 'user',
  components: {
    MTable
  },
  data () {
    return {
      columns: [
        {
          attrs: {
            
          }
        }
      ]
    }
  },
}
</script>
<style>
.page-title {
  padding: 15px 0;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
</style>
