<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="400px"
    >
      <el-form label-width="100px" :model="userPwd" ref="passwordForm" size="small" :hide-required-asterisk="true" :rules="rules">
        <el-form-item label="旧密码" prop="password">
          <el-input type="password" v-model="userPwd.password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="userPwd.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="userPwd.confirmPassword" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePwd">修改</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  
</template>
<script>
import { changePwd as changePwdApi } from '@/api/account'
import { mapState } from 'vuex'
export default {
  name: 'changePwd',
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.userPwd.newPassword !== '') {
          this.$refs.passwordForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateConfirmPassword= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.userPwd.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      userPwd: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请填写旧密码!', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.userName,
      userId: (state) => state.user.userId
    })
  },
  methods: {
    handleClick() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.handleReset()
      })
    },
    changePwd() {
      this.$refs['passwordForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        changePwdApi(this.userId, this.username, this.userPwd.password, this.userPwd.newPassword).then((result) => {
          // console.log(result)
          this.$message.success('修改成功!')
          this.dialogFormVisible = false
          this.$emit('on-success')
        }).catch((err) => { })
      })
    },
    handleReset() {
      this.$refs['passwordForm'].resetFields()
    }
  }
}
</script>