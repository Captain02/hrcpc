<template>
  <el-card class="imgs-card">
    <div slot="header">
      <span>社团相册</span>
      <el-button type="text" size="small" style="float: right;padding: 0;" @click="() => this.$router.push({name: 'picture-list'})">更多</el-button>
    </div>
    <ul class="img-list clearfix">
      <div class="empty" v-if="!list.length">暂无内容</div>
      <li v-for="item in list" :key="item.id" class="img-item">
        <img :src="item.url" class="image">
        <div class="img-meta">
          <div class="img-name">{{item.imagename}}</div>
          <time class="time">{{parseTime(item.createtime, '{y}-{m}-{d}')}}</time>
        </div>
      </li>
    </ul>
  </el-card>
</template>
<script>
import { getImgList as getImgListApi } from '@/api/photomodule'
import { parseTime } from '@/utils'
export default {
  name: 'imgsCard',
  data() {
    return {
      list: []
    }
  },
  methods: {
    parseTime,
    getImgList() {
      getImgListApi().then((result) => {
        let { date } = result
        this.list = date
        // console.log(this.list)
      }).catch((err) => { })
    }
  },
  mounted() {
    this.getImgList()
  }
}
</script>
<style lang="less" scoped>
.img-list {
  margin-left: -15px;
  .empty {
    line-height: 22px;
    text-align: center;
    color: #909399;
    font-size: 13px;
  }
  .img-item {
    float: left;
    margin-left: 15px;
    margin-bottom: 15px;
    background: #f3f5f6;
    .image {
      width: 120px;
    }
    .img-meta {
      padding: 0 10px 10px;
      font-size: 13px;
      .img-name {
        line-height: 25px;
        width: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .time {
        display: block;
        color: #909399;
      }
    }
    
  }
}
</style>
