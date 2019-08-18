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
      <div class="notice" v-if="notice">
        <h1 class="title">{{notice.notictop}}</h1>
        <div class="meta">
          <span class="label">发布人：<span class="text">{{notice.notictusername}}</span></span>
          <span class="label">发布时间：<span class="text">{{notice.createtime}}</span></span>
          <div style="text-align: left;">
            <span class="label">接收人：<span class="text">{{receiveUser}}</span></span>
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
import { getNotice as getNoticeApi } from '@/api/notices'
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
.notice {
  color: #333;
  .title {
    text-align: center;
    font-size: 20px;
    line-height: 23px;
  }
  .meta{
    padding: 10px;
    text-align: center;
    line-height: 23px;
    font-size: 13px;
    .label {
      color: #848484;
      margin-right: 15px;
      .text {
        color: #464646;
        text-align: left;
      }
    }
  }
  .content {
    line-height: 27px;
    text-indent: 2em;
    padding: 5px 0;
    letter-spacing: 3px;
  }
}
</style>
