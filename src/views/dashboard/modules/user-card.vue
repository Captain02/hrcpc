<template>
  <el-card class="user-card" :body-style="{padding: '0'}">
    <div class="user-avatar">
      <div class="avatar">
        <el-image :src="avatar" alt="头像" >
          <div slot="error" class="image-slot">
            <icon-svg icon-class="img-load-fail"></icon-svg>
          </div>
        </el-image>
      </div>
    </div>
    <el-row class="user-info">
      <el-col :span="8" class="label">姓名：</el-col>
      <el-col :span="16">{{name}}</el-col>
      <el-col :span="8" class="label">性别：</el-col>
      <el-col :span="16">{{gender}}</el-col>
      <el-col :span="8" class="label">学号：</el-col>
      <el-col :span="16">{{userName}}</el-col>
      <el-col :span="8" class="label">部门：</el-col>
      <el-col :span="16">{{depart}}</el-col>
      <el-col :span="8" class="label">手机号：</el-col>
      <el-col :span="16">{{mobile}}</el-col>
    </el-row>
  </el-card>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'user-card',
  data() {
    return {
      // avatar: 'http://140.143.201.244:82/file/persionDefaultHeadPicture/20190517155219man.png'
    }
  },
  computed: {
    ...mapState({
      avatar: (state) => state.user.avatar,
      name: (state) => state.user.name,
      gender: (state) => state.user.gender,
      userName: (state) => state.user.userName,
      depart: (state) => state.user.depart,
      mobile: (state) => state.user.mobile,
    })
  }
}
</script>
<style lang="less" scoped>
.user-card {
  .user-avatar {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    .avatar {
      width: 120px;
      margin: 0 auto;
    }
  }
  .user-info {
    margin: 20px 0;
    .el-col {
      padding: 8px 0;
      line-height: 20px;
      color: #909399;
      font-size: 13px;
    }
    .label {
      padding-left: 20px;
      color: #333;
    }
  }
}

</style>
