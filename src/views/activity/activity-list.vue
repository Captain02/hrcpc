<template>
  <div class="app-container">
    <h1 class="page-title">活动列表</h1>
     <div class="filter-container">
       <el-select class="filter-item" v-model="listQuery.isAct" size="small" style="width: 100px;">
         <el-option :value="1" label="有效"></el-option>
         <el-option :value="0" label="无效"></el-option>
       </el-select>
       <el-select class="filter-item" v-model="listQuery.corid" size="small" style="width: 130px;">
         <el-option :value="1" label="本社团活动"></el-option>
         <el-option value="" label="全部社团活动"></el-option>
       </el-select>
       <el-tooltip content='不选择则面向人群默认为"全校"' placement="top">
        <el-select class="filter-item" multiple clearable v-model="listQuery.crowdids" size="small" placeholder="面向人群">
          <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.label"></el-option>
        </el-select>
       </el-tooltip>
       <el-input class="filter-item" v-model="listQuery.actName" placeholder="活动名称" style="width: 200px;" size="small"></el-input>
       <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
     </div>
     <div class="activity-list">
        <s-list :data="listData" :user-id="userId" @on-process-state-chnage="processStateChnage" @on-details="handleDetails" @on-like="handleLike" @on-collect="handleCollect">
          <template v-slot:actions="{scope}">
            <el-button size="small" type="primary" @click="handleEdit(scope)">修改</el-button>
            <el-button size="small">统计信息</el-button>
          </template>
        </s-list>
     </div>
     <pagination v-show="total>0" :total="total" :curr.sync="listQuery.currPage" :size.sync="listQuery.pageSize" @on-page-change="getActivityList" />
  </div>
</template>
<script>
import { getCollegeInfo as getCollegeInfoApi } from '@/api/comm'
import { getActivitys as getActivitysApi, changeProcessState as changeProcessStateApi, changeLike as changeLikeApi, changeCollect as changeCollectApi } from '@/api/activity'
import { mapState } from 'vuex'
import SList from '_c/SList'
import Pagination from '_c/Pagination'
export default {
  name: 'activity-list',
  components: {
    SList,
    Pagination
  },
  data() {
    return {
      listQuery: {
        corid: this.$store.state.user.corid,
        isAct: 1,
        actName: '',
        crowdids: [],          // 
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      options: [],
      listData: []
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    })
  },
  methods: {
    getActivityList() {
      getActivitysApi(this.listQuery.corid, this.listQuery.actName, this.listQuery.isAct, this
      .listQuery.crowdids, this.listQuery.currPage, this.listQuery.pageSize).then((result) => {
        console.log(result)
        let { data, page } = result
        this.listData = data
        this.total = page.totalCount
      }).catch((err) => { })
    },
    handleSearch() {
      this.getActivityList()
    },
    handleEdit(data) {
      console.log(data)
    },
    handleDetails(actid) {
      console.log(actid)
    },
    handleLike(actid, isLike) {
      changeLikeApi(Number(isLike), this.userId, actid).then((result) => {
        // console.log(result)
        this.getActivityList()
      })
    },
    handleCollect(actid, isCollect) {
      changeCollectApi(Number(isCollect), this.userId, actid).then((result) => {
        // console.log(result)
        this.getActivityList()
      })
    },
    /** @param {Array} proceNodes */
    processStateChnage(proceNodes) {  // param{Array}
      changeProcessStateApi(proceNodes).then((result) => {
        this.$message.success('更新状态成功!')
        this.getActivityList()
      }).catch((err) => {})
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
<style lang="less" scoped>
.activity-list {
  border-top: 1px solid #e8e8e8;
}
</style>
