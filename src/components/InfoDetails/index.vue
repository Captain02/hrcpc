<template>
  <div>
    <div>
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      :title="title"
      :width="width"
      :append-to-body="true"
      :close-on-click-modal="false"
      custom-class="details-dialog"
    >
      <div v-if="infoData" class="details-wrapper">
        <div class="details-cell" v-for="item in infoData" :key="item" :class="hasComplexCell(item)">
          <span></span>
        </div>
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
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'InfoDetails',
  props: {
    title: {
      type: String,
      default: '信息'
    },
    width: {
      type: [Number, String],
      default: '650px'
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      infoData: null,
      map: {
        filepath: '头像',
        name: '姓名',
        gender: '性别',
        username: '学号'
      }
    }
  },
  watch: {
    data(newVal) {
      this.infoData = newVal
    }
  },
  methods: {
    hasComplexCell(cell) {
      return cell === 'filepath' || cell === 'descs'
    }
  }
}
</script>
<style lang="less" scoped>
.details-wrapper {
  .details-cell {
    min-height: 25px;
    float: left;
    
  }
}
</style>