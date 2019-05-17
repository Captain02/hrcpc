<template>
  <div class="app-container">
    <h1 class="page-title">
      <span style="font-size:18px;">精彩相片</span>
      <span style=" float:right;margin-top:-14px">
        <el-button type="primary" size="medium">全部相册</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-circle-plus-outline"
          @click="F_Open_dialog()"
        >上传相片</el-button>
        <input type="file" id="btn_file" style="display:none">
      </span>
    </h1>
    <viewer :images="pic_list" @inited="inited" class="viewer" ref="viewer">
      <div class="components-container board">
        <ul style="display:flex;flex-wrap:wrap">
          <li v-for="(item, index, key) in pic_list" :key="key" class="aaal">
            <i class="el-icon-error del-img" @click="delImg(item.id)"></i>
            <div class="list-item">
              <div class="list-item-img">
                <img :src="item.img" alt="">
              </div>
              <div class="list-img-text">
                <span>{{item.text}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </viewer>
    <div class="block">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="300">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css';
import Viewer from "v-viewer/src/component.vue";
export default {
  name: "picture-list",
  components: {
    Viewer
  },
  data() {
    return {
      movable: false,
      pic_list: [
        { 
          id: "1",
          text: "最美风景",
          img: "http://img1.cache.netease.com/catchpic/1/19/19906B6772099C376B7AED148727964E.jpg"
        },
        { 
          id: "2",
          text: "最美图片",
          img: "http://img1.cache.netease.com/catchpic/1/19/19906B6772099C376B7AED148727964E.jpg"
        },
        { 
          id: "3",
          text: "年度最佳",
          img: "http://img1.cache.netease.com/catchpic/1/19/19906B6772099C376B7AED148727964E.jpg"
        },
      ]
    };
  },
  methods: {
    F_Open_dialog() {
      document.getElementById("btn_file").click();
    },
    inited (viewer) {
      this.$viewer = viewer;
    },
    // 删除图片
    delImg(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
};
</script>
<style>
.page-title {
  padding: 15px 0;
  font-size: 18px;
  color: #464c5b;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}
.aaal {
  width: 200px;
  height: auto;
  position: relative;
  background: rgb(249, 236, 216);
  text-align: center;
  list-style: none;
  margin: 10px 15px;
  border-radius: 10px;
}
.del-img {
  position: absolute;
  color: #fff;
  font-size: 24px;
  z-index: 100;
  right: 0;
  top: 0;
  cursor: pointer;
}
.list-item {
  width: 100%;
  height: 130px;
  display: flex;
  position: relative;
  flex-direction: column;
  cursor: pointer;
}
.list-item-img {
  width: 100%;
  height: 100px;
}
.list-item-img  img {
  width: 100%;
  height: 100%;
}
.list-img-text {
  width: 100%;
  height: 28px;
  line-height: 28px;
}
</style>
