<template>
  <div>
    <div @click="handleClick">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="公告"
      :visible.sync="dialogVisible"
      width="650px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
    <!-- {{notice}} -->
      <div class="notice-wrapper" v-if="notice">
        <h1 class="title">{{notice.notictop}}</h1>
        <div class="meta">
          <span class="author">发布人：{{notice.notictusername}}</span>
          <span class="date">发布时间：{{notice.createtime}}</span>
          <div>
            <span class="receive">接收人：{{receiveUser}}</span>
          </div>
        </div>
        <div class="content">
          {{notice.noticcontent}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getNotice as getNoticeApi } from '@/api/corporation'
export default {
  name: 'details-notice',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      notice: null
    }
  },
  computed: {
    receiveUser() {
      let receiveUsers = ''
      this.notice.noticteduser.forEach(user => {
        receiveUsers+=user.notictedusername + '，'
      })
      return receiveUsers.substring(0, receiveUsers.length - 1)
    }
  },
  methods: {
    handleClick() {
      this.dialogVisible = true
      this.getNotice()
    },
    getNotice() {
      // console.log(this.data)
      getNoticeApi(this.data.noticid).then((result) => {
        let { data } = result
        this.notice = data
      }).catch((err) => { console.log(err) })
    }
  }
}
</script>
<style lang="less" scoped>
.notice-wrapper {
  color: #333;
  .title {
    text-align: center;
    font-size: 20px;
    line-height: 23px;
  }
  .meta{
    padding: 10px;
    text-align: center;
    color: rgba(0,0,0,.45);
    line-height: 23px;
    .author {
      margin-right: 15px;
    }
  }
  .content {
    line-height: 23px;
    text-indent: 2em;
    padding: 5px 0;
  }
}
</style>
