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
          <li v-for="(item, index, key) in pic_list" :key="key" class="list-item-con ">
            <i class="el-icon-error del-img" @click="delImg(item.id)"></i>
            <div class="list-item">
              <div class="list-item-img">
                <img :src="item.img" alt="">
              </div>
              <div class="list-img-text">
                <p>{{item.text}}</p>
                <p>JACK <span style="float:right">   
                  <i class="el-icon-star-on"></i> 1</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </viewer>
    <div class="block">
      <el-pagination
        :page-size="10"
        :pager-count="5"
        layout="prev, pager, next"
        :total="30">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css';
import Viewer from "v-viewer/src/component.vue";
import { getImgList, delPicture } from "@/api/photomodule";
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
  mounted: function() {
    // 加载图片列表
    getImgList(1, 10).then(res => {
      console.log(res);
    })

    // animated infinite bounce 
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
        // 删除图片
        delPicture(id, 'asadsad').then(res => {
          console.log(res)
        })
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
.list-item-con {
  float: left;
  height: 230px;
  display: table;
  position: relative;
  background: rgb(243, 245, 246);
  text-align: center;
  list-style: none;
  margin: 10px 15px;
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
  float: left;
  height: 190px;
  display: table;
  position: relative;
  flex-direction: column;
  cursor: pointer;
}
.list-item-img {
  width: 100%;
  height: 100px;
}
.list-item-img  img {
  width: auto;
  height: 170px;
}
.list-img-text {
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 20px;
  background: rgb(243, 245, 246);
  text-align: left;
}
.list-img-text p:nth-child(1) {
  color: #535351;
}
.list-img-text p {
  margin: 6px 0 4px 0;
  padding: 0 10px;
  color: #adaeb5;
}
@keyframes list-item-con {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.list-item-con:hover {
  -webkit-animation-name: pulse;
  animation-name: list-item-con;
}

</style>
