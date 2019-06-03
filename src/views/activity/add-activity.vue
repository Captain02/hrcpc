<template>
  <div class="app-container">
    <h1 class="page-title">添加社团活动</h1>
    <el-card class="form-wrapper" shadow="never">
      <el-form :model="activity" label-width="100px" :rules="rules" size="small" ref="activityForm" :hide-required-asterisk="true">
        <el-form-item prop="name" label="活动名称：">
          <el-input v-model="activity.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item prop="actLeader" label="活动负责人：">
          <el-select v-model="activity.actLeader" placeholder="活动负责人" class="half-width">

          </el-select>
        </el-form-item>
        <el-form-item prop="timer" label="活动时间：">
          <el-date-picker
            v-model="activity.timer"
            class="half-width"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="croWdPeople" label="面向人群：">
          <el-select v-model="activity.croWdPeople" placeholder="面向人群" class="half-width">

          </el-select>
        </el-form-item>
        
        <!-- <el-form-item prop="collegetie" label="专业：">
          <el-select v-model="user.collegetie" placeholder="请选择专业" class="full-width">
            <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
          <el-input v-model="user.email" type="email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号：">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="wechart" label="微信：">
          <el-input v-model="user.wechart" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item prop="qq" label="QQ：">
          <el-input v-model="user.qq" placeholder="请输入QQ号"></el-input>
        </el-form-item>
        <el-form-item prop="descs" label="自我描述：">
          <mce-editor v-model="user.descs" ></mce-editor>
        </el-form-item>
        
        <el-form-item class="">
          <el-col :offset="5">
            <el-button type="primary" @click="addUser">添加</el-button>
          </el-col>
        </el-form-item> -->
      </el-form>
      {{activity}}
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'add-activity',
  data() {
    return {
      activity: {
        actName: '',              // 活动名称
        actLeader: '',            // 活动负责人
        timer: '',
        actStartTime: '',         // 活动开始时间
        actEndTime: '',           // 活动结束时间
        croWdPeople: '',          // 活动面向人群
        profile: '',              // 活动简介
        processNodes: '',         // 活动流程

      },
      rules: {}
    }
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  margin-top: 30px;
  padding: 0 40px 0 20px;
  .el-date-editor {
    width: 50%;
  }
}
</style>
