<template>
  <div>
    <div @click="handleEdit">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="修改成员信息"
      :visible.sync="dialogFormVisible"
      width="900px"
      :append-to-body="true"
    >
      <div class="form-wrapper">
        <el-form v-if="user" :model="user" label-width="100px" :rules="rules" ref="userForm" :hide-required-asterisk="true">
          <el-form-item prop="name" label="姓名：">
            <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别：">
            <el-radio-group v-model="user.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item prop="studentId" label="学号：">
            <el-input v-model="user.studentId" placeholder="请输入学号"></el-input>
          </el-form-item> -->
          <el-form-item prop="collegeInfo" label="院系：">
            <el-cascader
              v-model="user.collegeInfo"
              class="college-cascader"
              placeholder="请选择院系信息"
              @active-item-change="handleItemChange"
              clearable
              :options="options"
            ></el-cascader>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
            <el-input v-model="user.email" type="email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号：">
            <el-input v-model="user.mobile" type="number" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="wechart" label="微信：">
            <el-input v-model="user.wechart" placeholder="请输入微信"></el-input>
          </el-form-item>
          <el-form-item prop="QQ" label="QQ：">
            <el-input v-model="user.QQ" type="number" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item prop="descs" label="自我描述：">
            <mce-editor v-model="user.descs" ></mce-editor>
          </el-form-item>
          
          <el-form-item class="">
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
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
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
  data() {
    const validateCollegeInfo = (rule, value, callback) => {
      if(value.length < 2) {
        return callback(new Error('请选择完整的院系信息！'))
      }
      callback()
    }
    return {
      dialogFormVisible: false,
      user: null,
      rules: {
        name: [
          { required: true, message: '请输入姓名！', trigger: 'blur' },
        ],
        collegeInfo: [
          { validator: validateCollegeInfo, trigger: 'change' }
        ]
      },
      typeId: 1,                // 为1查询所有的院系
      parentValue: null,        // 查询系别 类型为数字
      options: []
    }
  },
  computed: {
    computedCollege() {
      let collegeId = this.user.collegeInfo[0]
      let majorId = this.user.collegeInfo[1]
      let res = []
      this.options.some((item) => {
        if(item.id === collegeId){
          item.children.some((child) => {
            if(child.id === majorId){
              res.push(item.label, child.label)
              return true
            }
          })
          return true
        }
      })
      return res
    }
  },
  methods: {
    handleEdit() {
      let id = this.data.user_id
      getUserApi(id).then((result) => {
        let { data } = result
        // this.dialogFormVisible = true
        console.log('修改前成员信息', data)
        this.user = data
        // 设置parentId
        let collegeId = this.getIdByCollegeValue(data.college)
        getCollegeInfoApi(null, collegeId).then((result) => {
          console.log('获取专业信息', result)
          let { data: list } = result
          this.options.some((item) => {
            if(item.id === collegeId){
              item.children = list.map((child) => {
                return { id: child.id, label: child.value, value: child.id }
              })
              return true
            }
          })
          // 获取专业所对应的id
          let collegetieId = this.getIdByCollegeValue(data.collegetie) 
          this.$set(this.user, 'collegeInfo', [collegeId, collegetieId])
          this.dialogFormVisible = true
        })
      })
    },
    getIdByCollegeValue(name) {
      let id = null
      this.options.some((item) => {
        if(item.label === name){
          id = item.value
          return true
        }else if(item.children.length){
          item.children.some((child) => {
            if(child.label === name){
              id = child.value
              return true
            }
          })
        }
      })
      return id
    },
    handleItemChange(val) {
      this.typeId = null
      this.parentValue = val[0]
      // 判断如果有children说明已经获取了，就不用再次获取
      if(!this.options.find((item) => item.id === this.parentValue && item.children.length)){
         getCollegeInfoApi(this.typeId, this.parentValue).then((result) => {
          // console.log(result)
          let { data: list } = result
          this.options.some((item) => {
            if(item.id === this.parentValue){
              item.children = list.map((child) => {
                return { id: child.id, label: child.value, value: child.id }
              })
              return true
            }
          })
        })
      }
    },
    updateUser() {
      // 添加成员
      this.$refs['userForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        let [college, collegetie] = this.computedCollege
        updateUserApi(this.user.user_id, this.user.name, this.user.gender, this.user.email, this.user.mobile, this.user.wechart, this.user.QQ, this.user.descs, college, collegetie).then((result) => {
          this.$message.success('修改成功!')
          this.dialogFormVisible = false
          this.$emit('on-edit-success')
        }).catch((err) => {
          console.log(err)
        })
      })
      
    },
  },
  mounted() {
    getCollegeInfoApi(this.typeId, this.parentValue).then((result) => {
      // console.log(result)
      let { data: list } = result
      this.options = list.map((item) => {
        return { id: item.id, label: item.value, value: item.id, children: [] }
      })
      // console.log(this.options)
    })
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  // width: 800px;
  padding: 0 30px 0 0;
}
.college-cascader {
  width: 100%;
}
</style>
