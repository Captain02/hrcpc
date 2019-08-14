<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="发布公告"
      :visible.sync="dialogVisible"
      width="630px"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="handleClose"
      custom-class="notice-dialog"
    >
      <el-form :model="notice" size="small" :rules="rules" ref="noticeForm" class="notice-form">
        <el-form-item prop="title">
          <el-input v-model="notice.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item prop="receiveUserIds">
          <el-transfer
          filterable
          :titles="['未选择', '已选择']"
          v-model="notice.receiveUserIds" 
          :data="allUsers">
          </el-transfer>
        </el-form-item>
        <!-- {{allUsers}} -->
        <el-form-item prop="content">
          <el-input v-model="notice.content" type="textarea" :rows="6" placeholder="内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePublish" class="full-width">发布</el-button>
        </el-form-item>
        <!-- {{notice}} -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addNotice as addNoticeApi } from '@/api/corporation'
import { mapState } from 'vuex' 
export default {
  name: 'PublishNotice',
  props: {
    users: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      dialogVisible: false,
      notice: {
        title: '',
        content: '',
        // publishUserId: this.userId,
        receiveUserIds: []
      },
      rules: {
        title: [
          { required: true, message: '请输入标题' }
        ],
        receiveUserIds: [
          { required: true, message: '请选择接收人' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId
    }),
    allUsers() {
      return this.users.map((user) => {
        return {
          label: user.name,
          key: user.user_id
        }
      })
    }
  },
  methods: {
    handleClose() {
      this.$refs['noticeForm'].resetFields()
    },
    handleClick() {
      this.dialogVisible = true
    },
    handlePublish() {
      this.$refs['noticeForm'].validate((valid) => {
         if (!valid) {
          this.$message.error('请填写相关项目!')
          return
        }
        addNoticeApi(this.notice.title, this.userId, this.notice.receiveUserIds, this.notice.content).then((result) => {
          console.log(result)
          this.$message.success('发布成功!')
          this.dialogVisible = false
        }).catch((err) => { console.log(err) })
      })
    }
  },
}
</script>
<style lang="less" scoped>
  .notice-dialog {
    .notice-form {
      padding: 0 10px;
      /deep/.el-transfer-panel{
        width: 235px;
      }
    }
  }
</style>