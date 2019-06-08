<template>
  <div class="app-container">
    <h1 class="page-title">活动列表</h1>
     <div class="filter-container">
       <el-select class="filter-item" v-model="listQuery.isAct" size="small" style="width: 100px;">
         <el-option :value="1" label="有效"></el-option>
         <el-option :value="0" label="无效"></el-option>
       </el-select>
       <el-select class="filter-item" v-model="listQuery.corid" size="small" style="width: 130px;">
         <el-option value="1" label="本社团活动"></el-option>
         <el-option value="" label="全部社团活动"></el-option>
       </el-select>
       <el-select class="filter-item" multiple clearable v-model="listQuery.crowdids" size="small" placeholder="面向人群">
         <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.label"></el-option>
       </el-select>
       <el-input class="filter-item" v-model="listQuery.actName" placeholder="活动名称" style="width: 200px;" size="small"></el-input>
       <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
     </div>
     <div class="activity-list">
        <s-list :data="listData" :user-id="userId">
          <template v-slot:actions="{scope}">
            <el-button size="small" type="primary" @click="handleEdit(scope)">修改</el-button>
            <el-button size="small">统计信息</el-button>
          </template>
        </s-list>
     </div>
  </div>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import { getActivitys as getActivitysApi } from '@/api/activity'
import { mapState } from 'vuex'
import SList from '_c/SList'
export default {
  name: 'activity-list',
  components: {
    SList
  },
  data() {
    return {
      listQuery: {
        corid: this.$store.state.user.corid,
        isAct: 1,
        actName: '',
        crowdids: [],          // 
        currPage: 1,
        pageSize: 20
      },
      options: [],
      listData: []
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId
    })
  },
  methods: {
    getActivityList() {
      getActivitysApi(this.listQuery.corid, this.listQuery.actName, this.listQuery.isAct, this
      .listQuery.crowdids, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        console.log(result)
        let { data } = result
        this.listData = data
      }).catch((err) => { })
    },
    handleSearch() {
      this.getActivityList()
    },
    handleEdit(data) {
      console.log(data)
    }
  },
  mounted() {
    getCollegeInfoApi(1, null).then((result) => {
      let { data } = result
      this.options = data.map((item) => {
        return { id: item.id, label: item.value, value: item.id }
      })
    })
    this.getActivityList()
  }
}
</script>
<style lang="less">
.list-wrapper {
  .el-collapse-item__header {
    display: block;
    line-height: 25px;
    height: auto;
    position: relative;
  }
  .el-collapse-item__arrow {
    position: absolute;
  }
}

</style>

<style lang="less" scoped>
.list-wrapper {
  .el-collapse-item__header {
    height: 100%;
    line-height: 20px;
  }
  .list-item-info {
    display: flex;
    // align-items: center;
    .list-item-meta {
      flex: 3;
    }
    .list-item-content {
      flex: 2;
    }
    .list-item-action {
      flex: 1;
    }
  }
}
</style>
