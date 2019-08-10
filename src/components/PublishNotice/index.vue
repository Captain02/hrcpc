<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="发布公告"
      :visible.sync="dialogVisible"
      width="650px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form :model="notice">
        <el-form-item prop="title">
          <el-input v-model="notice.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item prop="receiveUserIds">
          <el-transfer v-model="notice.receiveUserIds" :data="allUsers"></el-transfer>
        </el-form-item>
        {{allUsers}}
        <el-form-item prop="content">
          <el-input v-model="notice.content" type="textarea" placeholder="内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布</el-button>
        </el-form-item>
        {{notice}}
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
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
        publishUserId: this.userId,
        receiveUserIds: []
      },
      // allUsers: [],
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
    handleClick() {
      this.dialogVisible = true
    }
  }
}
</script>