<template>
  <div class="app-container">
    <h1 class="page-title">
      <span>纳新二维码</span>
      <el-button type="primary" size="mini" style="float: right;" @click="handleAdd">添加</el-button>
    </h1>
    <div class="imgs-wrapper clearfix">
      <div class="img-item" v-for="item in imgList" :key="item.id">
        <div class="item-wrapper">
          <el-image :src="item.url" :preview-src-list="imgViews">
            <div slot="error" class="image-slot">
              <icon-svg icon-class="img-load-fail"></icon-svg>
            </div>
          </el-image>
        </div>
        <div class="img-name">{{item.imgname}}</div>
        <div class="delete-btn-wrapper" @click="handleDelete(item.id)">
          <icon-svg icon-class="close"></icon-svg>
        </div>
      </div>
    </div>
    <pagination v-show="total>0" :total="total" :curr.sync="currPage" :size.sync="pageSize" @on-page-change="getImgList" />
    <el-dialog
      title="添加二维码"
      :visible.sync="dialogVisible"
      width="430px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <!-- <el-button size="mini" type="primary" style="margin-bottom: 15px;">开始上传</el-button>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        class="upload"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload> -->
      <s-upload :action="`${$constants.BASE_API}/corporation/save`" :data="{corId: corid}" name="qqCodeFile" :file-list="[]" @success="uploadSuccess" @remove="handleRemove" />
    </el-dialog>
  </div>
</template>
<script>
import { getQRCodeList as getQRCodeListApi } from '@/api/corporation'
import { mapState } from 'vuex'
import SUpload from '_c/SUpload'
import Pagination from '_c/Pagination'
export default {
  name: 'corporation-qrcode',
  components: {
    SUpload,
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      pageSize: 10,
      currPage: 1,
      total: 10,
      imgList: [
        { url: 'https://user-gold-cdn.xitu.io/2019/723/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 1 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 2 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 3 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 4 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 5 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 6 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 7 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 8 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 9 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 10 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 11 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 12 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 13 },
        { url: 'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', imgname: 'qq纳新群1', id: 14 }
      ],
      imgViews: [
        'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1',
        'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1',
        'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1',
        'https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1','https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1','https://user-gold-cdn.xitu.io/2019/7/23/16c1f11a5c47a950?imageView2/0/w/1280/h/960/format/webp/ignore-error/1'
      ]
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    getImgList() {
      getQRCodeListApi(this.currPage, this.pageSize).then((result) => {
        console.log(result)
      }).catch((err) => { })
    },
    handleDelete(id) {
      console.log(id)
    },
    handleAdd() {
      this.dialogVisible = true
    },
    uploadSuccess(response) {
      console.log(response)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    }
  },
  mounted() {
    this.getImgList()
  }
}
</script>
<style lang="less" scoped>
.imgs-wrapper {
  margin-top: 25px;
  margin-left: -15px;
  .img-item {
    position: relative;
    float: left;
    width: 140px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    color: #303133;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    cursor: pointer;
    padding: 10px;
    margin-left: 15px;
    margin-bottom: 15px;
    .item-wrapper {
      height: 140px;
    }
    .img-name {
      padding: 10px 10px 5px;
      font-size: 13px;
      color: #999;
      line-height: 20px;
    }
    .delete-btn-wrapper {
      position: absolute;
      top: 3px;
      right: 5px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      background: rgba(0,0,0,.5);
      transition: all .3s;
      &:hover {
        background: #000;
      }
      
    }
  }
}
.upload {
  
  /deep/.el-upload--picture-card,/deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 140px;
    height: 140px;
  }
}
</style>
