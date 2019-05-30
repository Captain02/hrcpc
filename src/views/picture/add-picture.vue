<template>
  <div class="app-container">
    <h1 class="page-title">
      <span style="font-size:18px;">上传相片</span>  
    </h1>
    <div class="upImgs">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="picView"
        :on-remove="delImg">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'add-picture',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    delImg(file, fileList) {
      console.log(file, fileList);
    },
    picView(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style>
.page-title {
  padding: 15px 0;
  font-size: 18px;
  color: #464c5b;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}
.upImgs {
  width: 100%;
  position: relative;
  height: auto;
  margin-top: 20px;
}

</style> 