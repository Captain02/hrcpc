<template>
  <div>
    <div @click="handleDetails">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="个人信息"
      :visible.sync="dialogFormVisible"
      width="800px"
      :append-to-body="true"
    >
      <template v-if="resume">
        <el-row class="details-row">
          <el-col :span="3"><span>头像：</span></el-col>
          <el-col :span="21">
            <div class="avatar-area">
              <img :src="resume.filepath ? resume.filepath : ''">
            </div>
          </el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>姓名：</span> </el-col>
          <el-col :span="9">{{resume.name ? resume.name : ''}}</el-col>
          <el-col :span="3"><span>性别：</span> </el-col>
          <el-col :span="9">{{resume.gender ? resume.gender : ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>用户名：</span> </el-col>
          <el-col :span="9">{{resume.username ? resume.username : ''}}</el-col>
          <el-col :span="3"><span>学号：</span> </el-col>
          <el-col :span="9">{{resume.persionnum ? resume.persionnum : ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>院系：</span> </el-col>
          <el-col :span="9">{{resume.college ? resume.college : ''}}</el-col>
          <el-col :span="3"><span>专业：</span> </el-col>
          <el-col :span="9">{{resume.collegetie ? resume.collegetie : ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>邮箱：</span> </el-col>
          <el-col :span="9">{{resume.email ? resume.email : ''}}</el-col>
          <el-col :span="3"><span>手机号：</span> </el-col>
          <el-col :span="9">{{resume.mobile ? resume.mobile : ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>QQ：</span> </el-col>
          <el-col :span="9">{{resume.QQ ? resume.QQ : ''}}</el-col>
          <el-col :span="3"><span>微信：</span> </el-col>
          <el-col :span="9">{{resume.wechart ? resume.wechart : ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>自我描述：</span></el-col>
          <el-col :span="21" v-html="resume.descs ? resume.descs : ''"></el-col>
        </el-row>
        <h1 class="details-title">审核信息</h1>
        <el-row class="details-row">
          <el-col :span="3"><span>状态：</span> </el-col>
          <el-col :span="21">
            <template v-for="item in options">
              <el-tag v-if="item.value == resume.status" size="small" :key="item.id" :type="item.tagType">{{item.text}}</el-tag>
            </template>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getResume as getResumeApi } from '@/api/recruited/resume'
import { options } from './data'
export default {
  name: 'details-resume',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      resume: null,
      options
    }
  },
  methods: {
    handleDetails() {
      // if(this.resume === null) {
        let id = this.data.user_id
        getResumeApi(id).then((result) => {
          this.dialogFormVisible = true
          console.log('根据id获取简历信息', result)
          this.resume = result.data[0]
        }).catch((err) => { })
      // }else{
      //   this.dialogFormVisible = true
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.details-title {
  font-weight: bold;
  padding: 15px 0 15px 15px;
}
.details-row {
  padding: 15px;
  font-size: 13px;
  span {
    font-size: 14px;
    color: #909399;
  }
}
</style>
