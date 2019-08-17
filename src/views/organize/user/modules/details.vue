<template>
  <div>
    <div @click="handleDetails">
      <slot name="action-btn"></slot>
    </div>
    <el-dialog
      title="成员信息"
      :visible.sync="dialogFormVisible"
      width="600px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div class="details-wrapper" v-if="user">
        <div class="row clearfix">
          <div class="label">头像：</div>
          <div class="text">
            <s-avatar :url="user.filepath || ''" size="medium" />
          </div>
        </div>
        <div class="row clearfix">
          <div class="label">姓名：</div>
          <div class="text">{{user.name || '暂无'}}</div>
          <div class="label">性别：</div>
          <div class="text">{{user.gender || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">学号：</div>
          <div class="text">{{user.username || '暂无'}}</div>
          <div class="label">院系：</div>
          <div class="text">{{user.college || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">专业：</div>
          <div class="text">{{user.collegetie || '暂无'}}</div>
          <div class="label">邮箱：</div>
          <div class="text">{{user.email || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">手机号：</div>
          <div class="text">{{user.mobile || '暂无'}}</div>
          <div class="label">QQ：</div>
          <div class="text">{{user.QQ || '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">微信：</div>
          <div class="text">{{user.wechart || '暂无'}}</div>
          <div class="label">所属部门：</div>
          <div class="text">{{user.depts.length ? user.depts[0].name : '暂无'}}</div>
        </div>
        <div class="row clearfix">
          <div class="label">拥有角色：</div>
          <div class="text" style="width: 400px;">
            <template v-if="user.roles.length">
              <el-tag style="margin-right: 15px; font-size: 12px;" v-for="role in user.roles" size="small" :key="role.role_id">{{role.role_name}}</el-tag>
            </template>
            <template v-else>
              <span>无</span>
            </template>
          </div>
        </div>
        <div class="row clearfix">
          <div class="label">自我描述：</div>
          <div class="text" style="width: 400px;">
            <div v-html="user.descs || ''"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUser as getUserApi } from '@/api/user'
import SAvatar from '_c/SAvatar'
export default {
  name: 'details-user',
  components: {
    SAvatar
  },
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
  methods: {
    handleDetails() {
      // if(this.user === null){
        let id = this.data.user_id
        getUserApi(id).then((result) => {
          this.dialogFormVisible = true
          this.user = result.data
          // console.log(this.user)
        }).catch((err) => { })
      // }else{
      //   this.dialogFormVisible = true
      // }
    }
  }
}
</script>
