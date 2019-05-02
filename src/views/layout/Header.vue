<template>
  <div class="header-container clearfix">
    <!-- 折叠框 -->
    <hamburger :toggle-click="toggleClick" :is-active="isCollapse"/>
    <!-- 面包屑 -->
    <breadcrumb/>
    <div class="user-menu">
      <!-- 全屏显示 -->
      <full-screen class="user-menu-item btn-fullscreen" />
      <!-- 消息中心 -->
      <user-notice class="user-menu-item btn-bell"/>
      <!-- 用户头像 -->
      <user-avatar class="user-menu-item avatar-container"></user-avatar>
    </div>
  </div>
</template>
<script>
import Hamburger from "_c/Hamburger"
import Breadcrumb from '_c/Breadcrumb'
import FullScreen from '_c/FullScreen'
import UserNotice from '_c/UserNotice'
import UserAvatar from '_c/UserAvatar'
import { info as infoApi } from '@/api/user'
export default {
  name:'AppHeader',
  components: {
    Hamburger,
    Breadcrumb,
    FullScreen,
    UserNotice,
    UserAvatar
  },
  data() {
    return {
      // fullscreen: false,
      // name: "linxin",
      // message: 2,
      // username: "zyh"
    };
  },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.app.isCollapse;
      },
      set: function(newValue) {
        this.$store.commit("TOGGLE_COLLAPSE", newValue);
      }
    }
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    infoApi().then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>
.header-container {
  height: 55px;
  line-height: 55px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #f0f0f0;
}
.user-menu {
  padding-right: 35px;
  float: right;
  height: 100%;
  line-height: 55px;
  .user-menu-item {
    display: inline-block;
    padding: 0 12px;
    height: 100%;
    color: #333;
    cursor: pointer;
    vertical-align: text-bottom;
    font-size: 16px;
    transition: background .3s;
    &:hover{
      background: rgba(0,0,0,.025);
      // background: #424f63;
      // color: #65cea7;
    }
  }
}
.btn-bell{
  position: relative;
}
</style>
<style lang="less">
.message-dropdown.el-popper[x-placement^=bottom] .popper__arrow{
  top: -10px;
  color: #65cea7;
  &::after {
    border-bottom-color: #65cea7;
  }
}
</style>


