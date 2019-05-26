<template>
  <div class="app-container">
    <h1 class="page-title"> 修改角色权限{{$route.params.id}} </h1>
    <div class="edit-role-wrapper">
      <el-collapse v-for="(premit, key) in premitList" :key="key">
        <el-collapse-item>
          <template slot="title">{{key}}</template>
          <el-checkbox v-for="item in premit" :key="item.menuId">{{item.title}}</el-checkbox>
        </el-collapse-item>
      </el-collapse>
      <!-- <el-collapse>
        <el-collapse-item v-for="(premit, key) in premitList" :key="key">
          <template slot="title">{{key}}</template>
          <el-checkbox v-for="item in premit" :key="item.menuId">{{item.title}}</el-checkbox>
        </el-collapse-item>
      </el-collapse> -->
    </div> 
  </div>
</template>
<script>
import { getRolePremit as getRolePremitApi, getPremits as getPremitsApi} from '@/api/role'
export default {
  name: 'edit-role-premit',
  data() {
    return {
      roleOwnPremit: [],          // 该角色所拥有的权限
      role: null,                 // 角色基本信息
      premitList: {},               // 权限列表：分模块
    }
  },
  methods: {
    getPremitList() {
      getPremitsApi().then((result) => {
        console.log('未理的权限列表', result)
        let { data } = result
        this.premitList = data
        console.log('处理后的权限列表', this.premitList)
      }).catch((err) => { })
    },
  },
  mounted() {
    this.getPremitList()
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
  }
}

</style>
