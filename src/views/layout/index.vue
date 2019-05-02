<template>
  <div class="wrapper">
    <Sidebar class="sidebar-container"/>
    <div class="main-wrapper" :class="isCollapse==true?'container_collapse':''">
      <app-header/>
      <tags/>
      <app-main/>
    </div>
  </div>
</template>
<script>
import Sidebar from "./Sidebar"
import AppHeader from "./Header.vue"
import AppMain from "./Main.vue"
import Tags from './Tags'
import { mapState } from "vuex"
export default {
  name: "Layout",
  components: {
    Sidebar,
    AppHeader,
    AppMain,
    Tags
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.isCollapse
    })
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .main-wrapper {
    min-height: 100%;
    -webkit-transition: margin-left 0.28s linear;
    transition: margin-left 0.28s linear;
    margin-left: 200px;
    position: relative;
  }
  .container_collapse {
    margin-left: 64px;
  }
}
</style>


