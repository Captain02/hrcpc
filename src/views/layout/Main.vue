<template>
  <div class="app-main">
    <!-- <h2>{{cacheList}}</h2> -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cacheList">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapState({
      tagsList: state => state.app.tagsList
    }),
    cacheList() {
      return this.tagsList.map((item) => item.useCache && item.name)
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 90px);
  position: relative;
  overflow: hidden;
}
</style>