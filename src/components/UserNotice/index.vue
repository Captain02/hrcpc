<template>
  <el-dropdown trigger="click">
    <span>
        <icon-svg icon-class="bell"></icon-svg>
        <span class="btn-bell-badge" v-if="message"></span>
    </span>

    <el-dropdown-menu slot="dropdown" class="message-dropdown">
      <div class="message-count">你有 {{message}} 最新信息</div> 
      <div class="message-now"> 目前还没有最新消息</div>
      <div class="message-more">
        <el-link :underline="false">查看更多</el-link>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'UserNotice',
  data() {
    return {
       message: 2,
    }
  },
}
</script>
<style lang="less" scoped>
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
}
.message-dropdown {
  width:300px;
  background:#fff;
  height:auto;
  .message-count {
    color:#fff;
    background:#65cea7;
    height:40px;
    line-height:40px;
    font-size:0.8rem;
    margin-top:-13px;
    margin-left:-1px;
    padding-left:10px;
  }
  .message-now {
    width:100%;
    height:50px;
    text-align: center;
    line-height:50px;
    font-size:0.9rem;
    border-bottom:1px solid #ccc;
    color:#ccc;
  }
  .message-more {
    height:30px;
    line-height:40px;
    font-size:0.9rem;
    padding-left:10px;
  }
}
</style>
