<template>
  <div>
    <el-button type="text" size="small" @click="handleDetails">
      <slot name="btn-label">查看</slot>
    </el-button>
    <el-dialog
      title="成员信息"
      :visible.sync="dialogFormVisible"
      width="800px"
      :append-to-body="true"
    >
      <el-row class="details-row">
        <el-col :span="3"><span>头像：</span></el-col>
        <el-col :span="21">
          <div class="avatar-area">
            <img :src="user ? user.filepath : ''">
          </div>
        </el-col>
      </el-row>
      <el-row class="details-row">
        <el-col :span="3"><span>姓名：</span> </el-col>
        <el-col :span="9">{{user ? user.username : ''}}</el-col>
        <el-col :span="3"><span>性别：</span> </el-col>
        <el-col :span="9">{{user ? user.gender : ''}}</el-col>
      </el-row>
      <el-row class="details-row">
        <el-col :span="3"><span>学号：</span> </el-col>
        <el-col :span="9">{{user ? user.persionnum : ''}}</el-col>
        <el-col :span="3"><span>邮箱：</span> </el-col>
        <el-col :span="9">{{user ? user.email : ''}}</el-col>
      </el-row>
      <el-row class="details-row">
        <el-col :span="3"><span>院系：</span> </el-col>
        <el-col :span="9">{{user ? user.college : ''}}</el-col>
        <el-col :span="3"><span>专业：</span> </el-col>
        <el-col :span="9">{{user ? user.collegetie : ''}}</el-col>
      </el-row>
      <el-row class="details-row">
        <el-col :span="3"><span>手机号：</span> </el-col>
        <el-col :span="9">{{user ? user.mobile : ''}}</el-col>
        <el-col :span="3"><span>微信：</span> </el-col>
        <el-col :span="9">{{user ? user.wechart : ''}}</el-col>
      </el-row>
      <el-row class="details-row">
        <el-col :span="3"><span>自我描述：</span></el-col>
        <el-col :span="21" v-html="user ? user.descs : ''"></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getUser as getUserApi } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'details-user',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      user: null
    }
  },
  computed: {
    ...mapState({
      corid: (state) => state.user.corid
    })
  },
  methods: {
    handleDetails() {
      if(this.user === null){
        let id = this.data.user_id
        getUserApi(id, this.corid).then((result) => {
          this.dialogFormVisible = true
          this.user = result.user
        }).catch((err) => { })
      }else{
        this.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.details-row {
  padding: 15px;
  span {
    font-size: 15px;
    color: #909399;
  }
}
</style>
