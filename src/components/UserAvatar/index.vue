<template>
  <el-dropdown class="avatar-container user-menu-item" trigger="click">
    <div class="avatar-wrapper">
      <el-image :src="avatar" class="user-avatar">
        <div slot="error" class="image-slot">
          <icon-svg icon-class="img-load-fail"></icon-svg>
        </div>
      </el-image>

      <icon-svg icon-class="arrow-down"></icon-svg>
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <router-link to="/profile">
        <el-dropdown-item>个人中心</el-dropdown-item>
      </router-link>
      <code-map v-slot:action-btn class="el-dropdown-menu__item">
        社团二维码
      </code-map>
      <change-pwd v-slot:action-btn class="el-dropdown-menu__item" @on-success="changePwdSuccess">
        修改密码
      </change-pwd>
      <el-dropdown-item>我的收藏</el-dropdown-item>
      <el-dropdown-item divided>
        <span style="display:block;" @click="logout">退出登陆</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { mapState } from 'vuex'
import changePwd from './modules/changePwd'
import codeMap from './modules/codeMap'
export default {
  name: 'UserAvatar',
  components: {
    changePwd,
    codeMap
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      avatar: state => state.user.avatar
    })
  },
  methods: {
    // 用户名下拉菜单选择事件
    logout(command) {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
      // this.$store.commit('SET_TAGS',[])
      // this.$router.push("/login")
    },
    changePwdSuccess() {
      this.logout()
    },

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
      overflow: hidden;
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
