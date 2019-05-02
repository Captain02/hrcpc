<template>
  <el-dropdown class="avatar-container user-menu-item" trigger="click">
    <div class="avatar-wrapper">
      <img
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        class="user-avatar"
      >
      <icon-svg icon-class="arrow-down"></icon-svg>
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <router-link to="/profile">
        <el-dropdown-item>个人中心</el-dropdown-item>
      </router-link>
      <el-dropdown-item>密码设置</el-dropdown-item>
      <el-dropdown-item>我的收藏</el-dropdown-item>
      <el-dropdown-item divided>
        <span style="display:block;" @click="logout">退出登陆</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'UserAvatar',
  data() {
    return {
      
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    logout(command) {
      this.$store.commit('SET_TAGS',[])
      this.$router.push("/login")
    }
  }
}
</script>
<style scoped lang="less">
.avatar-container {
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    line-height: initial;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.user-dropdown {
  width: 180px;
}
</style>
