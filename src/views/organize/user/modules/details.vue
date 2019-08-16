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
      <!-- <template v-if="user">
        <el-row class="details-row">
          <el-col :span="3"><span>头像：</span></el-col>
          <el-col :span="21">
            <s-avatar :url="user.filepath || ''" size="medium" />
          </el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>姓名：</span> </el-col>
          <el-col :span="9">{{user.name || ''}}</el-col>
          <el-col :span="3"><span>性别：</span> </el-col>
          <el-col :span="9">{{user.gender || ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>用户名：</span> </el-col>
          <el-col :span="9">{{user.username || ''}}</el-col>
          <el-col :span="3"><span>学号：</span> </el-col>
          <el-col :span="9">{{user.persionnum || ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>院系：</span> </el-col>
          <el-col :span="9">{{user.college || ''}}</el-col>
          <el-col :span="3"><span>专业：</span> </el-col>
          <el-col :span="9">{{user.collegetie || ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>邮箱：</span> </el-col>
          <el-col :span="9">{{user.email || ''}}</el-col>
          <el-col :span="3"><span>手机号：</span> </el-col>
          <el-col :span="9">{{user.mobile || ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>QQ：</span> </el-col>
          <el-col :span="9">{{user.QQ || ''}}</el-col>
          <el-col :span="3"><span>微信：</span> </el-col>
          <el-col :span="9">{{user.wechart || ''}}</el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>所属部门：</span> </el-col>
          <el-col :span="9">{{user.depts.length ? user.depts[0].name : '无'}}</el-col>
          <el-col :span="3"><span>拥有角色：</span> </el-col>
          <el-col :span="9">
            <template v-if="user.roles.length">
              <el-tag style="margin-right: 15px; font-size: 12px;" v-for="role in user.roles" size="small" :key="role.role_id">{{role.role_name}}</el-tag>
            </template>
            <template v-else>
              <span>无</span>
            </template>
          </el-col>
        </el-row>
        <el-row class="details-row">
          <el-col :span="3"><span>自我描述：</span></el-col>
          <el-col :span="21" v-html="user.descs || ''"></el-col>
        </el-row>
      </template> -->
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
