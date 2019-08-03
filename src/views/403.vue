<template>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo">Oops!</h1>
        <h2 class="text-title">你没有权限去该页面</h2>
        <h3 class="text-label">如有不满请联系你领导</h3>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/img/403_images/403.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      dialogVisible: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 100px;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .text-jumbo {
      margin: 25px 0;
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .text-title {
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
    .text-label {
      margin: 30px 0;
      font-size: 13px;
      font-weight: bold;
    }
    .list-unstyled {
      padding-left: 25px;
      font-size: 14px;
      li {
        padding-bottom: 10px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
