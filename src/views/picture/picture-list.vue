<template>
<div class="app-container" >
    <h1 class="page-title">
      <span style="font-size:18px;">精彩相片</span>  
      <span style=" float:right;margin-top:-14px">
        <el-button type="primary" size="medium">全部相册</el-button>
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="F_Open_dialog()">上传相片</el-button>
      <input type="file" id="btn_file" style="display:none">

      </span>   
    </h1>
  
    <div class="components-container board">
      <ul style="display:flex;flex-wrap:wrap">
        <li
          v-for="(item,index,key) in pic_list"
          :key="key"
          class="aaal"
        >
        <div >{{item.id}}</div>
         </li>
         
        
      </ul>
    </div>
    
   <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>

  
</template>
<script>
export default {
  name: 'picture-list',
  data(){
    return{
        pic_list:[
          {id:'1',name:'23'},
           {id:'1',name:'23'},
            {id:'1',name:'23'},
          ],
    }
  
  },
  methods:{
    F_Open_dialog() { 
      document.getElementById("btn_file").click();
  } 

  },

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
.aaal {
  width: 200px;
  height: 240px;
  background: rgb(249, 236, 216);
  text-align: center;
  list-style: none;
  margin: 10px 15px;
  border-radius: 10px;
}
</style>