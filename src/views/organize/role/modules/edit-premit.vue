<template>
  <div class="app-container">
    <h1 class="page-title"> 修改角色权限 </h1>
    <div class="edit-role-wrapper">
      <el-collapse v-for="(premit, index) in premitList" :key="index">
        <el-collapse-item>
          <template slot="title">
            <span class="collapse-title">{{premitMap[index - 1]}}</span>
          </template>
          <el-checkbox-group v-model="role.premitIds">
            <template v-for="(item, idx) in premit">
              <el-checkbox :key="item.menu_id" :label="item.menu_id" @change="handleChange($event, item.menu_id)">{{item.title}}</el-checkbox>
              <el-divider :key="idx" v-if="(idx+1)%10 === 0"></el-divider>
            </template>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
      <!-- {{role}} -->
    </div> 
  </div>
</template>
<script>
import { getRolePremit as getRolePremitApi, updateRolePremit as updateRolePremitApi} from '@/api/role'
import { getPremits as getPremitsApi } from '@/api/comm'
export default {
  name: 'edit-role-premit',
  data() {
    return {        
      role: {
        roleId: this.$route.params.id,
        premitIds: []                 // 该角色所拥有的权限id
      },                 // 角色基本信息
      premitList: [],               // 权限列表：分模块
      premitMap: [
        '组织管理',
        '社团相册',
        '纳新管理',
        '社团活动',
        '社团新闻',
        '社团管理'
      ]
    }
  },
  methods: {
    handleChange(status, premitId) {
      // console.log(status, premitId)
      updateRolePremitApi(status, this.role.roleId, premitId).then((result) => {
        // console.log(result)
        this.$message.success('设置成功!')
      }).catch((err) => {})
    }
  },
  mounted() {
    let id = this.$route.params.id
    Promise.all([getPremitsApi(), getRolePremitApi(id)]).then((result) => {
      let [premitData, roleData] = result
      this.premitList = premitData.data
      this.role.premitIds = roleData.data.map((item) => {
        return item.menu_id
      })
    }).catch((err) => {
      console.log(err)
    })
    
  }
}
</script>
<style lang="less" scoped>


</style>

<style lang="less">
.edit-role-wrapper {
  margin-top: 25px;
  .el-collapse {
    margin-bottom: 25px;
    border: none;
    .el-collapse-item__header {
      background-color: #f5f5f5;
      padding: 0 25px;
      border-radius: 5px 5px 0 0;
      border-bottom: none;
    }
    .el-collapse-item__wrap {
      border-radius: 0 0 5px 5px;
      border: 1px solid #EBEEF5;
      border-top: none;
      .el-collapse-item__content {
        padding: 15px 25px;
      }
    }
    .collapse-title {
      color: #444;
      font-size: 14px;
      transition: all .3s;
      &:hover {
        color: #409eff;
      }
    }
    .el-divider--horizontal {
      margin: 11px 0;
    }
  }
}

</style>
