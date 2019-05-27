<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="个人信息"
      :visible.sync="dialogFormVisible"
      width="800px"
      :append-to-body="true"
      :close-on-click-modal="false"
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
          <el-col :span="3"><span>状态：</span></el-col>
          <el-col :span="21">
            <el-radio-group v-model="resume.status">
              <template v-for="item in options">
                <el-radio v-if="item.value && item.tagType" :label="item.value" :key="item.id">{{item.text}}</el-radio>
              </template>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :offset="3" :span="3">
            <el-button type="primary" size="small" @click="editResume">保存</el-button>
          </el-col>
        </el-row>
        <!-- <el-form :model="resume" ref="resumeForm" style="padding-left: 15px;">
          <el-form-item label="状态：">
            <el-radio-group v-model="resume.status">
              <template v-for="item in options">
                <el-radio v-if="item.value" :label="item.value" :key="item.id">{{item.text}}</el-radio>
              </template>
            </el-radio-group>
          </el-form-item>
          <el-form-item >
            <el-button type="primary"  @click="editResume">保存</el-button>
          </el-form-item>
        </el-form> -->
        
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getResume as getResumeApi, editResume as editResumeApi } from '@/api/recruited/resume'
import { options } from './data'
export default {
  name: 'edit-resume',
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      resume: null,
      dialogFormVisible: false,
      options
    }
  },
  methods: {
    handleEdit() {
      let id = this.data.user_id
      getResumeApi(id).then((result) => {
        this.dialogFormVisible = true
        console.log('修改前获取简历信息', result)
        this.resume = result.data[0]
      }).catch((err) => { })
    },
    editResume() {
      editResumeApi(this.resume.user_id, this.resume.status).then((result) => {
        console.log('修改简历信息', result)
        this.$message.success('修改成功!')
        this.dialogFormVisible = false
        this.$emit('on-edit-success')
      })
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
  .avatar-area {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
