<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
      >
        <template v-for="item in routes" v-if="!item.hidden && item.children">
        <menu-item v-if="hasOneShowChildren(item.children) && !item.alwaysShow" :key="item.path" :base-path="item.path" :item-info="item"></menu-item>
        
        <sub-menu v-else :base-path="item.path" :menu-info="item" :key="item.path"></sub-menu>
      </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { routes } from '@/router'
import { mapState } from "vuex"
import SubMenu from './SubMenu'
import MenuItem from './MenuItem' 
export default {
  data() {
    return {
      routes
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.isCollapse
    })
  },
  methods: {
    hasOneShowChildren(children) {
      return children.length === 1 && !children.find((item) => {
        return item.children
      })
    }
  },
  components: {
    SubMenu,
    MenuItem
  }
}
</script>
<style lang="less" scoped>
.sidebar {
  -webkit-transition: width 0.28s linear;
  transition: width 0.28s linear;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    text-align: left;
  }
  .el-menu--collapse {
    height: 100%;
  }
}
</style>
<style>
  .sidebar .icon-svg {
    margin-right: 10px;
  }
</style>
