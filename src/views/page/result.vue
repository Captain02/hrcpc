<template>
  <div>
    
  </div>
</template>
<script>
export default {
  name: 'result',
  data() {
    return {
      code: this.$route.query.code
    }
  },
  methods: {
    onSuccess() {
      this.$confirm('参与成功', '提示', {
        type: 'success',
        center: true,
        customClass: 'result-box',
        showCancelButton: false,
        showConfirmButton: false
      }).catch((err) => {})
    }
  },
  mounted() {
    if(+this.code === 0){
      this.onSuccess()
    }
    
  }
}
</script>
<style lang="less">
.result-box {
  width: 60%;
}
</style>
