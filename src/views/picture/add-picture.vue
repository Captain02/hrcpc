<template>
  <div class="app-container add-picture-page">
    <h1 class="page-title">
      <span style="font-size:18px;" >上传相片</span>  
    </h1>
    <input type="file" @change="fileChange" id="upload_file" accept="image/png,image/gif,image/jpeg" multiple style="display: none" />
    <el-row class="uploadBtn">
      <div class="hello">
        <div class="upload">
          <div class="upload_warp">
            <div class="upload_warp_left" @click="fileClick">
              <img  style="width: 100px;" src="@/assets/img/upload.png">
            </div>
            <!-- <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
              或者将文件拖到此处
            </div> -->
          </div>
          <div class="upload_warp_text">
            选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
          </div>
          <!-- <input @change="fileChange($event)" type="file" ref="files" id="upload_file" accept="image/png,image/gif,image/jpeg" multiple style="display: none"/> -->
          <div class="upload_warp_img" v-show="imgList.length!=0">
            <div class="upload_warp_img_div" v-for="(item,index) of imgList" :key="index">
              <div class="upload_warp_img_div_top">
                <div class="upload_warp_img_div_text">
                  {{item.file.name}}
                </div>
                <img src="@/assets/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
              </div>
              <img :src="item.file.src">
            </div>
          </div>

        </div>

      </div>
    </el-row>
    <div class="upimgBtn">
      <el-button  type="success" :disabled="!flag" plain @click="compile">开始上传</el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { getCorId } from '@/utils/cookie'
const baseURL = process.env.BASE_API;
let formData;
export default {
  name: 'add-picture',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
      size: 0,
      filesArr: "",
      flag: false
    }
  },
  mounted: function() {
    formData = new FormData();
  },
  methods: {
    fileClick() {
      document.getElementById('upload_file').click()
    },
    fileChange(el) {
      this.filesArr = el.target.files;
      console.log(this.filesArr.length);
      if (this.filesArr.length > 0) {
        this.flag = true;
        for( let i = 0; i < this.filesArr.length; i++ ){
          formData.append('picture',this.filesArr[i]);
        }
        this.fileList(el.target);
      }
    },
    fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
                this.fileAdd(files[i]);
            } else {
                //文件夹处理
                this.folders(fileList.items[i]);
            }
        }
    },
    //文件夹处理
    folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
            files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
            for (let i = 0; i < file.length; i++) {
                if (file[i].isFile) {
                    _this.foldersAdd(file[i]);
                } else {
                    _this.folders(file[i]);
                }
            }
        })
    },
    foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
            _this.fileAdd(file)
        })
    },
    fileAdd(file) {
        //总大小
        this.size = this.size + file.size;
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;
          this.vue.imgList.push({
              file
          });
      }
    },
    fileDel(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    //在确定上传调用函数发送ajax请求
    compile() {
      let _this = this;
      let url= baseURL + '/img/batch';
      formData.append("corId", getCorId());
      console.log(formData.get('picture'));
      let config = {
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      axios.post(url,formData,config
      ).then(function(rest) {
        if (rest.data.code === 0) {
        _this.$alert('', '您已上传成功', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.push({
              path: '/picture/list'
            })
          }
         })
        } else {
          _this.$message({
            type: 'info',
            message: '上传失败!'
          });
        }
      }).catch(function(er){
        console.log(er);
      })
    }
  }
}
</script>
<style lang="" >
.add-picture-page {
  max-height: 1120px;
}
.uploadBtn {
  margin-top: 20px;
  margin-left: 20px;
}
.page-title {
  padding: 15px 0;
  font-size: 18px;
  color: #464c5b;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}
.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.upimgBtn {
  position: relative;
  width:100%;
  height:120px;
  background:#fff;
  margin-left: 20px;
  margin-top: 20px;
}
.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 100px;
  width: 120px;
  border: 1px solid #ccc;
  margin: 0px 30px 10px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  border-top: 1px solid #D2D2D2;
  padding: 14px 0 0 14px;
  overflow: hidden
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 10px;
  text-indent: 14px;
  border-top: 1px solid #ebebeb;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}


.upload_warp_left {
  float: left;
  width: 32%;
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
}
.upload_warp_left:hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)
}
.upload_warp {
  margin: 14px;
  height: 228px;
}

.upload {
  background-color: #fff;
  width: 90%;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
  border: 1px solid #ebebeb;
}

.hello {
  width: 100%;
  text-align: center;
  margin-top: 2%;
}
</style> 