<template>
  <div class="app-container">
    <h1 class="page-title">
      <span style="font-size:18px;">精彩相片</span>
      <span style=" float:right;margin-top:-14px">
        <el-button type="primary" size="medium">全部相册</el-button>
        <router-link to="/picture/add">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-circle-plus-outline"
          >
          上传相片
          </el-button>
        </router-link>

        <input type="file" id="btn_file" style="display:none">
      </span>
    </h1>
    <viewer :images="pic_list" @inited="inited" class="viewer" ref="viewer">
      <div class="components-container board">
        <ul style="display:flex;flex-wrap:wrap">
          <li v-for="(item, index, key) in pic_list" :key="key" class="list-item-con ">
            <i class="el-icon-error del-img" @click="delImg(item.id, item.url)"></i>
            <div class="list-item">
              <div class="list-item-img">
                <img :src="item.url" alt="">
              </div>
              <div class="list-img-text">
                <p>{{item.imagename}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </viewer>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.currPage"
        :page-sizes="listQuery.cxPageSize"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css';
import Viewer from "v-viewer/src/component.vue";
import { getImgList, delPicture } from "@/api/photomodule";
const BaseUrl = "http://140.143.201.244:82";
export default {
  name: "picture-list",
  components: {
    Viewer
  },
  data() {
    return {
      movable: false,
      pic_list: [],
      listQuery: {
        currPage: 1,
        pageSize: 10,
        totalCount: 100,
        cxPageSize: [10]
      },
    };
  },
  mounted: function() {
    const that = this;
    // 加载图片列表
    that.loadImages(1, 10);
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer;
    },
    getImgLists(page){
      this.loadImages();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.loadImages();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.listQuery.currPage = val;
      this.loadImages();
    },
    // 数组去重
    delCFImg(arr) {
      var hash=[];
      for (var i = 0; i < arr.length; i++) {
        if(hash.indexOf(arr[i])==-1){
          hash.push(arr[i]);
        }
      }
      return hash;
    },
    //加载图片
    loadImages() {
      const that = this;
      // 加载图片列表
      getImgList(this.listQuery.currPage, this.listQuery.pageSize).then(res => {
        if (res.date) {
          // 总记录数
          that.listQuery.totalCount = res.page.totalCount;
          // 每页数量 cxPageSize
          for (let i = 1; i <= res.page.totalCount; i++) {
            if (i %  10 === 0) {
              that.listQuery.cxPageSize.push(i);
            }
          }
          // 去重
          that.listQuery.cxPageSize = that.delCFImg(that.listQuery.cxPageSize);
          for (let i in res.date) {
            // 处理图片地址(线上不需要处理)
            // res.date[i].url = BaseUrl + res.date[i].url;
            // 处理文件名称
            // console.log(res.date[i].imagename.length)
            res.date[i].imagename = res.date[i].imagename.substring(0, res.date[i].imagename.indexOf("."));
            if (res.date[i].imagename.length > 20) {
              res.date[i].imagename = res.date[i].imagename.substring(0, 20) + '...';
            }
          }
          that.pic_list = res.date;
        }
      })
    },
    // 删除图片
    delImg(id, url) {
      // 线上不需要处理
      // let urlImg = url.substring(25);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除图片
        delPicture(id, urlImg).then(res => {
          let arr = this.pic_list;
          for (let i in arr) {
            if (id == arr[i].id) {
              this.pic_list.splice(i,1);
            }
          }
          this.$message({
            type: 'success',
            message: res.msg
          });
        })

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
<style >
.page-title {
  padding: 15px 0;
  font-size: 18px;
  color: #464c5b;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}
.list-item-con {
  float: left;
  height: 200px;
  display: table;
  position: relative;
  background: rgb(243, 245, 246);
  text-align: center;
  list-style: none;
  margin: 10px 6px;
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
  text-align: center;
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
.block {
  margin-top: 40px;
}
</style>
