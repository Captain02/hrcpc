<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="修改成员信息"
      :visible.sync="dialogFormVisible"
      width="800px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div class="form-wrapper">
        <el-form v-if="user" :model="user" label-width="100px" :rules="rules" size="small" ref="userForm" :hide-required-asterisk="true">
          <el-form-item prop="name" label="姓名：">
            <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别：">
            <el-radio-group v-model="user.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="college" label="院系：">
            <el-select v-model="user.college" placeholder="请选择院系" class="full-width" @change="handleChange">
              <el-option v-for="item in collegeOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="collegetie" label="专业：">
            <el-select v-model="user.collegetie" placeholder="请选择专业" class="full-width">
              <el-option v-for="item in collegetieOptions" :key="item.id" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
            <el-input v-model="user.email" type="email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号：">
            <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="wechart" label="微信：">
            <el-input v-model="user.wechart" placeholder="请输入微信"></el-input>
          </el-form-item>
          <el-form-item prop="QQ" label="QQ：">
            <el-input v-model="user.QQ" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item prop="descs" label="自我描述：">
            <mce-editor v-model="user.descs" v-if="dialogFormVisible" ></mce-editor>
          </el-form-item>
          
          <el-form-item>
            <el-col :offset="5">
              <el-button type="primary" @click="updateUser">保存</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUser as getUserApi, updateUser as updateUserApi } from '@/api/user'
import mixins from '../mixins'
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import cloneDeep from 'clonedeep'
import MceEditor from '@/components/MceEditor'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  name: 'edit-user-info',
  components: {
    MceEditor
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mixins: [mixins],
  data() {
    return {
      dialogFormVisible: false,                    // 并控制是否渲染富文本编辑器
      user: null,
    }
  },
  methods: {
    handleEdit() {
      this.user = cloneDeep(this.data)
      // 将院系名称转换成相应的id
      this.user.college = this.findCollegeId(this.collegeOptions, this.user.college)
      getCollegeInfoApi(null, this.user.college).then((result) => {
        let { data: list } = result
        this.collegetieOptions = list.map((item) => {
          return { id: item.id, value: item.id, label: item.value }
        })
        // 将专业名称转换为相应的id
        this.user.collegetie = this.findCollegeId(this.collegetieOptions, this.user.collegetie)
        this.dialogFormVisible = true
        // console.log(this.user)
      })
    },
    findCollegeId(list, name) {
      let res = []
      list.some((item) => {
        if(item.label === name){
          res = item.id
          return true
        }
      })
      return res
    },
    updateUser() {
      // 更新成员
      this.$refs['userForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        let collegeName = this.findCollegeName(this.collegeOptions, this.user.college)
        let collegetieName = this.findCollegeName(this.collegetieOptions, this.user.collegetie)
        updateUserApi(this.user.user_id, this.user.name, this.user.gender, this.user.email, this.user.mobile, this.user.wechart, this.user.QQ, this.user.descs, collegeName, collegetieName).then((result) => {
          this.$message.success('修改成功!')
          this.dialogFormVisible = false
          this.$emit('on-edit-success')
        }).catch((err) => {
          console.log(err)
        })
      })
      
    },
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  padding: 0 30px 0 0;
}
</style>
