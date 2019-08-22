<template>
  <div class="app-container">
    <h1 class="page-title">
      <span>纳新二维码</span>
      <el-button type="primary" size="mini" style="float: right;" @click="handleAdd">添加</el-button>
    </h1>
    <div class="imgs-wrapper clearfix">
      <div class="img-item" v-for="item in imgList" :key="item.id">
        <div class="item-wrapper" @click="handleClick(item)">
          <el-image :src="item.path" >
            <div slot="error" class="image-slot">
              <icon-svg icon-class="img-load-fail"></icon-svg>
            </div>
          </el-image>
        </div>
        <div class="img-name" :title="item.filename">{{item.filename}}</div>
        <div class="delete-btn-wrapper" @click="handleDelete(item.id, item.path)">
          <icon-svg icon-class="close"></icon-svg>
        </div>
      </div>
    </div>
    <pagination v-show="total>0" :total="total" :curr.sync="currPage" :size.sync="pageSize" @on-page-change="getImgList" />
    <el-dialog
      title="二维码"
      :visible.sync="imgDialogVisible"
      width="400px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <s-qrcode :url="currentShowImg.path" />
      <div class="img-name" :title="currentShowImg.filename">{{currentShowImg.filename}}</div>
    </el-dialog>
    <el-dialog
      title="添加二维码"
      :visible.sync="dialogVisible"
      width="430px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <s-upload :action="`${$constants.BASE_API}/corporation/save`" :data="{corId: corid}" name="qqCodeFile" :file-list="imgFile" @success="uploadSuccess" @remove="handleRemove" />
    </el-dialog>
  </div>
</template>
<script>
import { getQRCodeList as getQRCodeListApi, deleteQRCode as deleteQRCodeApi } from '@/api/corporation'
import { mapState } from 'vuex'
import SUpload from '_c/SUpload'
import SQrcode from '_c/SQRCode'
import Pagination from '_c/Pagination'
export default {
  name: 'corporation-qrcode',
  components: {
    SUpload,
    SQrcode,
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      pageSize: 10,
      currPage: 1,
      total: 0,
      imgDialogVisible: false,
      currentShowImg: '',       // 当前模态框中显示的图片
      imgFile: [],
      imgList: [],
      // imgViews: []
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
        let { data, page } = result
        /*data[{
            corid: 1,
            createtime: "2019-08-07 14:45:09",
            filename: "省电壁纸 - 4.jpg",
            id: 1,
            path: "/file/qqCodeFile/20190807224509省电壁纸 - 4.jpg"
          }]*/
        this.imgList = data
        this.total = page.totalCount
        // this.imgViews = this.initImgViews(data)
      }).catch((err) => { })
    },
    initImgViews(list) {
      return list.map((item) => {
        return item.path
      })
    },
    handleClick(img) {
      this.currentShowImg = img
      this.imgDialogVisible = true
    },
    handleDelete(id, path) {
      console.log(id, path)
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQRCodeApi(id, path).then((result) => {
          this.$message.success('删除成功')
          this.getImgList()
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {})
    },
    handleAdd() {
      this.imgFile = []
      this.dialogVisible = true
    },
    uploadSuccess(response) {
      console.log(response)
      this.imgFile = [{
        name: response.data.filename,
        url: response.data.path
      }]
      this.getImgList()
    },
    handleRemove(file, fileList) {
      this.imgFile = []
      console.log(file, fileList)
    }
  },
  mounted() {
    this.getImgList()
  }
}
</script>
<style lang="less" scoped>
.img-name {
  padding: 10px 10px 5px;
  font-size: 13px;
  color: #999;
  line-height: 20px;
}
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
