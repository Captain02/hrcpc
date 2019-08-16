<template>
  <div>
    <div @click="handleDetails">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="个人信息"
      :visible.sync="dialogFormVisible"
      width="600px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div class="details-wrapper" v-if="resume">
        <div class="row clearfix">
          <div class="label">头像：</div>
          <div class="text">
            <s-avatar :url="resume.filepath || ''" size="medium" />
          </div>
        </div>
        <div class="row clearfix">
          <div class="label">姓名：</div>
          <div class="text">{{resume.name || '暂无'}}</div>
          <div class="label">性别：</div>
          <div class="text">{{resume.gender || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">学号：</div>
          <div class="text">{{resume.username || '暂无'}}</div>
          <div class="label">院系：</div>
          <div class="text">{{resume.college || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">专业：</div>
          <div class="text">{{resume.collegetie || '暂无'}}</div>
          <div class="label">邮箱：</div>
          <div class="text">{{resume.email || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">手机号：</div>
          <div class="text">{{resume.mobile || '暂无'}}</div>
          <div class="label">QQ：</div>
          <div class="text">{{resume.QQ || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">微信：</div>
          <div class="text">{{resume.wechart || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">自我描述：</div>
          <div class="text" style="width: 400px;">
            <div v-html="resume.descs || ''"></div>
          </div>
        </div>
        <h1 class="details-title">审核信息</h1>
        <div class="row clearfix">
          <div class="label">状态：</div>
          <div class="text" style="width: 400px;">
            <template v-for="item in options">
              <el-tag v-if="item.value == resume.status" size="small" :key="item.id" :type="item.tagType">{{item.text}}</el-tag>
            </template>
          </div>
        </div>
      </div>
      <!-- <template v-if="resume">
        <el-row class="details-row">
          <el-col :span="3"><span>头像：</span></el-col>
          <el-col :span="21">
            <s-avatar :url="resume.filepath || ''" size="medium" />
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
      </template> -->
    </el-dialog>
  </div>
</template>
<script>
import { getResume as getResumeApi } from '@/api/resume'
import { options } from './data'
import SAvatar from '_c/SAvatar'
export default {
  name: 'details-resume',
  components: {
    SAvatar
  },
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
